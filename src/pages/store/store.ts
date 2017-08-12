import { ProductPage } from './../product/product';
import { Store } from './../../model/base/store';
import { StorageProvider } from './../../providers/storage/storage';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the StorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  public stores: Store[];
  private _httpService: HttpProvider;
  private _storage: StorageProvider;
  private _alertCtrl: AlertController;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpService: HttpProvider, 
    private loading: LoadingController,
    private alertCtrl: AlertController
  ) {

    this._httpService = httpService;
    this._alertCtrl = alertCtrl;

    let loader = loading.create({
      content: 'Buscando lojas'
    });

    loader.present();

    this._httpService
      .get("/store")
      .subscribe(data => {
        this.stores = data.json() as Store[];
        loader.dismiss();
      });
  }

  ionViewDidLoad() {

  }

  public goStore(store: Store) {
    // verifica se a loja possui endpoint para o serviço
    if (!store.enderecoServidor) {
      let alert = this._alertCtrl.create({
        title: 'Loja em construção',
        subTitle: 'Em breve mais uma loja da Club Life estará disponível!',
        buttons: ['Ok']
      });
      alert.present();
      return
    }

    let storage = new StorageProvider();
    storage.setStoreId(store.id);
    storage.setStoreUrl(store.enderecoServidor);
    this.navCtrl.push(ProductPage, store);
  }

}
