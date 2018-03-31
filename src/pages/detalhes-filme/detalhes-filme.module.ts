import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesFilmePage } from './detalhes-filme';
import { YoutubePipeModule } from '../../pipes/youtube/youtube.module';

@NgModule({
  declarations: [
    DetalhesFilmePage,
  ],
  imports: [
    YoutubePipeModule,
    IonicPageModule.forChild(DetalhesFilmePage),
  ],
})
export class DetalhesFilmePageModule {}
