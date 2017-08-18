import { PostmonService } from './../../providers/postmon/postmon.service';
import { Address } from './../../model/base/address.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CreateAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html',
})
export class CreateAddressPage {

  public address: Address = new Address();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _postmonService: PostmonService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAddressPage');
  }

  public searchPostalCode(): void {
    let loader = this._loadingCtrl
      .create({
        content: 'Buscando endereço'
      });
    loader.present();

    this._postmonService
      .get(this.address.cep)
      .subscribe(data => {
        loader.dismiss();
        console.log(data);
      }, () => {
        console.log('pei..');
      });

  }

  public createAddress(address: Address): void {
    console.log('nan');
  }

}
