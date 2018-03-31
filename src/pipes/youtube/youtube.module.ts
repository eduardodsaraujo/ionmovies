import { NgModule } from '@angular/core';
import { YoutubePipe } from './youtube';

@NgModule({
  declarations: [
    YoutubePipe,
  ],
  imports: [
  ],
  exports:[
      YoutubePipe
  ]
})
export class YoutubePipeModule {}
