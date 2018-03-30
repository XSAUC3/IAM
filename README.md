# kiam
Kavalus Identity and Access Management

### Steps to configure and Start the KIAM on your local machine

####   start each step in seperate commandLine window !

1.  **cd to Mongo Bin folder** <br>
    `|==> ./mongod --dbpath path/to/the/db/folder-of-the-project --auth`
2.  **cd to CodeBase/server** <br>
    `|==> npm install` <br>
    `|==> npm start`  
3.  **cd to CodeBase/angular-src** <br>
    `|==> npm install` <br>
    `|==> ng serve`
4.  **open Browser with address http://localhost:4200/** <br>
    default  : `username: admin` , `password:admin123`.
