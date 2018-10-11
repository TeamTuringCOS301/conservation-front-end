import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Http } from '../http-api';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { PopoverController } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicImageViewerModule,
    Ng2ImgToolsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FilePath,
    FileTransfer,
    File,
    Camera,
    Transfer,
    PopoverController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Http
  ]
})
export class AppModule {}
