This is a development app that uses Node.JS, Express, MongoDB, Passport, and EJS.

The login and authentication has 3 roles (admin, doctor and client). The admin and Client are set up. the doctor role will be set up in the future. They are using passport.JS and BCRYPT for authentication.

I have half set up a document upload page. The front end will be the docadd.ejs. The route will be found in user.route. I have a schema in documents.model.js. You can incorporate it into the mai schema if that is easier. The functionality should be that from the index page, the user clicks on the "add document" link that will take them to the add document page (docuadd.ejs). They will then post thier document with title and system and the document information will show up on the index page. The user will have the ability to delete the document. the user will also have the ability to filter documents by system (vitals, neuro, skin, etc.). filter buttons will be added to the index page.

Goals:

1. Add document posts to user.route. I would also like the document images (jpg, png, pdf) to be stored in the database rather than stored locally.
2. Add document list onto main index page (index.ejs) with ability to delete document
3. Filter buttons to filter documents by system
