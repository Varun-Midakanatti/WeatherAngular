import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ]
})
export class WeatherTableComponent implements OnInit {

  daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  weatherDict: any = {
    1000: {
        text: "Clear",
        img: "../assets/images/clear_day.svg",
    },
    1100: {
        text: "Mostly Clear",
        img: "../assets/images/mostly_clear_day.svg",
    },
    1101: {
        text: "Partly Cloudy",
        img: "../assets/images/partly_cloudy_day.svg",
    },
    1102: {
        text: "Mostly Cloudy",
        img: "../assets/images/mostly_cloudy.svg",
    },
    1001: {
        text: "Cloudy",
        img: "../assets/images/cloudy.svg",
    },
    2000: {
        text: "Fog",
        img: "../assets/images/fog.svg",
    },
    2100: {
        text: "Light Fog",
        img: "../assets/images/fog_light.svg",
    },
    3000: {
        text: "Light Wind",
        img: "../assets/images/light_wind.svg",
    },
    3001: {
        text: "Wind",
        img: "../assets/images/wind.svg",
    },
    3002: {
        text: "Strong Wind",
        img: "../assets/images/strong_wind.svg",
    },
    8000: {
        text: "Thunderstorm",
        img: "../assets/images/tstorm.svg",
    },
    5001: {
        text: "Flurries",
        img: "../assets/images/flurries.svg",
    },
    5100: {
        text: "Light Snow",
        img: "../assets/images/snow_light.svg",
    },
    5000: {
        text: "Snow",
        img: "../assets/images/snow.svg",
    },
    5101: {
        text: "Heavy Snow",
        img: "../assets/images/snow_heavy.svg",
    },
    7102: {
        text: "Light Ice Pellets",
        img: "../assets/images/ice_pellets_light.svg",
    },
    7000: {
        text: "Ice Pellets",
        img: "../assets/images/ice_pellets.svg",
    },
    7101: {
        text: "Heavy Ice Pellets",
        img: "../assets/images/ice_pellets_heavy.svg",
    },
    4000: {
        text: "Drizzle",
        img: "../assets/images/drizzle.svg",
    },
    6000: {
        text: "Freezing Drizzle",
        img: "../assets/images/freezing_drizzle.svg",
    },
    6200: {
        text: "Light Freezing Rain",
        img: "../assets/images/freezing_rain_light.svg",
    },
    6001: {
        text: "Freezing Rain",
        img: "../assets/images/freezing_rain.svg",
    },
    6201: {
        text: "	Heavy Freezing Rain",
        img: "../assets/images/freezing_rain_heavy.svg",
    },
    4200: {
        text: "	Light Rain",
        img: "../assets/images/rain_light.svg",
    },
    4001: {
        text: "Rain",
        img: "../assets/images/rain.svg",
    },
    4201: {
        text: "Heavy Rain",
        img: "../assets/images/rain_heavy.svg",
    }
}
  @Input() weather!: any;
  @Input() autoLocationChecked!: boolean;
  @Input() location_string!: string;
  @Input() showWeatherTable!: boolean;
  @Input() currentIndex!: number;
  @Input() duplicate!: boolean;

  @Output() detailsTabEmitter =  new EventEmitter<boolean>();
  @Output() indexEmitter = new EventEmitter<number> ();

  showDetailsTab: boolean = false;
  existing: any;
  index: number = -1;


  constructor() { 
  }

  ngOnInit() {
    // // console.log("Init table");
    // this.existing = localStorage.getItem("locations");
    // // console.log("exisitng", this.existing);
    // let loc = {
    //   city: this.location_string.split(",")[0],
    //   state: this.location_string.split(',')[1]
    // }
    // if(this.existing?.length) {
    //   // console.log("1");
    //   this.existing = JSON.parse(this.existing);
    //   for(let i=0; i<this.existing.length; i++) {
    //     if(this.existing[i].city === loc.city) {
    //       // console.log("Found")
    //       this.index = i
    //       this.duplicate = true
    //     }
    //   }
    // }
  }

  ngOnChanges(): void {
    console.log("Init table");
    this.existing = localStorage.getItem("locations");
    console.log("exisitng", this.existing);
    let loc = {
      city: this.location_string.split(",")[0],
      state: this.location_string.split(',')[1]
    }
    if(this.existing?.length) {
      console.log("1");
      this.existing = JSON.parse(this.existing);
      for(let i=0; i<this.existing.length; i++) {
        if(this.existing[i].city === loc.city) {
          console.log("Found")
          this.index = i
          this.duplicate = true
        }
      }
    }
    if (this.weather && this.weather.data && this.weather.data.timelines[1].intervals.length) {
      for (let i=0; i < this.weather.data.timelines[1].intervals.length; i++)
      {
      let day_obj = new Date (this.weather.data.timelines[1].intervals[i].startTime);
      let day = this.daysInWeek[day_obj.getDay()];
      let date: number | string = day_obj.getDate();
      date = date < 10 ? "0" + date : date;
      let month = this.monthNames[day_obj.getMonth()];
      let year = day_obj.getFullYear();
      let fullDate = day + ", " + date + " " + month + " " + year;
      this.weather.data.timelines[1].intervals[i].formattedDate = fullDate;
      let weatherStatus = this.weatherDict[this.weather.data.timelines[1].intervals[i].values.weatherCode].text;
      this.weather.data.timelines[1].intervals[i].weatherStatus = weatherStatus;
      let weatherImage = this.weatherDict[this.weather.data.timelines[1].intervals[i].values.weatherCode].img;
      this.weather.data.timelines[1].intervals[i].weatherImage = weatherImage;
      }
    }
  }

  viewDetails() {
    this.showWeatherTable = false;
    this.detailsTabEmitter.emit(this.showWeatherTable);
  }

  updateIndex(i: number) {
    this.currentIndex = i;
    this.indexEmitter.emit(this.currentIndex);
    this.viewDetails();
  }

  favClicked() {
    let loc = {
      city: this.location_string.split(",")[0],
      state: this.location_string.split(',')[1]
    }
    if(this.duplicate) {
      this.existing.splice(this.index, 1);
      this.duplicate = false;
    }
    else {
      this.existing.push(loc);
      this.duplicate = true;
    }
    localStorage.setItem("locations", JSON.stringify(this.existing));
  }

active = 1;
}

