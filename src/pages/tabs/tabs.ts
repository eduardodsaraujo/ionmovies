import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ListaFilmesPage';
  tab3Root = 'ListaFilmesPage';
  tab2Params = { series: 1 };

  constructor() {
    console.log("TabsPage");
  }
  
}
