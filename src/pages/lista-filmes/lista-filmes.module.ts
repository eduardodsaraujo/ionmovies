import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import { ListaFilmesPage } from './lista-filmes';

@NgModule({
  declarations: [
    ListaFilmesPage,
  ],
  imports: [
    ElasticHeaderModule,
    IonicPageModule.forChild(ListaFilmesPage),
 ],
})
export class ListaPageModule {}
