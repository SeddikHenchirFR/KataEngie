import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PriceDashboardComponent } from './components/price-dashboard/price-dashboard.component'; // Import the component

@NgModule({
  declarations: [
    AppComponent,
    PriceDashboardComponent, // Add your component here
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class AppModule { }
