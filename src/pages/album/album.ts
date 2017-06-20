import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-album',
  templateUrl: 'album.html'
})

export class AlbumPage{

  private pagetitle = "Album";
  private album: any;
  private subscription: Subscription;
  private messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: dbProvider, public messageService: MessageService, private iab: InAppBrowser, private alertCtrl: AlertController) {
      this.album = this.navParams.get('album');
      this.pagetitle = this.pagetitle + ` - ${this.album.title}`;

      if(! this.dbProvider.isLoaded()){
          this.subscription = messageService.subscribe('receiver', (payload) => {
            this.messages.push(payload);
            this.addArtist(this.dbProvider.getArtists());
          });
      }
      else{
          this.addArtist(this.dbProvider.getArtists());
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

  addArtist(artists){
    let artist = artists.filter(artist => {
      return artist.albums.indexOf(this.album) > -1;
    })[0];
    this.album.artist = artist.name;
  }

  launchIAB(url){
      if(url === ""){
          this.alertCtrl.create({
            title: 'Error',
            message: 'Sorry, no URL was find, couldn\'t access the song.',
            buttons: ['OK']
          }).present();
      }
      else{
          this.iab.create(url);
      }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
