# proj-mng-client
SPA Client for proj-mng

## Dependencies
 - NodeJs
 - proj-mgn server needs to be up and running

## Start the App
 - `npm start` will run on its own server

## Login 
- Admin 
```
  user: vini@admin.com
  password: fakepassword
```

- Project Manager 
```
  user: vini@pm.com
  password: fakepassword
```

## Things that need to be improved/done
 - Encrypt password before sending it
 - Error handling
 - Required fields handling
 - Logout
 - Side effects when Deleted (remove data from form and refresh)
 - Side effects when Edit (remove data from)
 - Better UI, current one is pretty crappy

 ## Bug found
 - Dropdown might have a weird behaviour if user is null for the previously selected project