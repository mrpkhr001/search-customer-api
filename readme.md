#A MEAN STACK Customer Search API

##### Packages used
   * express : Server
   * express-session : Managing user sessions
   * express-validator :  middleware that wraps validator.js validator and sanitizer functions
   * validator : common validations, used for email
   * body-parser : Parse the request body 
   * cookie-parser : cookie support
   * connect-flash : For flash messages
   * dotenv : initialising environment variables 
   * mongoose : Mongodb
   * connect-mongo : Mongodb connection
   * mongoose-mongodb-errors : plugin to transform mongodb like errors (E.G. "11000 - duplicate key") into Mongoose ValidationError instances
   * passport : Used for authentication
   * passport-local : For local strategy
   * passport-local-mongoose : a Mongoose plugin that simplifies building username and password login with Passport
   
##### Dev Packages
   * nodemon : Watch and Restart the application on file changes in DEV environment
   * concurrently : Run multiple process concurrently
   * supertest : Testing APIs 

#### About Application
This application searches customer names with a given search term

#### API details
   * /                            : `GET`  Default landing page   
   * /search?searchTerm=<keyword> : `GET`  `Secured` Search of customer names with given keyword
   * /add                         : `POST`  `Secured` Adding new customer names, {name}
   * /register                    : `POST` User can sign up using {name, email, password} 
   * /login                       : `POST` Log into application {email, password}                          
   * /logout                      : `GET` Logout from application    

 