import { Component, ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };
    constructor() {this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: '../../assets/images/quotes1.jpg',
            quote:'Everything will work out for me'
          },
          {
            id: 2,
            image: '../../assets/images/quotes2.jpg',
            quote:'I am a winner'
          },
          {
            id: 3,
            image: '../../assets/images/quotes3.jpg',
            quote:'The tools I need to succeed are in my possession'
          },
          {
            id: 4,
            image: '../../assets/images/quotes4.jpg',
            quote:'There is nobody better to get the job done than me'
          },
          {
            id: 5,
            image: '../../assets/images/quotes5.jpg',
            quote:'I have faith in my social skills'
          }
        ]
      };
    
    
    }
  quotes = ['Everything will work out for me', 'I am a winner', 'The tools I need to succeed are in my possession', 'Tornado'];
//Move to Next slide
slideNext(object, slideView) {
  slideView.slideNext(500).then(() => {
    this.checkIfNavDisabled(object, slideView);
  });
}

//Move to previous slide
slidePrev(object, slideView) {
  slideView.slidePrev(500).then(() => {
    this.checkIfNavDisabled(object, slideView);
  });;
}

//Method called when slide is changed by drag or navigation
SlideDidChange(object, slideView) {
  this.checkIfNavDisabled(object, slideView);
}

//Call methods to check if slide is first or last to enable disbale navigation  
checkIfNavDisabled(object, slideView) {
  this.checkisBeginning(object, slideView);
  this.checkisEnd(object, slideView);
}

checkisBeginning(object, slideView) {
  slideView.isBeginning().then((istrue) => {
    object.isBeginningSlide = istrue;
  });
}
checkisEnd(object, slideView) {
  slideView.isEnd().then((istrue) => {
    object.isEndSlide = istrue;
  });
}
  
}
