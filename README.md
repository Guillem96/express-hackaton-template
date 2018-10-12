# Express Hackaton Template

![travis-ci](https://travis-ci.com/Guillem96/express-hackaton-template.svg?branch=master)

Node server which includes:
- CI
- MongoDB
- Users management
- Users sessions management

## Run on local

Install node dependencies

```bash
$ npm install
```

Generate environment variables:

```bash
$ export SECRET_KEY="<your_secret_key_goes_here_can_be_any_value>"
$ export DB_URL="<your_heroku_addon_database_url>"
```

Run server

```bash
$ npm start
```

## Requests

### Register a user

```
METHOD = POST
URL = /users
BODY = {
  "username": <username>,
  "password_1": <password>,
  "password_2": <repeat_password>
}
```

### Login a user

```
METHOD = POST
URL = /users/login
BODY = {
  "username": <username>,
  "password": <password>
}
```

### Delete a user

```
METHOD = DELETE
URL = /users
AUTH = Bearer <token> # Token returned at login response
BODY = {
  "username": <username>,
  "password": <password>
}
```