import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { AlbumsPage } from '../albums/albums';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html'
})

export class ArtistPage{

  private pagetitle = "Artist";
  private artist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artist = this.navParams.get('artist');
    this.pagetitle = this.pagetitle + ` - ${this.artist.name}`;
  }

  updateLogo(item){
    item.logo = '/assets/icon/fallback-artist.png';
  }

  numberofAlbums(albums){
    return albums.length;
  }

  goTo(albums){
      if(this.numberofAlbums(albums) > 0){
          this.navCtrl.push(AlbumsPage,{
            albums: albums
          });
      }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
