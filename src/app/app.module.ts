import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { ArtistsPage } from '../pages/artists/artists';
import { ArtistPage } from '../pages/artist/artist';
import { AlbumsPage } from '../pages/albums/albums';
import { AlbumPage } from '../pages/album/album';
import { GenrePage } from '../pages/genre/genre';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { dbProvider } from '../providers/db';
import { MessageService } from '../providers/event';
import { SpotifyService } from '../providers/spotify.service';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    ArtistsPage,
    ArtistPage,
    AlbumsPage,
    AlbumPage,
    GenrePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    ArtistsPage,
    ArtistPage,
    AlbumsPage,
    AlbumPage,
    GenrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    dbProvider,
    MessageService,
    SpotifyService,
    InAppBrowser
  ]
})
export class AppModule {}
