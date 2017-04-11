# Accessing ReQL  
## r.connect()  
#### Command syntax
```
r.connect([options, ]callback)
r.connect([host, ]callback)
r.connect([options]) → promise
r.connect([host]) → promise
```   
#### Description  
Create a new connection to the database server. Accepts the following options:
- `host`: the host to connect to (default `localhost`).
- `port`: the port to connect on (default `28015`).
- `db`: the default database (default `test`).
- `user`: the user account to connect as (default `admin`).
- `password`: the password for the user account to connect as (default `''`, empty).
- `timeout`: timeout period in seconds for the connection to be opened (default `20`).
- `ssl`: a hash of options to support SSL connections (default `null`). Currently, there is only one option available, and if the `ssl` option is specified, this key is required:
    - `ca`: a list of Node.js `Buffer` objects containing SSL CA certificates.  

If the connection cannot be established, a `ReqlDriverError` will be passed to the callback instead of a connection.  
The returned connection object will have two properties on it containing the connection’s port and address:  
```
conn.clientPort;
conn.clientAddress;
```

<md-expansion-panel>
  <md-expansion-panel-collapsed>
    <md-expansion-panel-icon></md-expansion-panel-icon>
    <div class="md-title">Notes</div>
    <div class="md-summary">Open to read more</div>
  </md-expansion-panel-collapsed>
  <md-expansion-panel-expanded>
    <md-expansion-panel-header>
        <md-expansion-panel-icon></md-expansion-panel-icon>
        <div class="md-title">Notes</div>
        <div class="md-summary">Close to read less</div>
    </md-expansion-panel-header>
    <md-expansion-panel-content>
      <h4>Notes:</h4>
      <p>Using SSL with RethinkDB requires proxy software on the server, such as Nginx, HAProxy or an SSL tunnel. RethinkDB will encrypt traffic and verify the CA certification to prevent man-in-the-middle attacks. Consult your proxy’s documentation for more details.
         Alternatively, you may use RethinkDB’s built-in TLS support.</p>
    </md-expansion-panel-content>
    <md-expansion-panel-footer>
      <div flex></div>
      <md-button class="md-warn" ng-click="$panel.collapse()">Collapse</md-button>
    </md-expansion-panel-footer>
  </md-expansion-panel-expanded>
</md-expansion-panel>

**Example:** Open a connection using the default host and port, specifying the default database.  
```javascript
r.connect({
    db: 'marvel'
}, function(err, conn) {
    // ...
});
```  
If no callback is provided, a promise will be returned.  
```javascript
const promise = r.connect({db: 'marvel'});
```  
**Example:** Open a new connection to the database.
```javascript
r.connect({
    host: 'localhost',
    port: 28015,
    db: 'marvel'
}, function(err, conn) {
    // ...
});
```  
Alternatively, you can use promises.  
```javascript
const p = r.connect({
    host: 'localhost',
    port: 28015,
    db: 'marvel'
});
p.then(function(conn) {
    // ...
}).error(function(error) {
    // ...
});
```  
**Example:** Open a new connection to the database, specifying a user/password combination for authentication.  
```javascript
r.connect({
    host: 'localhost',
    port: 28015,
    db: 'marvel',
    user: 'herofinder',
    password: 'metropolis'
}, function(err, conn) {
    // ...
});
```  
**Example:** Open a new connection to the database using an SSL proxy.  
```javascript
const fs = require('fs');
fs.readFile('/path/to/cert', function (err, caCert) {
    if (!err) {
        r.connect({
            host: 'localhost',
            port: 28015,
            db: 'marvel',
            authKey: 'hunter2',
            ssl: {
                ca: caCert
            }
        }, function(err, conn) {
            // ...
        });
    } else {
        console.log(err);
    }
});
```