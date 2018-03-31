import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { MoviedbProvider } from '../../providers/movie/moviedb';
import { trigger, style, transition, animate, query } from '@angular/animations';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'lista-filmes.html',
  animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(':leave', [
          style({transform: 'translateX(0)'}),
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1, transform: 'translateX(-100%)' }))
        ], { optional: true }),
        query(':enter', [
          style({transform: 'translateX(-100%)'}),
          style({ opacity: 0 }),
          animate('500ms 1000ms', style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true })
      ])
        ])
  ]
})
export class ListaFilmesPage {
  infiniteScroll: any;
  loader;
  refresher;
  isRefreshing: boolean = false;
  page : number =1;
  series;
  type;
  titlePage="";
  lista_filmes = new Array<any>();
  constructor(public navCtrl: NavController, private moviedbProvider:MoviedbProvider,
              public loadingCtrl: LoadingController, navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
    this.nativePageTransitions.fade(null);
    this.series = navParams.get('series');
    if(this.series != null){
      this.type = "tv"
      this.titlePage="Séries";
    }else{
      this.type = "movie"
      this.titlePage="Filmes";
    }
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.loadMoreMovies();
  }


  loadMoreMovies(){
    this.page++;
    this.moviedbProvider.getLatestMovies(this.page, this.type).subscribe(
      data =>{
        const response = (data as any);
        for(let i = 0; i<response.results.length; i++){
          setTimeout(()=>{ this.lista_filmes.push(response.results[i])},i*500);
        }
        console.log(this.lista_filmes);
        this.infiniteScroll.complete()
      }, error=>{
        console.log(error);
        this.infiniteScroll.complete()
      }
    )
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaFilmes();
  }

  ionViewDidLoad(){
    this.carregaFilmes();
  }

  carregaFilmes(){
    this.page = 1;
    this.abreCarregando();
    this.moviedbProvider.getLatestMovies(this.page, this.type).subscribe(
      data =>{
        const response = (data as any);
        if(this.isRefreshing){
          this.lista_filmes = [];
        }
        for(let i = 0; i<response.results.length; i++){
          setTimeout(()=>{ this.lista_filmes.push(response.results[i])},i*500);
        }
        //this.page++;
        console.log(this.lista_filmes);
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
            this.isRefreshing = false;
        }
      }, error=>{
        console.log(error);
        this.fechaCarregando();
      }
    )
  }

  abrirDetalhes(filme:any){
    if(this.series)
      this.navCtrl.push('DetalhesFilmePage', {filme:filme, series:this.series});
    else
      this.navCtrl.push('DetalhesFilmePage', {filme:filme});  
  }
}
