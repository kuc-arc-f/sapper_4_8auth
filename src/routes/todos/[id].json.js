const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import Const from "../../../app_config"
//
export async function get(req, res, next) {
  try{
    const { id } = req.params;
//console.log("id=", id)
    var dbFile = Const.get_config().DB_FILE_NAME
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    var sql ="select * from todos where id=" + id
    const items = await db.all(sql);    
    var item = items[0]    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(item));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }   
}
