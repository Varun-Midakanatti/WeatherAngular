import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimarynavbarComponent } from '../primarynavbar/primarynavbar.component';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.css']
})
export class UserinputComponent implements OnInit {

  constructor() { }

  // @ViewChild('child') child:PrimarynavbarComponent | undefined;


  ngOnInit(): void {
  }

  disable = false; // to control disabled states of input fields
  city = "";
  street = "";
  state = "";
  streetHidden = true; // to control validation message
  cityHidden = true;
  stateValid = false;
  autoLocationChecked = false;
  searchDisabled = true; // to control search button
  switchToFirstTab = false; //to switch to results tab on clear
  showWeatherTable = false;
  weather: any;
  showProgressBar = false;
  location_string = "";
  tweetMsg = "";
  duplicate = false;
  active = 1;

  onAutoLocationChecked() {
    this.autoLocationChecked = !this.autoLocationChecked;
    this.searchDisabled = !this.searchDisabled;
    this.disable = !this.disable;
    this.streetHidden = true;
    this.cityHidden = true;
  }

  onStreetChange(e: any) {
    this.street = e.target.value;
    if (this.street == "") {
      this.streetHidden = false
    }
    else {
      this.streetHidden = true
    }
  }

  onCityChange(e: any) {
    this.city = e.target.value;
    if (this.city == "") {
      this.cityHidden = false
    }
    else {
      this.cityHidden = true
    }
  }

  onStateChange(e: any) {
    this.state = e.target.value;
    if(this.state != "") {
      this.stateValid = true
    }
    else {
      this.stateValid = false;
    }
  }

  async onSearchClicked() {
    let loc;
    this.showProgressBar = true;
    const ipkey = "7cd76d6ae00046";
    const geokey = "AIzaSyCJJgHbGCmnExuO80cS-J7NDGbuU4YRWqY";
    this.showWeatherTable = true;
    if(this.autoLocationChecked) {
      let ipcall = await fetch(`https://ipinfo.io/?token=${ipkey}`);
      let ipdata = await ipcall.json();
      let user_city = ipdata.city
      let user_state = ipdata.region
      // let user_zip = ipdata.postal
      // let user_country = ipdata.country
      this.location_string = user_city + ', ' + user_state;
      let arr = ipdata.loc.split(",")
      loc = { 
              "lat": arr[0],
              "lng": arr[1]               
      }
    }
    else {
      let stateval = this.state;
      let cityval = this.city;
      let streetval = this.street;

      let address = ""
      stateval = stateval.replace(" ", "+")
      cityval = cityval.replace(" ", "+")
      streetval = streetval.replace(" ", "+")
      address = stateval + "+" + cityval + "+" + streetval

      try {
      let call1 = await fetch(`https://maps.googleapis.com//maps/api/geocode/json?address=${address}&key=${geokey}`);
      let data1 = await call1.json();
      loc = data1.results[0].geometry.location;
      this.location_string = cityval.replace('+', ' ') + "," + stateval.replace('+', ' ');
      console.log(this.location_string);
      } catch (e) {
          console.log("Error", e)
      }
    }
    try {
    
      let call2 = await fetch(`http://localhost:3000/api?lat=${loc.lat}&lng=${loc.lng}`, {
          method: 'get', 
          headers:{
          'Content-Type': 'application/json'
          }
      });
      this.weather = await call2.json();
      this.showProgressBar = false;
      console.log(this.weather);
  
  } catch (e) {
      console.log(`Error: ${e}`)
  }
  }

  async callClicked(event: string) {
    this.weather = {};
    this.showProgressBar = true;
    console.log("Final location", event);
    const geokey = "AIzaSyCJJgHbGCmnExuO80cS-J7NDGbuU4YRWqY";
    let address = ""
    address = event.replace(" ", "+");
    let loc: any;

      try {
      let call1 = await fetch(`https://maps.googleapis.com//maps/api/geocode/json?address=${address}&key=${geokey}`);
      let data1 = await call1.json();
      loc = data1.results[0].geometry.location;
      this.location_string = address = address.replace("+", " ");
      console.log(this.location_string);
      } catch (e) {
          console.log("Error", e)
      }
    try {
    
      let call2 = await fetch(`http://localhost:3000/api?lat=${loc.lat}&lng=${loc.lng}`, {
          method: 'get', 
          headers:{
          'Content-Type': 'application/json'
          }
      });
      this.weather = await call2.json();
      this.showProgressBar = false;
      console.log(this.weather);
  
  } catch (e) {
      console.log(`Error: ${e}`)
  }
  }

  switchTab(e: any) {
    this.active = e;
  }

  clearValues() {
    this.city = "";
    this.street = "";
    this.state = "";
    this.location_string = "";
    this.disable = false;
    this.searchDisabled = true;
    this.autoLocationChecked = false;
    this.switchToFirstTab = true;
    this.showWeatherTable = false;
    this.weather = null;
    this.streetHidden = true;
    this.cityHidden = true;
    this.stateValid = false;
    this.duplicate = false;
    this.active = 1;
  }

}
