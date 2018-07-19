import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AlertPage } from '../pages/alert/alert';
import { TabsPage } from '../pages/tabs/tabs';
import { BroadcastPage } from '../pages/broadcast/broadcast';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StockAddPage} from '../pages/stock-add/stock-add';
import { AlertPopupPage} from '../pages/alert-popup/alert-popup';
import { StockEditPage} from '../pages/stock-edit/stock-edit';
import { HttpModule} from '@angular/http';
import { StockPage } from '../pages/stock/stock';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Http } from '../http-api';

@NgModule({
  declarations: [
    MyApp,
    AlertPage,
    TabsPage,
    LoginPage,
    StockPage,
    StockAddPage,
    AlertPopupPage,
    StockEditPage,
    BroadcastPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlertPage,
    TabsPage,
    LoginPage,
    StockPage,
    StockAddPage,
    AlertPopupPage,
    StockEditPage,
    BroadcastPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FilePath,
    FileTransfer,
    File,
    Camera,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Http
  ]
})
export class AppModule {}
