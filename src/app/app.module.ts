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
//import { AlertPage } from '../pages/alert/alert';
//import { TabsPage } from '../pages/tabs/tabs';
//import { BroadcastPage } from '../pages/broadcast/broadcast';
//import { LoginPage } from '../pages/login/login';
//import { StockAddPage} from '../pages/stock-add/stock-add';
//import { AlertPopupPage} from '../pages/alert-popup/alert-popup';
//import { BroadcastPopupPage} from '../pages/broadcast-popup/broadcast-popup';
//import { StockEditPage} from '../pages/stock-edit/stock-edit';
//import { StockPage } from '../pages/stock/stock';
//import { ProfilePage } from "../pages/profile/profile";
//import { AddBroadcastPopupPage} from '../pages/add-broadcast-popup/add-broadcast-popup';
//import { PopoverPage } from '../pages/popover/popover';

@NgModule({
  declarations: [
    MyApp//,
    //AlertPage,
    //TabsPage,
    //LoginPage,
    //StockPage,
    //StockAddPage,
    //AlertPopupPage,
    //StockEditPage,
    //BroadcastPage,
    //BroadcastPopupPage,
    //ProfilePage,
    //AddBroadcastPopupPage,
    //PopoverPage
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
    MyApp,
    //AlertPage,
    //TabsPage,
    //LoginPage,
    //StockPage,
    //StockAddPage,
    //AlertPopupPage,
    //StockEditPage,
    //BroadcastPage,
    //BroadcastPopupPage,
    //ProfilePage,
    //AddBroadcastPopupPage,
    //PopoverPage
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
