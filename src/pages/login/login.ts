import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { HttpService } from './../../providers/http/http.service';
import { StorageService } from './../../providers/storage/storage.service';

import { StorePage } from './../store/store';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formData: Object = new Object();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _httpService: HttpService, 
    private _loadingCtrl: LoadingController,
    private _storage: StorageService
  ) { }

  ionViewDidLoad() {
    if (this._storage.isLogged()) {
      this.navCtrl.push(StorePage);
    };
  }

  login(data: Object):void {
    let loader = this._loadingCtrl.create({
      content: 'Autenticando usuário'
    });

    loader.present();

    this._httpService
      .post('/login', data)
      .subscribe(response => {
        loader.dismiss();
        this._storage.setIdentify(response.json());
        this.navCtrl.push(StorePage);
      }, fail => {
        loader.dismiss();
      });
   }

}
