import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { ArtistPage } from '../artist/artist';

// Custom providers
import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html'
})

export class ArtistsPage{

  private pagetitle = "Artists";
  private artists: any;
  private subscription: Subscription;
  private messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: dbProvider, public messageService: MessageService) {
    // subscribe to event
    if(! this.dbProvider.isLoaded()){
        this.subscription = messageService.subscribe('receiver', (payload) => {
          this.messages.push(payload);
          this.artists = this.dbProvider.getArtists();
        });
    }
    else{
        this.artists = this.dbProvider.getArtists();
    }

    //filter by genres
    if(typeof this.navParams.get('genre') != "undefined"){
      this.artists = this.artists.filter(artist => {
        console.log(this.navParams.get('genre'));
        return artist.genre == this.navParams.get('genre');
      });
      this.pagetitle = this.pagetitle + ` - ${this.navParams.get('genre')}`;
    }
  }

  updateLogo(item){
    item.logo = '/assets/icon/fallback-artist.png';
  }

  send(message: {text: string, respondEvent: string}) {
    this.messageService.broadcast(message.respondEvent, message.text);
  }

  clear() {
    this.messages = [];
  }

  goTo(artist){
    this.navCtrl.push(ArtistPage,{
      artist: artist
    });
  }

}
