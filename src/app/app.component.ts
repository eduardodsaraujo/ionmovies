import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      this.rootPage = 'IntroPage';
      
      let slideIntro =  localStorage.getItem("slideIntro");
      if(slideIntro == null){
        this.rootPage = 'IntroPage';
        localStorage.setItem("slideIntro", "true");
      }else{
        this.rootPage = 'TabsPage';
      }


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
