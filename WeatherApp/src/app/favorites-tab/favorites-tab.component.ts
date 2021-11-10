import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites-tab',
  templateUrl: './favorites-tab.component.html',
  styleUrls: ['./favorites-tab.component.css']
})
export class FavoritesTabComponent implements OnInit {
  ngOnInit(): void {
    this.favorites = localStorage.getItem("locations");
    this.favorites = JSON.parse(this.favorites);
  }

  @Input() weather!: any;
  @Input() location_string!: any;

  @Output() locationEmitter = new EventEmitter<string>();
  favorites: any = [];

  deleteFromFavorites(index: number) {
    this.favorites.splice(index, 1);
    localStorage.setItem("locations", JSON.stringify(this.favorites));
  }

  searchFav(index: number) {
    this.location_string = this.favorites[index].city + "," + this.favorites[index].state;
    this.locationEmitter.emit(this.location_string);
  }

}
