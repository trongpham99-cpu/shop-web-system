## Example template for Server ExpressJS

#### How to run ?

create a new environment file:

```
touch .env
```

edit file .env with script below:
```
PORT=3052 

NODE_ENV=dev

DEV_DB_HOST=mongodb://localhost:27017
DEV_DB_NAME=app-shop

PROD_DB_HOST=mongodb://localhost:27017
PROD_DB_NAME=shop-app

CLOUNDINARY_CLOUD_NAME=dblpwxmnh
CLOUNDINARY_API_KEY=132635623228588
CLOUNDINARY_API_SECRET=zKL9yMEaoZfV2fghdY6X6-pxdvo

SECRET_KEY=my-secret-key
```

run for dev:
```
npm run dev
```
run for prod:
```
npm run prod
```

