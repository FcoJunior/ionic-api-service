import { StorePage } from './../store/store';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from './../../providers/http/http';

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
  private _httpService: HttpProvider;
  private _storage: StorageProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpProvider) {
    this._storage = new StorageProvider();
    if (this._storage.isLogged()) {
      this.navCtrl.push(StorePage);
    };
    
    this._httpService = httpService;
  }

  ionViewDidLoad() {

  }

  login(data: Object):void {
    this.httpService
      .post('/login', data)
      .subscribe(response => {
        this._storage.setIdentify(response.json());
        this.navCtrl.push(StorePage);
      }, fail => {

      });
   }

}
