import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { getOptions, Options, color } from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-temp-range-chart',
  templateUrl: './temp-range-chart.component.html',
  styleUrls: ['./temp-range-chart.component.css'],
})
export class TempRangeChartComponent implements OnInit {

  @Input() weather!: any;
  
  ngOnInit() {
    if(this.weather && this.weather.data) {
    let ranges = []
    let i;
    for (i = 0; i<this.weather.data.timelines[1].intervals.length; i++) {
         let date_obj = new Date(this.weather.data.timelines[1].intervals[i].startTime);
         let chart_date = date_obj.getTime();
         let tempMin = this.weather.data.timelines[1].intervals[i].values.temperatureMin;
         let tempMax = this.weather.data.timelines[1].intervals[i].values.temperatureMax;
         let tmp = [chart_date, tempMin, tempMax];
         ranges.push(tmp);
     }

    let mycharts: any = {
        type: 'arearange',
        zoomType: 'x',
        style: {
            color:  {
                linearGradient:  { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#003399'], // start
                    [0.5, '#ffffff'], // middle
                    [1, '#3366AA'] // end
                ]
            }
        }	  
     };

     let mytitle: any = {
        text: 'Temperature Ranges (Min, Max)'   
     };    

     let myxAxis: any = {
        type: 'datetime',
     };

     let myyAxis: any = {
        title: {
           text: null
        }      
     };

     let mylegend: any = {
        enabled: false
     }    

     let myseries: any = [
         {
            name: 'Temperatures',
            data: ranges,
            type: 'arearange',
            borderWidth: 1,
            lineColor: '#FEA611',
            lineWidth: 1,
            fillOpacity: 0.2,
            zIndex: 0
        }]

     let myplotOptions: any = {
        series: {
            fillColor: { 
                linearGradient: [0, -10, 0, 800],
                stops: [
                    [0.1, '#FEA611'],
                    [0.5, color(getOptions?.()?.colors?.[0] || "#FEA611").setOpacity(0.2).get('rgba')]
                ]
            }
        }
    }

    let mytooltip: any = {
      shared: true,
        crosshairs: true,
        valueSuffix: '\xB0F',
        xDateFormat: "%A, %b %e"
    }
    let json: Options = {
      series: myseries,
      chart: mycharts,
      title: mytitle,
      xAxis: myxAxis,
      yAxis: myyAxis,
      legend: mylegend,
      tooltip: mytooltip,
      plotOptions: myplotOptions
    }
    Highcharts.chart("tempChart", json);
  }
}
}