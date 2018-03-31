import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviedbProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
  }

  getTrailer(movieId) {
    return this.http.get(this.baseApiPath +
      "/movie/" + movieId + "/videos?api_key=aa53d1fadc595eac9265df956ad2a5dd&language=pt-BR"
    );
  }

  getFilmesPorGenero(genero) {
    return this.http.get(this.baseApiPath +
      "/discover/movie?api_key=aa53d1fadc595eac9265df956ad2a5dd&language=pt-BR&region=BR&sort_by=popularity.desc&page=1&with_genres=" + genero
    );
  }


  getFilmesEmCartaz() {
    return this.http.get(this.baseApiPath +
      "/movie/now_playing?api_key=aa53d1fadc595eac9265df956ad2a5dd&language=pt-BR&&region=BR"
    )
  }

  getProximosFilmes() {
    return this.http.get(this.baseApiPath +
      "/movie/upcoming?api_key=aa53d1fadc595eac9265df956ad2a5dd&language=pt-BR&&region=BR"
    )
  }

  getLatestMovies(page, type) {
    return this.http.get(this.baseApiPath +
      "/" + type + "/popular?api_key=aa53d1fadc595eac9265df956ad2a5dd&language=pt-BR&page=" + page + "&region=BR"
    );
  }
}
