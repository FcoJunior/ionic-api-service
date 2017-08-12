import { ProductDetailPage } from './../product-detail/product-detail';
import { Product } from './../../model/base/product';
import { StorageProvider } from './../../providers/storage/storage';
import { HttpProvider } from './../../providers/http/http';
import { Store } from './../../model/base/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  public store: Store;
  private _httpService: HttpProvider;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController,
    private storage: StorageProvider,
    private httpService: HttpProvider
    ) {

    this._httpService = httpService;
    this.store = this.navParams.data;

    let loader = loading.create({
      content: 'Buscando produtos'
    });
    loader.present();

    let storeId = storage.getStoreId();
    this._httpService
      .get(`/store/getproducts/${storeId}`, storage.getStoreUrl())
      .subscribe(response => {
        loader.dismiss();
        this.products = response.json() as Product[];
      }, fail => {
        loader.dismiss();
      })
  }

  public showDetails(product: Product) {
    this.navCtrl.push(ProductDetailPage, product);
  }
}
