import { DeliverySelectPage } from './../delivery-select/delivery-select';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { HttpService } from './../../providers/http/http.service';
import { BasketService } from './../../providers/basket/basket.service';
import { StorageService } from './../../providers/storage/storage.service';

import { IBasket } from './../../delegate/ibasket';

import { Address } from './../../model/base/address.model';
import { BasketItem } from './../../model/base/basket-item.model';

/**
 * Generated class for the BasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage implements IBasket {
  
  reloadTaxeDelivery(id: number) {
    this._getDelivery(id);
  }

  public basketItems: BasketItem[] = [];
  public addressDelivery: Address = new Address();
  public messageOrValue: string = '';
  public subtotal: string = '';
  public total: string = '';
  private _taxe: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _basketDao: BasketService,
    private _httpService: HttpService,
    private _storage: StorageService,
    private _modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    // Check if there is any product in the basket.
    this._basketDao
      .getAll()
      .then(data => {
        if (data.length < 1) {
          // If the cart is empty, it will display a message that will redirect you to the product listing.
          this._callNoItemsAlert();
          return
        }

        // Receives the item from the basket.
        this.basketItems = data;
        this._updateDisplaySubtotal();
        this._updateDisplayTotal();

        this._getDelivery();
    });
  }

  /**
   * Method for remove item by id
   * @param id 
   */
  public removeItem(index: number, id: number): void {
    this._basketDao
      .destroyById(id)
      .then(data => {
        // Remove item on display array
        this.basketItems.splice(index, 1);
        this._updateDisplaySubtotal();
        this._updateDisplayTotal();
        console.log('Item removido', data);
        this.subtotal = `${this._calculateSubTotal()}`;
        // If array length = 0, call no tiems alert.
        if (this.basketItems.length === 0) {
          this._callNoItemsAlert();
        }
      });
  }

  /**
   * Method for increment unite of product
   * @param index 
   * @param id 
   */
  public addQuantity(index: number, id: number): void {
    // Get object in array
    let item = this.basketItems[index];
    // Increment
    item.quantidade += 1;
    // Update on database
    this._basketDao
      .updateQuantity(id, item.quantidade)
      .then(data => {
        console.log('item alterado.', data);
        this._updateDisplaySubtotal();
        this._updateDisplayTotal();
    });
  }

  /**
   * Method for decrement unite of product
   * @param index 
   * @param id 
   */
  public removeQuantity(index: number, id: number): void {
    // Get object in array
    let item = this.basketItems[index];
    // If quantity <= 1 updade object
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this._basketDao
        .updateQuantity(id, item.quantidade)
        .then(data => {
          console.log('item alterado.', data);
          this._updateDisplaySubtotal();
          this._updateDisplayTotal();
      });
    }
  }

  /**
   * Method that displays an alert stating that the basket is empty.
   */
  private _callNoItemsAlert(): void {
    let alert = this._alertCtrl.create({
      title: 'Sua cesta está vazia',
      message: 'Adicione itens a sua cesta!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // Back to product listing
            this.navCtrl.pop();
          }
        }
      ]
    });

    // Show alert.
    alert.present();
  }

  /**
   * Method calculates the subtotal
   */
  private _calculateSubTotal(): number {
    let subtotal: number = 0;
    this.basketItems.forEach((item) => {
      subtotal += (item.quantidade * item.unitario);
    });
    return subtotal;
  }

  /**
   * Method calculates the total
   */
  private _calculateTotal(): number {
    return this._taxe + this._calculateSubTotal();
  }

  /**
   * Method capture address delivery
   * @param address
   */
  private _getDelivery(address: number = 0): void {
    let loader = this._loadingCtrl.create({
      content: 'Calculando taxa de entrega.'
    });
    loader.present();

    // Get taxe delivery request
    this._httpService
      .get(`/delivery?cnpj=${this._storage.getStoreCNPJ()}&prolinsId=${this._storage.getProlinsId()}&addressId=${address}`)
      .subscribe(data => {
        loader.dismiss();
        // Get object
        let response = data.json();
        // Casting to Address object
        this.addressDelivery = response.endereco as Address;
        if (response.message) {
          this.messageOrValue = 'Indisponível';
          this._taxe = 0;
          //alert
          let alert = this._alertCtrl
            .create({
              title: response.message,
              message: 'Selecione outro endereço para entrega!',
              buttons: ['Ok']
            });
            alert.present();
        } else {
          this._taxe = response.valor;
          this.messageOrValue = response.valor;
        }

        this._updateDisplayTotal();
      })
  }

  /**
   * Method for show display subtotal value
   */
  private _updateDisplaySubtotal(): void {
    this.subtotal = `${this._calculateSubTotal()}`;
  }

  /**
   * Method for show display total value
   */
  private _updateDisplayTotal(): void {
    this.total = `${this._calculateTotal()}`;
  }

  public selectOtherAddress(): void {
    this._modalCtrl.create(DeliverySelectPage, this)
      .present();
  }
}
