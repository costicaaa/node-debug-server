# Node server listening for debug variables
Accepts json requests of debug information and serves an UI for filtering
PHP requests wrapper : https://github.com/costicaaa/p-debug-dumper

# requests format 


# install
```
git clone git@github.com:costicaaa/node-debug-server.git
npm install
```

# Config

```
 --port=PORT ( default 6006 ) 
 --no-ui ( serves ui by default, add this to only show logs in console ) 
```

# Usage 

```
node index.js 
```

# Options override
```
node index.js --port=6700 --no-ui
```
