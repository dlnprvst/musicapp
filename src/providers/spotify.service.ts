import { Injectable } from '@angular/core';
import { Http, Response, } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SpotifyService {
  private authInUrl = 'https://accounts.spotify.com/authorize/';
  private artistsUrl = 'http://api.spotify.com/v1/artists';
  private albumsUrl = 'http://api.spotify.com/v1/artists';
  private client_id = 'CLIENT_ID';
  public credentials: any = '';

  constructor(private http: Http) {

  }

  authInAPI(){
    return this.http.get(this.authInUrl + `?client_id=${this.client_id}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09`).map( (result) => {
      this.credentials = result;
    }).catch(this.handleError);
  }

  getArtists(){
    return this.http.get(this.artistsUrl).map( result => {
      result.json();
    }).catch(this.handleError);
  }

  getArtistsById(id){
    return this.http.get(this.artistsUrl + `/${id}`).map( result => {
      result.json();
    }).catch(this.handleError);
  }

  getAlbums(){
    return this.http.get(this.albumsUrl).map( result => {
      result.json();
    }).catch(this.handleError);
  }

  getAlbumsById(id){
    return this.http.get(this.albumsUrl + `${id}`).map( result => {
      result.json();
    }).catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error || 'server error');
  }
}
