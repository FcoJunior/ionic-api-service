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
  httpService: HttpProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, httpService: HttpProvider) {
    this.httpService = httpService
  }

  ionViewDidLoad() {

  }

  login():void {
    this.httpService.get('60731455').subscribe(res => {console.log(res)});
  //   this.httpService
  //     .post('/login', 
  //     { 
  //       cpfCnpj: "05775040376", 
  //       senha: "12345" 
  //     }, 
  //     success => {
  //       console.log(success);
  //     }, 
  //     error => {
  //       console.log(error);
  //     });
   }

}
