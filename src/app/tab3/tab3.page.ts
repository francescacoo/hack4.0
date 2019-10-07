import { Component, ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  constructor()  { 
   
  }


  play(){
    var audio = new Audio("../../assets/audio/track1.mp3");
    audio.play();
  }
}
