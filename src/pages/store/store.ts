import { ProductPage } from './../product/product';
import { Store } from './../../model/base/store.model';
import { StorageProvider } from './../../providers/storage/storage';
import { HttpService } from './../../providers/http/http.service';
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
  private _storage: StorageProvider;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _httpService: HttpService, 
    private _loading: LoadingController,
    private _alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    // Create loading page.
    let loader = this._loading.create({
      content: 'Buscando lojas'
    });
    loader.present();

    // Capture stores.
    this._httpService
      .get("/store")
      .subscribe(data => {
        this.stores = data.json() as Store[];
        loader.dismiss();
    });
  }

  /**
   * Call store page.
   */
  public goStore(store: Store) {
    // Check if store have endpoint to web service.
    if (!store.enderecoServidor) {
      // If not, show message alert.
      let alert = this._alertCtrl.create({
        title: 'Loja em construção',
        subTitle: 'Em breve mais uma loja da Club Life estará disponível!',
        buttons: ['Ok']
      });
      alert.present();
      return
    }

    // Save on local storage storeId and endpoint to server.
    let storage = new StorageProvider();
    storage.setStoreId(store.id);
    storage.setStoreCNPJ(store.cnpj.replace(/[\.\-\/]/g, ''));
    storage.setStoreUrl(store.enderecoServidor);

    // Navigation to page of products list.
    this.navCtrl.push(ProductPage, store);
  }

}
