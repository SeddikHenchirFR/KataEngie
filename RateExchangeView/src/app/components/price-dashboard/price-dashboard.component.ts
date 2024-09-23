import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CommonModule } from '@angular/common';

interface GroupedRates {
  [id: string]: { Pair: string; Rate: string };
}

@Component({
  selector: 'app-price-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.css'],
})
export class PriceDashboardComponent implements OnInit {
  groupedRates: GroupedRates = {};

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.rates$.subscribe((rates) => {
      this.groupRatesById(rates);
    });
  }

  // Group rates by IdRate
  groupRatesById(rates: any[]) {
    this.groupedRates = {};
    rates.forEach((rate) => {
      this.groupedRates[rate.IdRate] = { Pair: rate.Pair, Rate: rate.Rate };
    });
  }

  // Expose Object.keys to the template by defining a method
  getKeys(object: GroupedRates): string[] {
    return Object.keys(object);
  }
}
