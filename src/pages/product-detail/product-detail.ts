import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BasketService } from './../../providers/basket/basket.service';

import { Product } from './../../model/base/product.model';
import { BasketItem } from './../../model/base/basket-item.model';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product: Product = new Product();
  public quantity: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _basketDao: BasketService
  ) { }

  ionViewDidLoad() {
    // Capture params
    this.product = this.navParams.data
  }

  /**
   * Method for add products in basket.
   */
  public addToCart(): void {
    // Create a object BasketItem for add to cart.
    let item = this._createBasketItem(this.product);

    this._basketDao.getItemById(this.product.id)
      .then((data: BasketItem) => {
        // Check if item exists in database
        console.log(data);
        if (!data) {
          // create item on database
          this._insertbasketItem(item);
          return
        }

        // update
        this._alterQuantityBasketItem(data);
      });
  }

  /**
   * Method for increment products to cart.
   */
  public increaseQuantity(): void {
    // Check quantity of product in stock.
    if (this.quantity < this.product.quantidade) {
      this.quantity += 1;
    }
  }

  /**
   * Method for decrement products on cart.
   */
  public reduceQuantity(): void {
    // Check if quantity is minor than 1.
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  /**
   * Method for generate a instance BasketItem.
   * @param product 
   */
  private _createBasketItem(product: Product): BasketItem {
    let item = new BasketItem();
    item.id = product.id;
    item.descricao = product.descricaoProdApp;
    item.nome = product.nome;
    item.quantidade = this.quantity;
    item.unitario = product.precoUnitario;

    return item;
  }

  /**
   * Method for insert item in database
   * @param item 
   */
  private _insertbasketItem(item: BasketItem): void {
    // Call instance BasketService to insert product in SQLite.
    this._basketDao.create(item)
      .then(data => {
        // show alert successful
        this._showAlertProductAdd(data.nome);
      }).catch((error: Error) => {
        console.log('erro aou fazer insert', error.message);
      });
  }

  /**
   * Method for update quantity product in database
   * @param item 
   */
  private _alterQuantityBasketItem(item: BasketItem): void {
    this._basketDao
      // Update quantity
      .updateQuantity(item.id, item.quantidade + this.quantity)
      .then(data => {
        // Call alert successful
        this._showAlertProductAdd(data.nome);
      }).catch((error: Error) => {
        console.log('erro aou fazer update', error.message);
      })
  }

  /**
   * Show a successful alert.
   * @param productName 
   */
  private _showAlertProductAdd(productName: string): void {
    // Create a message for success.
    let alert = this._alertCtrl.create({
      title: 'Produto adicionado a cesta!',
      subTitle: `O produto ${productName} foi adicionado a sua cesta!`,
      buttons: [{
        text: 'Ok',
        handler: () => {
          // Return to products listing to press 'Ok' button.
          this.navCtrl.pop();
        }
      }]
    });
    // Call alert.
    alert.present();
  }

}
