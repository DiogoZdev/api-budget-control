# API Budget Control

> Project made with NodeJS, Express, PrismaORM and MySQL. This API will control the data flow of a monthly budget.

## Adjustments

The project is under development and it will be improved in future taks:

- [x] Basic CRUD operations
- [x] PrismaORM Connection
- [ ] More detailed filters?

## 💻 Requirements

Before starting you must have installed:
* Node
* Docker Compose

## ☕ Using the project

To setup local database:
```
$ docker-compose up -d
```

To configure local database according to the Prisma Schema:
```
$ npx prisma migrate dev
```

To execute the API:
```
$ npm run start
```

To check data saved:
```
$ npx prisma studio
```

## 😄 Contribute

As the project is under development, any feedback and suggestion is highly appreciated. Thank you!
