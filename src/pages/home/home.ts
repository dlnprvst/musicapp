import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ArtistsPage } from '../artists/artists';
import { ArtistPage } from '../artist/artist';
import { AlbumPage } from '../album/album';

import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private pagetitle = "Search";
  private collection: any = {};
  private items = [];
  private subscription: Subscription;
  private messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: dbProvider, public messageService: MessageService) {
    if(! this.dbProvider.isLoaded()){
      this.subscription = messageService.subscribe('receiver', (payload) => {
        this.messages.push(payload);
        this.collection = this.dbProvider.getCollection();
      });
    }
    else{
      this.collection = this.dbProvider.getCollection();
    }
  }

  onInput(searchBar){
    let query = searchBar.target.value;

    // If searchbar empty, clear the items array;
    if (!query){
      this.items = [];
      return;
    }

    // Retrieve corresponding artists
    let artists = this.collection.artists.filter((item) => {
        if(item.name && query){
          if (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
    });
    // Retrieve corresponding albums
    let albums = this.collection.albums.filter((item) => {
        if(item.title && query){
          if (item.title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
    });
    // Retrieve corresponding genres
    let genres = this.collection.genres.filter((item) => {
          if(item && query){
            if (item.toLowerCase().indexOf(query.toLowerCase()) > -1) {
              return true;
            }
            return false;
          }
    });

    // Build items array of results with just 3 items of each category
    this.items = [
      artists.slice(0,3),
      albums.slice(0,3),
      genres.slice(0,3)
    ];
  }

  updateLogo(item, type){
      if(type === 'artist'){
          item.logo = '/assets/icon/fallback-artist.png';
      }
      else{
          item.logo = '/assets/icon/album-art-empty.png';
      }
  }

  hasResult(index){
    return this.items[index] != null ? this.items[index].length > 0 : false;
  }

  goToArtist(artist){
    this.navCtrl.push(ArtistPage,{
      artist: artist
    });
  }

  goToAlbum(album){
    this.navCtrl.push(AlbumPage,{
      album: album
    });
  }

  goToGenre(genre){
    this.navCtrl.push(ArtistsPage,{
      genre: genre
    });
  }

}
