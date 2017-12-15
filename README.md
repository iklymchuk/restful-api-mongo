## Restful api mongo

**Project upload**

``
git clone git@github.com:iklymchuk/restful-api-mongo.git
``

``
cd restful-api-mongo
``

``
npm install
``

**Mongo configuration**

*Creating new user - mongo shell*

``
db.createUser(
   {
     user: "admin",
     pwd: "admin",
     roles: []
   }
)
``

**Start app**

``
SET NODE_ENV=dev && node server.js
``

**Testing app**

``
curl -d "username=testUser&password=testPassword" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8085/user
``
