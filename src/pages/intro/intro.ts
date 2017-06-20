import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { HomePage } from '../home/home';

import { dbProvider } from '../../providers/db';
import { MessageService } from '../../providers/event';

import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})

export class IntroPage{
    private subscription: Subscription;
    private messages = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav, public dbProvider: dbProvider, public messageService: MessageService) {
      if(! this.dbProvider.isLoaded()){
        this.subscription = messageService.subscribe('receiver', (payload) => {
          this.messages.push(payload);
          if(this.dbProvider.getSeenIntro()){
            this.goTo();
          }
        });
      }
    }

    goTo(){
      this.dbProvider.setSeenIntro("true");
      this.nav.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }
}
