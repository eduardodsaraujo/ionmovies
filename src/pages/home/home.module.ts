import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ElasticHeaderModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports:[
    HomePage
  ]
})
export class HomePageModule {}
