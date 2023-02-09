# Nodejs_React_MySQL2

This repository is using Nodejs, ExpressJs, React and Mysql to make a project:

- Communicate between client and server via API calling.
- Basic knowledge to structure file and code
- Testing the functions that will be required in Collecting Ideas project

## How to execute project in your local:

1. Create a database, named ["FillLater"] by default of my project. Or if you change the name, make sure you have config the name of the database in the config file (stored in server/config/default).

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

4. Create table, named ["FillLater"] in the database nodejs_mysql like the query below:

```
CREATE TABLE tasks (
```

## References/Guideline of this Project

Uploading the project to Github, ref: https://dev.to/birdy/mern-stack-project-setup-to-push-to-github-4l5e
