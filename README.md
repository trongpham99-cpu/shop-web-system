# How to run

### 1. Server ExpressJS

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

CLOUNDINARY_CLOUD_NAME=your cloud name
CLOUNDINARY_API_KEY=your api key
CLOUNDINARY_API_SECRET=your api secret

SECRET_KEY=my-secret-key
```

install dependencies:
```
npm install
```

run server:
```
npm run dev
```

### 2. Client User Angular

install dependencies:
```
npm install
```

run server:
```
ng serve
```

### 3. Client Admin Angular

install dependencies:
```
npm install
```

run server:
```
ng serve --port 4201
```


