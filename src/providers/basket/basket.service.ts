import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

import { SqliteHelperService } from './../sqlite-helper/sqlite-helper.service';
import { BasketItem } from './../../model/base/basket-item.model';
import 'rxjs/add/operator/map';

/*
  Generated class for the BasketProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BasketService {
  
  constructor(
    public sqliteHelperService: SqliteHelperService
  ) { }

  public getAll(): Promise<BasketItem[]> {
    return this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        return <Promise<BasketItem[]>>context.executeSql('SELECT * FROM basket', {})
          .then(resultSet => {
            let list: BasketItem[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              list.push(resultSet.rows.item(i));
            }

            return list;
          })
      });
  }

  public create(item: BasketItem): Promise<BasketItem> {
    return this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        return context.executeSql(`INSERT INTO basket (id, quantidade, unitario, nome, descricao) VALUES (?, ?, ?, ?, ?)`, 
          [
            item.id,
            item.quantidade,
            item.unitario,
            item.nome,
            item.descricao
          ])
          .then(resultSet => {
            console.log('insert object');
            return item
          }).catch((error: Error) => {
            console.log('fail to insert!', error.message);
            return item;
          });
      })
  }

  public getItemById(id: number): Promise<BasketItem> {
    return this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        return <Promise<BasketItem>>context.executeSql(`SELECT * FROM basket WHERE id = ${id}`, {})
          .then(data => {
            console.log('Produto pegue por id');
            return data;
          }).catch((error: Error) => {
            console.log(error.message);
          });
      });
  }

  public updateQuantity(id: number, quantity: number): void {
    this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        context.executeSql(`UPDATE basket SET quantidade = ${quantity} WHERE id = ${id}`, {})
          .then(data => {
            console.log('Objeto atualizado');
          }).catch((error: Error) => {
            console.log(error);
          });
      });
  }

  public destroy(): void {
    this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        context.executeSql('DELETE FROM basket', {})
          .then(data => {
            console.log('Dados deletados');
          }).catch((error: Error) => {
            console.log(error.message);
          });
      });
  }

  public destroyById(id: number): void {
    this.sqliteHelperService
      .getContext()
      .then((context: SQLiteObject) => {
        context.executeSql(`DELETE FROM basket WHERE id = ${id}`, {})
          .then(data => {
            console.log('registro removido: ', id);
          }).catch((error: Error) => {
            console.log(error.message);
          });
      });
  }
}
