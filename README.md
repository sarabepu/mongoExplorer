# DataBase Explorer

## Authors
Sara Bejarano

## Description
Kinofil is an webapp for people that enjoys watching movies. 
It has the following functionalities:

- Create an account and login
- Filter a movie list on name
- See the description of a movie
- Add the movie to favorite list
- Add the movie to watched list
- Add a review

## Deployment

The user can directly visit the website (hosted in HerokuApp)  [here](https://kinofil.herokuapp.com)

If you want to deploy the project locally folloy this instructions:

 - Install node.js
 - Clone the repository
 - Create enviromental variable named "hostdb" with your Mongo connection URI. Or change variable "host" on file "db/MongoUtils.js" for  your Mongo connection URI
 - Run the command for isntalling the dependencies `npm install`
 -  Run the command `npm start`
 - Go to `localhost:3000`on your browser

 ## Screeenshot

 ![screenshot](https://i.imgur.com/zR9OH3u.png)

 ![screenshot-movies](https://i.imgur.com/Wc9YE2B.png)


![screenshot-movie](https://i.imgur.com/G5DPS77.png)
