import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaFilmesPage } from './busca-filmes';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    BuscaFilmesPage,
  ],
  imports: [
    ElasticHeaderModule,
    IonicPageModule.forChild(BuscaFilmesPage),
  ],
})
export class BuscaFilmesPageModule {}
