import { Component, ElementRef, ViewChild } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Chart } from 'chart.js';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';


var event="";
var arrayValue= [];
var arrayTimes= [];

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
  row_data: any[];


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
 //       alert('Database' + this.database_name + ' Created!');
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
//        alert('Table Created!');
      })
      .catch(e => {
        alert('error ' + JSON.stringify(e));
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
 // alert("storing_mood");    
  this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (mood_value) VALUES ("' + this.moodValue + '")', [])
  .then(() => {
//    alert('Row Inserted!');
this.addData(this.bars,"5",this.moodValue);
  })
  .catch(e => {
    alert('error ' + JSON.stringify(e));
  });                                  
}

 addData(bars, label, data) {
  bars.data.labels.push(label);
  bars.data.labels.splice(0,1);
  bars.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
      dataset.data.splice(0, 1);
  });
  
  bars.update();
}

 removeData(chart) {
  chart.datasets.data.labels.splice(0, 1);
  chart.datasets.data.splice(0, 1);

  chart.update();
}

  ionViewDidEnter() {
    this.createBarChart();

  }

  createBarChart() {

    this.databaseObj.executeSql("SELECT mood_value AS value, created_at AS time, pid AS id FROM " + this.table_name + " ORDER BY pid DESC LIMIT 10", [])
    .then((res) => {
      this.row_data = [];
   
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
        //  this.row_data.push(res.rows.item(i));
  //      alert(res.rows.item(i).value);
  //      this.arrayValue[i]=res.rows.item(i).value;
        arrayValue.push(res.rows.item(i).value);

        arrayTimes.push(res.rows.item(i).id);
        }
        this.bars = new Chart(this.barChart.nativeElement, {
          type: 'bar',
          data: {
            labels: arrayTimes,
            datasets: [{
              label: 'Mood Score',
              data: arrayValue,
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
              }],
              xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }]
            }
          }
        });
      }
    })
    .catch(e => {
      alert('error boh' + JSON.stringify(e));
    });

  //    alert(arrayTimes);



   
  }


  
   
}
