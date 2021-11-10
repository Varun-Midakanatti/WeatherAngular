import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';


@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.css'],
  animations: [

    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(+100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ transform: 'translateX(+100%)' })),
      ]),
    ]),
  ]
})
export class DetailsTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(this.weather && this.weather.data){
      for(let i=0; i<this.weather.data.timelines[1].intervals.length; i++) {
        let val = this.weather.data.timelines[1].intervals[i].values;
        let hour:any = new Date(val.sunriseTime).getHours();
        hour = hour < 10 ? "0" + hour : hour;
        let minutes: any = new Date(val.sunriseTime).getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let sunRise = hour + ":" + minutes + ":00";
        hour = new Date(val.sunsetTime).getHours();
        hour = hour < 10 ? "0" + hour : hour;
        minutes = new Date(val.sunsetTime).getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let sunSet = hour + ":" + minutes + ":00";
        this.weather.data.timelines[1].intervals[i].values.sunriseTime = sunRise;
        this.weather.data.timelines[1].intervals[i].values.sunsetTime = sunSet;
      }
    }
  }

  @Input() weather!: any;
  @Input() showWeatherTable!: boolean;
  @Input() currentIndex!: number;
  @Input() location_string!: string;
  tweetMsg: string = '';

  @Output() listTabEmitter = new EventEmitter<boolean>();

  ngOnChanges() {
    if(this.weather && this.weather.data && this.currentIndex >=0){
      this.tweetMsg = `The temperature in ${this.location_string} on ${this.weather.data.timelines[1].intervals[this.currentIndex].formattedDate} is ${this.weather.data.timelines[1].intervals[this.currentIndex].values.temperature} \xB0F. The weather conditions are ${this.weather.data.timelines[1].intervals[this.currentIndex].weatherStatus}`
    }
  }

  viewList() {
    this.showWeatherTable = !this.showWeatherTable;
    this.listTabEmitter.emit(this.showWeatherTable);
  }

}
