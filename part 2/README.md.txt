Front-end:
	1. Update Client IP/Port address in package.json=> scripts=>start
	2. Update Server IP/Port address in ./src/config/serverConfig
	3. npm install
	4. npm run build2
	5. npm run start2

Backend:
	1. Update gmailCred.js in ./util/gmailCred.js
	2. Update user, password of dbConf.js in ./util/dbConf.js (shared separately)
	2. npm install
	3. npm start