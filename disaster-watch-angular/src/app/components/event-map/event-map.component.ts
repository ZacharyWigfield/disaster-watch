import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  imports: [],
  templateUrl: './event-map.component.html',
  styleUrl: './event-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMapComponent implements OnInit {
  @Input() eventLat!: number;
  @Input() eventLong!: number;
  @Input() userLat!: number;
  @Input() userLong!: number;

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

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.eventLat, this.eventLong],
      zoom: 8
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.eventLat, this.eventLong], { icon: this.customIcon })
      .addTo(this.map)
      .bindPopup('Event Location')
      .openPopup();

    if (this.userLat && this.userLong) {
      L.marker([this.userLat, this.userLong], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup('Your Location');

      // Optional: Draw a line between user and event
      L.polyline([
        [this.userLat, this.userLong],
        [this.eventLat, this.eventLong]
      ], { color: 'blue' }).addTo(this.map);
    }
  }

}
