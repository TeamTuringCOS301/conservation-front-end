import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AlertPage } from '../pages/alert/alert';
<<<<<<< HEAD

=======
>>>>>>> a05fd7434bbc7799c5de069c7f56200ba7066c8b
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HttpModule} from '@angular/http';
import { StockPage } from '../pages/stock/stock';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { Http } from '../http-api';

@NgModule({
  declarations: [
    MyApp,
    AlertPage,
    TabsPage,
    LoginPage,
    StockPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlertPage,
    TabsPage,
    LoginPage,
    StockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FilePath,
    FileTransfer,
    File,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Http
  ]
})
export class AppModule {}
