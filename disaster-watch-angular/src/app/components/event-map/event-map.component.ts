import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import * as L from 'leaflet';
import { FloodEvent, GeoJsonPolygon } from '../../shared/model/floodEventWithUserLocation';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-map',
  imports: [],
  templateUrl: './event-map.component.html',
  styleUrl: './event-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMapComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchService = inject(SearchService);

  readonly mapId = input.required<string>();
  readonly floodEvents = input<FloodEvent[]>([]);
  readonly userLat = input<number | undefined>(undefined);
  readonly userLong = input<number | undefined>(undefined);

  private readonly userLocation = signal(`${this.searchService.searchForm.controls.searchBar.value}`);

  private customIcon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  private map!: L.Map

  constructor() {
    this.searchService.searchForm.controls.searchBar.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.userLocation.set(`${value}`);
    })
    effect(() => {
      const id = this.mapId()
      const events = this.floodEvents();
      const lat = this.userLat();
      const long = this.userLong();

      if (!events.length) return;

      queueMicrotask(() => {
        this.initMap(id, events, lat, long);
      });
    });
  }

  private initMap(id: string, events: FloodEvent[], lat?: number, long?: number): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map(id, {
      center: lat && long ? [lat, long] : [events[0].latitude, events[0].longitude],
      zoom: 7
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    for (const event of events) {
      L.marker([event.latitude, event.longitude], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup(`${event.areaDesc[0]}`)
        .openPopup();

      this.renderPolygons(event.polygonGeoJson);
    }

    if (lat !== undefined && long !== undefined) {
      L.marker([lat, long], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup(this.userLocation())
        .openPopup();

      if (this.floodEvents().length === 1) {
        L.polyline([
          [lat, long],
          [this.floodEvents()[0].latitude, this.floodEvents()[0].longitude]
        ], { color: 'blue' }).addTo(this.map);
      }
    }
  }

  private renderPolygons(polygon: GeoJsonPolygon) {
    if (!polygon || polygon.type !== 'Polygon') return;

    // data comes in [lng, lat], but leaflet expects [lat, lng]
    const latlngs = polygon.coordinates.map(ring =>
      ring.map(([lng, lat]) => L.latLng(lat, lng))
    );

    L.polygon(latlngs, {
      color: 'blue',
      fillOpacity: 0.1
    }).addTo(this.map);

  }

}
