import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviedbProvider } from '../../providers/movie/moviedb';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../app/config/constants';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  filmesCartaz = new Array<any>();
  filmesNovos = new Array<any>();
  generos : Array<any>;
  mapGeneroFilmes =new Map<String,any[]>();
  constructor(public navCtrl: NavController, private moviedbProvider:MoviedbProvider) {
    console.log("homepage");
    this.generos = Constants.generos.slice(0,6);
  }

  ionViewDidLoad(){
    //this.carregaFilmes();
    this.carregaFilmesObservable( this.moviedbProvider.getFilmesEmCartaz(), this.filmesCartaz);
    this.carregaFilmesObservable( this.moviedbProvider.getProximosFilmes(), this.filmesNovos);
    for(let i = 0; i< this.generos.length; i++){
      let id = this.generos[i].id;
      this.carregaFilmesObservable( 
        this.moviedbProvider.getFilmesPorGenero(id), new Array<any>(), true, id);
    }


  }
  carregaFilmesObservable( filmesApi : Observable<Object>, filmes:any[],
         isPorGenero:boolean = false, genero = ""){
    filmesApi.subscribe(data => {
      let response = (data as any);
      response.results = response.results.filter(filme =>{
        return filme.poster_path;
      });
      for(let i = 0; i<response.results.length; i++){
        filmes.push(response.results[i]);
      }

      if(isPorGenero)
        this.mapGeneroFilmes.set(genero,filmes);
    });
  }
  carregaFilmes(){
    this.moviedbProvider.getFilmesEmCartaz().subscribe(
      data =>{
        const response = (data as any);
        this.filmesCartaz = response.results.filter(filme =>{
          return filme.poster_path;
        });
        console.log(this.slides);
        //this.page++;
        console.log(this.filmesCartaz);
      }, error=>{
        console.log(error);
      }
    )
    this.moviedbProvider.getProximosFilmes().subscribe(
      data =>{
        const response = (data as any);
        this.filmesNovos = response.results.filter(filme =>{
          return filme.poster_path;
        });
        //this.page++;
        console.log(this.filmesNovos);
      }, error=>{
        console.log(error);
      }
    )
  }

  ionViewDidEnter(){
    if(this.filmesCartaz && this.filmesCartaz.length){
      this.slides.stopAutoplay();
      this.slides.startAutoplay();
      this.slides.autoplayDisableOnInteraction = false;
    }
  }

  abrirDetalhes(filme:any){
    this.navCtrl.push('DetalhesFilmePage', {filme:filme});
  }

}
