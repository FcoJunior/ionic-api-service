import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { StorePage } from './../pages/store/store';
import { ProductPage } from './../pages/product/product';
import { ProductDetailPage } from './../pages/product-detail/product-detail';
import { BasketPage } from './../pages/basket/basket';
import { DeliverySelectPage } from './../pages/delivery-select/delivery-select';

import { HttpService } from '../providers/http/http.service';
import { StorageService } from '../providers/storage/storage.service';
import { SqliteHelperService } from './../providers/sqlite-helper/sqlite-helper.service';
import { BasketService } from '../providers/basket/basket.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    StorePage,
    ProductPage,
    ProductDetailPage,
    BasketPage,
    DeliverySelectPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    StorePage,
    ProductPage,
    ProductDetailPage,
    BasketPage,
    DeliverySelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    SQLite,
    HttpService,
    SqliteHelperService,
    BasketService
  ]
})
export class AppModule {}
