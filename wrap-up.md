## Questions

### Please provide instructions on how to run your project in a bulleted list below.
* Make sure you have Docker desktop running on your machine
* Pull down this respository locally
* In the root directory you will find a file called `docker-compose.yml`
* In VS code or terminal of your choice navigate to this root directory and run the following commands:
  * `docker volume create db` - This is because of an issue I found with the original compose file. Since db is external this needs to be created first. If you already have this volume in Docker please delete it.
  * Then run `docker-compose up -d`
  * Once the db, service, and ui containers are all running you should be able to go to http://localhost:8080 to view and use the site. The service is exposed on port 3000 and the site on 8080. Do the following if these ports are already in use on your machine. If you need to change the service port you'll need to change it in /service/server.js at the bottom of file, Dockerfile, and the docker-compose in root directory. If you need to change the website port change it in the ui Dockerfile, and the docker-compose in the root directory.

#### Running website and service on your machine if neccessary
* For the Service
  * Navigate to `root/service` and do an `npm install` if you haven't already.
  * Make sure you've alreay created your docker volume called `db` from above.
  * If you haven't yet created and have your db running navigate to `root/service` and call `docker-compose up -d db`.
  * You'll want to shut down your service container so it doesn't conflict.
  * Go to `root/service/config/default.json` and change `database.host` to `localhost` instead of `db`. `db` is used in the docker network, but you'll need `localhost` on your machine.
  * In the terminal navigate to the `root/service` folder and run `npm start`. This will expose service on http://localhost:3000.
  
* For UI  
  * Navigate to `root/ui` and do an `npm install` if you haven't already.
  * You'll want to shut down your ui container so it doesn't conflict.
  * In another terminal navigate to `root/ui` folder and run `npm start`. Site should be exposed on http://localhost:8080.

#### Running service unit tests
* Navigate to `root/service` in your terminal and run `npm run test`

### Were there any pieces of this project that you were not able to complete that you'd like to mention?
* Not that I know of.

### If you were to continue building this out, what would you like to add next?
* Text internationalization.
* Deployments with config file replacements (Including db and service credentials. Make them proper secure credentials.).
* Get with UX dept. for more/better look and feel of the site.
* Service automation testing via Postman or other framework.
* Service load testing.

### If you have any other comments or info you'd like the reviewers to know, please add them below.