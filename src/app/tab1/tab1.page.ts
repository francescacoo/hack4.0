import { Component, ElementRef, ViewChild } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Chart } from 'chart.js';

var event=""
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  @ViewChild('barChart', {static: false}) barChart;

  event: any;
  public dataToStore;
  list: any;
  className: string;
  bars: any;
  colorArray: any;
  lineChart: Chart;
  lineCanvas: any;
  constructor(
    private callNumber: CallNumber
  ) {

  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
 

  changeClass () {
    this.className = '.opacity';
 }
  changeRange($event: any){
    console.log($event);
    this.event=$event.detail.value;

    if(this.event<33){
      this.changeClass ();
      console.log(this.className)
    }
    console.log(event);
  }

  ionViewDidEnter() {
    this.createBarChart();
    this.createLineChart();

  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Mood Tracker',
          data: [25, 38, 5, 69, 91, 35, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



  createLineChart() {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false
        }
      ]
    }
  });

  }






}
  
   

