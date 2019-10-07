import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import {PayPal} from '@ionic-native/paypal/ngx'
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { SQLite } from '@ionic-native/sqlite/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    PayPal,Media,
    NativeAudio ,
    CallNumber,
    SQLite,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
