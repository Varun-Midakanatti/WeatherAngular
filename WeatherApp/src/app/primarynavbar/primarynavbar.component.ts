import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primarynavbar',
  templateUrl: './primarynavbar.component.html',
  styleUrls: ['./primarynavbar.component.css']
})
export class PrimarynavbarComponent implements OnInit {
  static show() {
    
  }

  constructor() { }

  @Input()  switchToFirstTab!: boolean;
  @Input()  showWeatherTable!: boolean;
  @Input()  weather!: any;
  @Input()  showProgressBar!: boolean;
  @Input()  autoLocationChecked!: boolean;
  @Input()  location_string!: string;
  @Input()  duplicate!: boolean;
  @Input()  active!: number;

  @Output()  activeTabEmitter = new EventEmitter<number>();

  @Output() locationEmitter = new EventEmitter<string>();

  currentIndex = -1;
  days: any;

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('Tab change');
  }

  switchTab(i: number) {
    this.active = i;
    this.activeTabEmitter.emit(this.active);
  }

  toggleTables($event: boolean) {
    this.showWeatherTable = $event;
  }

  updateCurrentIndex($event: number) {
    this.currentIndex = $event;
  }

  modifyWeatherData($event: any) {
    this.weather = $event;
  }

  emitToForm(event: any) {
    this.location_string = event;
    this.locationEmitter.emit(this.location_string);
    this.activeTabEmitter.emit(1);
  }

}
