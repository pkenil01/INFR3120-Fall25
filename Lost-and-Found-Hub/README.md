Lost & Found Hub is a web application designed to help students quickly report and locate lost or found items on campus. The platform provides a simple interface for submitting item details and browsing all reports, making it easier for students to reconnect with their belongings.

The application is hosted live using the Render Cloud Application Platform:

Features: Submit item reports with Item Name, Description, Category (e.g., Clothing, Electronics), Status (Lost or Found), Location (where the item was lost), and Date (when the item was lost).

Full CRUD functionality:

Create new reports
View/read existing reports
Edit reports
Delete reports
Tech Stack: Node.js, Express.js, MongoDB, Mongoose, EJS, Render

Team: Aaron Fernandez, Kenil Patel, Rabijan Ragupalan

(Aaron)
what I built and why:
- basic lost-and-found web app where users can create and list reports of found/lost items
- navbar, hero logo, and footer styling using bootstrap + custom css
- simple forms for creating reports (name, description, date, category,status, location)

where things are:
- server and app setup: the express app is configured in config/app.js
- routes: most routes are in the routes/ folder (for example routes/report.js handles /reports)
- views: the ejs files (add, edit, and list) are under views/Reports and error.ejs is in views/ for the reports pages
- public assets: css and group logo are in public/Content/
- mongodb connection: config/db.js is where the mongodb connection string is referenced and mongoose connects
- models: models (mongoose schemas) are under server/models or model files referenced from the config (check server files)

notes about code used from lectures and other help (Aaron)
- referenced examples and patterns from lecture 9 and lecture 10 for express routing, middleware, and views. those lecture notes helped me set up routes.
- used bootstrap and font-awesome examples (common docs and lecture snippets) for styling and icons.
- credits and sources (where i learned or copied code)
- lecture 9 and lecture 10: examples for express routes, middleware, and ejs templating
- bootstrap docs and font-awesome examples for styling and icons
- canva for the project logo
- some stack overflow for small code snippets and troubleshooting help
- mongoose docs and mongodb manual for schema and connection examples

auth and route protection notes (where some of the code came from)
- i kept the checks inline in each route(simple if (!req.session.user) res.redirect(/users/login') )
- small snippets and ideas were also referenced from stackoverflow when trying different redirect and check approaches.


how to test quickly (note for our future use)
1. npm install
2. set your mongodb uri in config/db.js or export MONGODB_URI
3. npm start
4. open http://localhost:3000
5. create a report via the form and then visit /reports to see the list
 see the list