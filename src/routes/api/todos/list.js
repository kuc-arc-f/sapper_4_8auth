import axios from 'axios'
const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import Const from "../../../../app_config"
//
export async function get(req, res) {
  try{
    var dbFile = Const.get_config().DB_FILE_NAME
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const items = await db.all(`
      select * from todos where complete=0 order by id desc
    `);
//console.log(items)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(items));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}