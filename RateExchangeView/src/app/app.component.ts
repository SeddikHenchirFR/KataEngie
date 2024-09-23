import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PriceDashboardComponent } from './components/price-dashboard/price-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PriceDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'price-dashboard';
}
