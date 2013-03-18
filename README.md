Simple passthru server for mongo

## Usage:
```
MONGO_DB=mydb PORT=8080 node server
```
then go to:  
```
http://localhost:8080/mydb/mycollection?json=[{query}, {options}]
```

Specify the database and collection in the url, and pass the query and option
objects as json. The server will interpret them and pass them to the find
function.

