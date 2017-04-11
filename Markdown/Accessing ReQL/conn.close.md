# Accessing ReQL  
## conn.close()  
#### Command syntax
```
conn.close([{noreplyWait: true}, ]callback)
conn.close([{noreplyWait: true}]) → promise
```
#### Description  
Close an open connection. If no callback is provided, a promise will be returned.  

Closing a connection normally waits until all outstanding requests have finished and then frees any open resources associated with the connection. By passing `false` to the `noreply_wait` optional argument, the connection will be closed immediately, possibly aborting any outstanding noreply writes.  

A noreply query is executed by passing the `noreply` option to the [run](#!/section/query.run) command, indicating that `run()` should not wait for the query to complete before returning. You may also explicitly wait for a noreply query to complete by using the [noreplyWait](#!/section/conn.noreplywait) command.  

**Example:** Close an open connection, waiting for noreply writes to finish.  
```javascript
conn.close(function(err) { 
    if (err) throw err; 
});
```  
Alternatively, you can use promises.  
```javascript
p = conn.close();
p.then(function() {
    // `conn` is now closed
}).error(function(err) {
    // process the error
});
```

**Example:** Close an open connection immediately.
```javascript
conn.close({noreplyWait: false}, function(err) { 
    if (err) throw err; 
});
```  
Alternatively, you can use promises.  
```javascript
conn.close({noreplyWait: false}).then(function() {
    // conn is now closed
}).error(function(err) { 
    // process the error
});
```