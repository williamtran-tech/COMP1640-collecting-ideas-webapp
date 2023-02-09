# Nodejs_React_MySQL_Testing

This repository is using Nodejs, ExpressJs, React and Mysql to make a project:

- Communicate between client and server via API calling.
- Basic knowledge to structure file and code
- Testing the functions that will be required in other projects

## How to execute project in your local:

1. Create a database, named "nodejs_mysql" by default of my project. Or if you change the name, make sure you have config the name of the database in the config file (stored in server/config/default).

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

4. Create table, named "tasks" in the database nodejs_mysql like the query below:

```
CREATE TABLE tasks (
 id int(11) NOT NULL,
 task varchar(200) NOT NULL,
 status tinyint(1) NOT NULL DEFAULT '1',
 created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table tasks
--

INSERT INTO tasks (id, task, status, created_at) VALUES
(1, 'Find bugs', 1, '2019-04-10 23:50:40'),
(2, 'Review code', 1, '2019-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2019-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2019-04-10 23:50:40'),
(5, 'Push to prod', 1, '2019-04-10 23:50:50');
```

## References/Guideline of this Project

Uploading the project to Github, ref: https://dev.to/birdy/mern-stack-project-setup-to-push-to-github-4l5e
