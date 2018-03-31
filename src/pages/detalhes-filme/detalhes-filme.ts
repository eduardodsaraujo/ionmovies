import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/config/constants';
import { MoviedbProvider } from '../../providers/movie/moviedb';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
/**
 * Generated class for the DetalhesFilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalhes-filme',
  templateUrl: 'detalhes-filme.html'  
})
export class DetalhesFilmePage {
  filme:any;
  series:any;
  videoUrl:string;
  showVideo:boolean = false;
  selectedIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams, private moviedbProvider:MoviedbProvider ) {
    this.filme = navParams.get("filme");
    this.selectedIndex = Math.floor(Math.random() * 3) + 1;
    this.series = navParams.get('series');
    console.log(this.filme);
  }

  ionViewDidLoad() {
    if(this.series == null)
      this.moviedbProvider.getTrailer(this.filme.id).subscribe(data =>{
        const response = (data as any);
        var list_videos = response.results as Array<any>;
        if(list_videos.length>0){
          console.log(list_videos[0].key);
          this.videoUrl = list_videos[0].key;
          
        }
      })
  }


  getGeneros(){
    if(this.filme && this.filme.genre_ids){
      let generos = Constants.generos;
      let gens = [];
      this.filme.genre_ids.forEach(function (genre_id) {
        let genero = generos.find( x => x.id == genre_id);
        if(genero.name != null)
          gens.push(genero.name);
      })

      if(gens.length>0){
        return (gens.join(", "));
      }else{
        return "";
      }
    }
  }

  voltar(){
    this.navCtrl.pop();
  }
  
}
