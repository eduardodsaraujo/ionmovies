import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviedbProvider } from '../../providers/movie/moviedb';
import { trigger, style, transition, animate, query } from '@angular/animations';

/**
 * Generated class for the BuscaFilmesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca-filmes',
  templateUrl: 'busca-filmes.html',
  animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(':leave', [
          style({transform: 'translateX(0)'}),
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0, transform: 'translateX(-100%)' }))
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1}))
        ], { optional: true })
      ])
        ])
  ]
})
export class BuscaFilmesPage {
  lista_filmes: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private moviedbProvider:MoviedbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaFilmesPage');
  }


  onInput(event:any){
    setTimeout(() => {
      var palavra = event.target.value;
      if(palavra && palavra.length > 0){
        this.moviedbProvider.buscarFilmes(palavra).subscribe(data =>{
              const response = (data as any);
              this.lista_filmes = response.results as Array<any>;
          }, error=>{
            console.log(error);
          }
        )
      } else{
        this.lista_filmes = [];
      }
  
    }, 500);
  }

  abrirDetalhes(filme:any){
      this.navCtrl.push('DetalhesFilmePage', {filme:filme});  
  }
}
