import { Component, Input, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  providers: [NgbProgressbarConfig] 
})
export class ProgressBarComponent implements OnInit {

  @Input() showProgressBar!: boolean;

  constructor(config: NgbProgressbarConfig) { 
    config.max = 1000;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit(): void {
  }

}
