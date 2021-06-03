# sapper_4_8auth

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/06/02 

 update  :

***
## License
Licence : MIT License

***
### Summary

Sapper + svelte , sqlite authorize / CRUD

***
### Setup

* npm install

***
app_config.js

* if change db file , DB_FILE_NAME change 
```
DB_FILE_NAME: "./db1.sqlite",
```

* users table:
```
CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email TEXT,
  password TEXT,
  up_date TIMESTAMP
);
```
***
### Start server
* start :

yarn dev

***
### Related:

***

