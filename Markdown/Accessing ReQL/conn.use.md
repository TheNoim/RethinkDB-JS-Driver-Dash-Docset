# Accessing ReQL  
## conn.use()  
#### Command syntax
```
conn.use(dbName)
```
#### Description  
Change the default database on this connection.  

**Example:** Change the default database so that we don’t need to specify the database when referencing a table.  
```javascript
conn.use('marvel')
r.table('heroes').run(conn, ...) // refers to r.db('marvel').table('heroes')
```