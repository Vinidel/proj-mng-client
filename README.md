# proj-mng-client
SPA Client for proj-mng

## Instrunctions
 - `npm install`
 - `npm start` 
 ```
 It will run on its own server on http://localhost:3000
 If the server has been started correctly then two users can be used to login into the app
 ```

## Login 
```
  Admin 
  user: vini@admin.com
  password: fakepassword
```

```
  Project Manager 
  user: vini@pm.com
  password: fakepassword
```

## Dependencies
 - NodeJs
 - proj-mgn server needs to be up and running

## Start the App
 - `npm start` will run on its own server



## Things that need to be improved/done
 - Encrypt password before sending it
 - Error handling
 - Required fields handling
 - Side effects when Deleted (remove data from form and refresh)
 - Side effects when Edit (remove data from)
 - Better UI, current one is pretty crappy
 - No unit tests

 ## Bug found
 - Dropdown might have a weird behaviour if user is null for the previously selected project