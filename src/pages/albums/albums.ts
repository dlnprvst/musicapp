import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { AlbumPage } from '../album/album';

import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html'
})

export class AlbumsPage{

  private pagetitle = "Albums";
  private albums: any;
  private subscription: Subscription;
  private messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: dbProvider, public messageService: MessageService) {
    if(typeof this.navParams.get('albums') != "undefined"){
      this.albums = this.navParams.get('albums');
    }
    else{
      if(! this.dbProvider.isLoaded()){
        this.subscription = messageService.subscribe('receiver', (payload) => {
          this.messages.push(payload);
          this.albums = this.dbProvider.getAlbums();
        });
      }
      else{
        this.albums = this.dbProvider.getAlbums();
      }
    }
  }

  updateLogo(album){
      album.logo = '/assets/icon/album-art-empty.png';
  }

  send(message: {text: string, respondEvent: string}) {
    this.messageService.broadcast(message.respondEvent, message.text);
  }

  clear() {
    this.messages = [];
  }

  goTo(album){
    this.navCtrl.push(AlbumPage,{
      album: album
    });
  }

}
