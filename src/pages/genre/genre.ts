import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ArtistsPage } from '../artists/artists';

import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html'
})

export class GenrePage{

  private pagetitle = 'Genre';
  private genres: any;
  private subscription: Subscription;
  private messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: dbProvider, public messageService: MessageService) {

    if(! this.dbProvider.isLoaded()){
      this.subscription = messageService.subscribe('receiver', (payload) => {
        this.messages.push(payload);
        this.genres = this.dbProvider.getGenre();
      });
    }
    else{
      this.genres = this.dbProvider.getGenre();
    }
  }

  send(message: {text: string, respondEvent: string}) {
    this.messageService.broadcast(message.respondEvent, message.text);
  }

  clear() {
    this.messages = [];
  }

  goTo(genre){
    this.navCtrl.push(ArtistsPage,{
      genre: genre
    });
  }

}
