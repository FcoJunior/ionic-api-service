import { CreateAddressPage } from './../create-address/create-address';
import { IBasket } from './../../delegate/ibasket';
import { Address } from './../../model/base/address.model';
import { StorageService } from './../../providers/storage/storage.service';
import { HttpService } from './../../providers/http/http.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DeliverySelectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-select',
  templateUrl: 'delivery-select.html',
})
export class DeliverySelectPage {

  public address: Address[] = [];
  private _basketDelegate: IBasket;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _httpService: HttpService,
    private _storageService: StorageService
  ) { }

  ionViewDidLoad() {
    this._basketDelegate = this.navParams.data;

    let loader = this._loadingCtrl
      .create({
        content: 'Carregando endereços'
      });
    loader.present();

    this._httpService
      .get(`/address/getByCustomer?customerId=${this._storageService.getProlinsId()}`)
      .subscribe(data => {
        loader.dismiss();
        this.address = data.json() as Address[];
      }, () => {
        loader.dismiss();
      })
  }

  public dismiss(): void {
    this.navCtrl.pop();
  }

  public selectAddress(id: number): void {
    this.navCtrl.pop({}, () => {
      this._basketDelegate.reloadTaxeDelivery(id);
    });
  }

  public addAddress(): void {
    this.navCtrl.push(CreateAddressPage);
  }

}
