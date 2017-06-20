import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { MessageService } from './event'

@Injectable()
export class dbProvider {
    private collection: any;
    private subscription: Subscription;
    private messages = [];

    constructor(private http: Http, private messageService: MessageService){
        this.subscription = messageService.subscribe('sender', (payload) => {
           this.messages.push(payload);
        });

        this.getDb().subscribe(data => {
            this.collection = data;
            this.send();
        }
        , error => console.log(error));
    }

    getDb(){
        return this.http.get('../assets/json/db.json')
                        .map((res:any) => res.json());
    }

    updateDb(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('../assets/json/db.json', JSON.stringify(this.collection), options);
    }

    getArtists(){
        return this.collection.artists;
    }

    getAlbums(){
        let albums = this.collection.artists.map(artist => {
            return artist.albums;
        });
        albums = [].concat.apply([], albums);;
        return albums;
    }

    getGenre(){
        return this.collection.artists.map(artist => {
            return artist.genre;
        });
    }

    getCollection(){
        return {
            artists: this.getArtists(),
            albums: this.getAlbums(),
            genres: this.getGenre()
        };
    }

    getSeenIntro(){
        return this.collection.hasSeenIntro;
    }

    setSeenIntro(seen){
        this.collection.hasSeenIntro = seen;
        this.updateDb();
    }

    isLoaded(){
        return this.collection != undefined ? true : false;
    }


    // send events
    send() {
      let payload = {
        text: `update`,
        respondEvent: 'sender'
      }
      this.messageService.broadcast('receiver', payload);
    }

    // clear event messages
    clear() {
      this.messages = [];
    }
}
