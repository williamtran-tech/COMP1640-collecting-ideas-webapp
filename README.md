# GRE Collecting Ideas System

This repository is using Nodejs, ExpressJs, React and Mysql to make a project:

- Communicate between client and server via API calling.
- Basic knowledge to structure file and code
- Testing the functions that will be required in Collecting Ideas project

## How to execute project in your local:

1. Create a database, named ["gre_ideas_db"] by default of my project. Or if you change the name, make sure you have config the name of the database in the config file (stored in server/config/default).

2. install packets/lib require for each client and server folder. Because the node_modules files is heavy and time consuming in pushing the code to remote.
   Command in the Terminal like this:

```
cd server
npm install
cd ..
cd client
npm install
```

3. After that, install dependencies list in the /server/package.json
   > "body-parser": "^1.20.1",
   > "express": "^4.18.2",
   > "mysql2": "^3.1.2"
   > "nodemon":

Sample:

```
npm install mysql2
npm install --save-dev nodemon
```

4. Next, install dependencies in /client

   >

5. Create tables, named in the ["gre_ideas_db"] like the query in the folder /server/db/create_table.sql

6. Dummy data by execute the query in the file /server/db/dummie_data.sql

## References/Guideline of this Project

Uploading the project to Github, ref: https://dev.to/birdy/mern-stack-project-setup-to-push-to-github-4l5e

### Some errors when implementing code:

1. Lack of dependencies
2. Forget to delete "git init" in react app folder, when initializing it
3. Not connect to the api, especially setup "proxy" to fetch data from api in /client
4. Not config the file to match with local machine
5. Unable to resolve dependencies.

![image](https://user-images.githubusercontent.com/81273649/218241034-3344fd29-bea1-4e02-aae1-2fdf069b86f4.png)
   Ref: https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages 
