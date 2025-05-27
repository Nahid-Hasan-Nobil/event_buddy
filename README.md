
# 🧠 Event Buddy — NestJS Event Booking System

An advanced **NestJS** backend application for managing events and bookings with secure authentication, PostgreSQL database relations, and comprehensive API documentation using Swagger.


---

## Project Description

This project is a RESTful API for an event booking system. It allows:

* **Users** to register, login, and book seats for events (up to 4 seats per booking).
* **Admins** to create, update, delete events, and manage users/admins.
* Role-based access control enforced by JWT authentication.
* Data validation with `class-validator` on all endpoints.
* PostgreSQL database for persistent data storage with relational mapping.
* Swagger API documentation for easy endpoint exploration and testing.

---

## Features

* User registration and login with JWT-based authentication
* Admin registration, login, and admin management
* Event CRUD operations (Create, Read, Update, Delete) by admins
* Booking events by users with seat limits
* Role-based guards to protect sensitive routes
* Automatic API documentation via Swagger UI
* Input validation with detailed error messages
* Modular, maintainable, and scalable NestJS architecture

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/event-booking-system.git
   cd event-booking-system
   ```

2. **Install dependencies**

   ```bash
   npm install
  
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add:

   ```env
   PORT=3001
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up PostgreSQL database**

   * Create the database with the name from `DATABASE_NAME`.
   * Ensure the user has proper permissions.
   * Database tables and relations will be created automatically on app startup if sync is enabled in TypeORM configuration.

5. **Run the application**

   ```bash
   npm run start:dev
   ```

6. **Access Swagger API documentation**

   Open your browser and navigate to:

   ```
   http://localhost:3001/api
   ```

   Explore and test the API endpoints interactively.


---

## API Endpoints Summary

| Method | Endpoint            | Description                          | Access      |
| ------ | ------------------- | ------------------------------------ | ----------- |
| POST   | `/user/register`    | Register new user                    | Public      |
| POST   | `/user/login`       | Login user                           | Public      |
| DELETE | `/user/:id`         | Delete user                          | User (self) |
| POST   | `/admin/register`   | Register new admin                   | Public      |
| POST   | `/admin/login`      | Login admin                          | Public      |
| DELETE | `/admin/:id`        | Delete admin                         | Admin only  |
| POST   | `/event`            | Create event                         | Admin only  |
| PUT    | `/event/:id`        | Update event                         | Admin only  |
| DELETE | `/event/:id`        | Delete event                         | Admin only  |
| GET    | `/event`            | List all events                      | Admin only  |
| GET    | `/event/upcoming`   | List upcoming events                 | Public      |
| GET    | `/event/past`       | List past events                     | Public      |
| GET    | `/event/:eventName` | Get event details by name            | Public      |
| POST   | `/booking`          | Book seats for an event              | User only   |
| GET    | `/booking`          | List bookings for authenticated user | User only   |

---

## Environment Variables

| Variable            | Description                       | Example                  |
| ------------------- | --------------------------------- | ------------------------ |
| `PORT`              | Server port                       | 3001                     |
| `DATABASE_HOST`     | PostgreSQL host                   | localhost                |
| `DATABASE_PORT`     | PostgreSQL port                   | 5432                     |
| `DATABASE_USER`     | PostgreSQL user                   | postgres                 |
| `DATABASE_PASSWORD` | PostgreSQL password               | secret\_password         |
| `DATABASE_NAME`     | PostgreSQL database name          | event\_booking\_db       |
| `JWT_SECRET`        | Secret key for signing JWT tokens | your\_super\_secret\_key |

---

## Folder Structure

```
src/
 ├── admin/             # Admin module (controller, service, DTOs)
 ├── auth/              # Authentication & authorization (guards, strategies)
 ├── booking/           # Booking module (controller, service, DTOs)
 ├── event/             # Event module (controller, service, DTOs)
 ├── user/              # User module (controller, service, DTOs)
 ├── common/            # Shared utilities and decorators
 ├── main.ts            # Application entry point (Swagger setup here)
 ├── app.module.ts      # Root application module
```

---

## Additional Notes

* **Validation:** All incoming requests are validated using `class-validator`. Errors are descriptive.
* **Security:** JWT tokens are mandatory for protected routes. Role guards ensure proper authorization.
* **Swagger:** API docs are dynamically generated based on decorators on DTOs and controllers.
* **Database:** TypeORM manages PostgreSQL connection and schema synchronization.

---

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

---


# 🛠 PostgreSQL Setup & Database Export Guide (Event Buddy Project)

This project uses **PostgreSQL** as the database with **TypeORM** for ORM and schema management. Below is how I set up and handled the database configuration and export for this project.

---

## ✅ PostgreSQL Setup

Follow these steps to set up the PostgreSQL database used in this project:

### 1. Install PostgreSQL

Download and install PostgreSQL from the official site:
👉 [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

### 2. Create the Database

After installation, log in to PostgreSQL and create a new database named `event_buddy`:

```sql
CREATE DATABASE event_buddy;
```

### 3. Environment Configuration

I used environment variables to configure the database connection. Create a `.env` file in the project root (or use the `.env.example` provided) and set the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=event_buddy
```

> ⚠️ Make sure to replace `your_postgres_username` and `your_postgres_password` with your actual PostgreSQL credentials.

### 4. TypeORM Configuration

The database is automatically synchronized with entity definitions via TypeORM:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
});
```

> 🚨 Note: `synchronize: true` is used only for development to auto-create tables based on entities.

---

## 🧩 Entity Relations Example

I have used TypeORM decorators to define relationships. Here’s a quick example:

```ts
// Event Entity
@OneToMany(() => Booking, booking => booking.event)
bookings: Booking[];
```

```ts
// Booking Entity
@ManyToOne(() => Event, event => event.bookings)
event: Event;
```

---

## 📁 Project Structure

The exported files are included under the `db/` directory:

```bash
📁 event-buddy/
├── 📁 db/
│   ├── schema.sql        # DB schema export
│   └── data.sql          # (Optional) Sample data export
```

---


## License








<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
