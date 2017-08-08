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

  public username: string;
  public password: string;
  private _httpService: HttpProvider;
  private _storage: StorageProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpProvider) {
    this._httpService = httpService;
    this._storage = new StorageProvider();
  }

  ionViewDidLoad() {

  }

  login():void {
    this.httpService
      .post('/login', 
      { 
        cpfCnpj: "05775040376", 
        senha: "12345" 
      })
      .subscribe(response => {
        this._storage.setIdentify(response.json());
      }, fail => {

      });
   }

}
