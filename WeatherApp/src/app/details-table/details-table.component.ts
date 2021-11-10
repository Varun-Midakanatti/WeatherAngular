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
  }

  // @Input() showWeatherTable!: boolean;
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
