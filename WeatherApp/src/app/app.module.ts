import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserinputComponent } from './userinput/userinput.component';
import { PrimarynavbarComponent } from './primarynavbar/primarynavbar.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TempRangeChartComponent } from './temp-range-chart/temp-range-chart.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { FavoritesTabComponent } from './favorites-tab/favorites-tab.component';
import { DetailsTableComponent } from './details-table/details-table.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    UserinputComponent,
    PrimarynavbarComponent,
    WeatherTableComponent,
    ProgressBarComponent,
    TempRangeChartComponent,
    MeteogramComponent,
    FavoritesTabComponent,
    DetailsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
