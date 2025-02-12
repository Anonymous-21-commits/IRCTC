
# Project Title

Railway Management API
This API allows users to register, log in, book train tickets, and check seat availability. It also enables admin users to manage train data with protection via an API key for administrative endpoints.


## Table of Contents
- User Management

- Train Management (Admin Only)

- Booking Management

- Authorization & Authentication
## API Reference

####  Registers a new user.

```http
  POST /signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |


#### Logs in a user and returns an authorization token.

```http
  POST /signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. User's email address |
| `password`      | `string` | **Required**. User's password |

#### Adds a new train (Admin only).


```http
    POST /train
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.  Name of the train |
| `source`      | `string` | **Required**. Departure station |
| `destination`      | `string` | **Required**. Arrival station |

#### Fetches all available trains between a source and destination.


```http
      GET /trains/available-seats

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `source`      | `string` | **Required**.   The departure station 
| `destination`      | `string` | **Required**. The Arrival station |






#### Books a seat for a user on a particular train.




```http
      POST /bookings

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `integer` | **Required**.  User's unique ID |
| `trainId`      | `integer` | **Required**. Train's unique ID |
| `seats`      | `integer` | **Required**. Number of seats to book

 
#### Retrieves booking details by user ID and booking ID.


```http
      GET /trains/available-seats

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `integer` | **Required**.   User's unique ID
| `bookingId`      | `integer` | **Required**. Booking's unique ID 



## Authentication & Middleware

##  JWT Authentication
- JSON Web Token (JWT) is used to authenticate users. 
- After a successful login (/signin), a JWT token is returned, which should be included in the Authorization header of subsequent requests to protected routes.
```javascript
createToken(user) {
    try {
        const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
        return result;
    } catch (error) {
        console.log("Something went wrong in token creation");
        throw error;
    }
}
```

## bcrypt for Password Hashing
- bcrypt is used to securely hash and compare passwords. 
- When users sign up, their password is hashed before being stored in the database.

## Middleware for Authentication and Authorization
## validateUserAuth Middleware:
 - This middleware validates that the email and password are provided in the request body during signup and signin.
## isAuthenticated Middleware:
- Before accessing protected routes like booking (/bookings), this middleware checks if the user has a valid JWT token.
- It uses the verifyToken() method to ensure the token is valid, and it retrieves the user’s ID from the token.

```javascript

async isAuthenticated(token) {
    try {
        const response = this.verifyToken(token);
        if (!response) {
            throw { error: 'Invalid token' };
        }
        const user = await this.userRepository.getById(response.id);
        if (!user) {
            throw { error: 'No user with the corresponding token exists' };
        }
        return user.id;
    } catch (error) {
        console.log("Something went wrong in the auth process");
        throw error;
    }
}

```

## Admin Protection
- Admin routes, such as creating, updating, and deleting trains, are protected using an API key. 
- Only requests with a valid API key can access these routes.

```javascript
AuthRequestValidators.validateAdminApiKey
```