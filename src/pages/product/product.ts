import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { BasketPage } from './../basket/basket';
import { ProductDetailPage } from './../product-detail/product-detail';

import { HttpService } from './../../providers/http/http.service';
import { StorageService } from './../../providers/storage/storage.service';

import { Store } from './../../model/base/store.model';
import { Product } from './../../model/base/product.model';

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public products: Product[];
  public store: Store = new Store();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _loading: LoadingController,
    private _storage: StorageService,
    private _alertCtrl: AlertController,
    private _httpService: HttpService
  ) { }

  ionViewDidLoad() {
    // Get store selected.
    this.store = this.navParams.data;
    
    // Create page loading.
    let loader = this._loading.create({
      content: 'Buscando produtos'
    });
    loader.present();

    // Capture for products with store id.
    this._httpService
      .get(`/store/getproducts/${this._storage.getStoreId()}`, this._storage.getStoreUrl())
      .subscribe(response => {
        loader.dismiss();
        this.products = response.json() as Product[];
      }, fail => {
        loader.dismiss();
    });
  }

  /**
   * Method for show product detail if it exists in stock.
   * @param product 
   */
  public showDetails(product: Product) {
    if(product.quantidade < 1) {
      // Show alert if product not have stock.
      let alert = this._alertCtrl.create({
          title: 'Produto em falta!',
          subTitle: 'O produto está sem estoque no momento.',
          buttons: ['Ok']
        });
        // Call alert.
        alert.present();
      return
    }
    // Show details of product.
    this.navCtrl.push(ProductDetailPage, product);
  }

  /**
   * Call basket page.
   */
  public goToCart(): void {
    this.navCtrl.push(BasketPage);
  }
}
