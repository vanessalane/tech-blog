const express = require('express');
const path = require('path');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

// setup express server
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static((path.join(__dirname, 'public'))));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// setup express-session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// use handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}. Access locally at http://localhost:${PORT}`));
});