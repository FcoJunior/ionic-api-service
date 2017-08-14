import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";

/*
  Generated class for the SqliteHelperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SqliteHelperService {

  private db: SQLiteObject;

  constructor(
    public plateform: Platform,
    public sqlite: SQLite
  ) { }

  private createDataBase(): Promise<SQLiteObject> {
    return this.plateform.ready()
      .then((readySource: string) => {
        return this.sqlite.create({
          name: 'basket.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.db = db;

          this.db
            .executeSql(`CREATE TABLE IF NOT EXISTS basket (
              id INTEGER PRIMARY KEY,
              quantidade INTEGER NOT NULL,
              unitario REAL NOT NULL,
              nome TEXT NOT NULL,
              descricao TEXT
            )`, {})
            .then(success => {
              console.log('Table created successfull!', success);
            }).catch(error => {
              console.log('Error creating table!', error);
            });

          return this.db;
        }).catch(error => {
          throw new TypeError(error.message);
        });
    });
  }

  public getContext(): Promise<SQLiteObject> {
    return (this.db) ? Promise.resolve(this.db) : this.createDataBase();
  }

}
