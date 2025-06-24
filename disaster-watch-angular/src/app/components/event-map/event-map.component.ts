import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import * as L from 'leaflet';
import { FloodEvent, GeoJsonPolygon } from '../../shared/model/floodEventWithUserLocation';

@Component({
  selector: 'app-event-map',
  imports: [],
  templateUrl: './event-map.component.html',
  styleUrl: './event-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMapComponent {
  readonly mapId = input.required<string>();
  readonly floodEvents = input<FloodEvent[]>([]);
  readonly userLat = input<number | undefined>(undefined);
  readonly userLong = input<number | undefined>(undefined);

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
        .bindPopup('Event Location')
        .openPopup();

      this.renderPolygons(event.polygonGeoJson);
    }

    if (lat !== undefined && long !== undefined) {
      L.marker([lat, long], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup('Your Location')
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

    const polygonLayer = L.polygon(latlngs, {
      color: 'blue',
      fillOpacity: 0.1
    }).addTo(this.map);

    this.map.fitBounds(polygonLayer.getBounds());
  }

}
