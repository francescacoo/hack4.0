import { Component, ElementRef, ViewChild } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Chart } from 'chart.js';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';


var event=""
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  @ViewChild('barChart', {static: false}) barChart;

  databaseObj: SQLiteObject; // Database instance object
  readonly database_name:string = 'SOS.db'; // DB name
  readonly table_name:string = "moodlogs"; // Table name
  
  event: any;
  public dataToStore;
  list: any;
  className: string;
  bars: any;
  colorArray: any;
  lineChart: Chart;
  lineCanvas: any;
  moodValue:number; // 

  constructor(
    private callNumber: CallNumber,
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    });
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('Database' + this.database_name + ' Created!');
   this.createTable();
      })
      .catch(e => {
        alert('error ' + JSON.stringify(e));
      });

  }

  createTable() {
    // tslint:disable-next-line:max-line-length
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, mood_value INTEGER, created_at DEFAULT CURRENT_TIMESTAMP)', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert('error ' + JSON.stringify(e));
      });
  }

  insertMood() {
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (mood_value) VALUES ("' + this.moodValue+ '")', [])
      .then(() => {
        alert('Row mood Inserted!');
    //    this.getPuffs();

      })
      .catch(e => {
        alert('error ' + JSON.stringify(e))
      });
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
    this.moodValue=$event.detail.value;


    if(this.event<33){
      this.changeClass ();
      console.log(this.className)
    }
    console.log(event);
  }
storeMood(){
  alert("storing_mood");    
  this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (mood_value) VALUES ("' + this.moodValue + '")', [])
  .then(() => {
    alert('Row Inserted!');

  })
  .catch(e => {
    alert('error ' + JSON.stringify(e));
  });                                  
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
  
   

