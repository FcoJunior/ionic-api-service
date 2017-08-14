import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BasketService } from './../../providers/basket/basket.service';
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
export class BasketPage {

  public basketItems: BasketItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _basketDao: BasketService
  ) { }

  ionViewDidLoad() {
    this._basketDao
      .getAll()
      .then(data => {
        if (data.length < 1) {
          this.callNoItemsAlert();
          return
        }

        this.basketItems = data;
    });    
  }

  private callNoItemsAlert(): void {
    let alert = this._alertCtrl.create({
      title: 'Sua cesta está vazia',
      message: 'Adicione itens a sua cesta!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}