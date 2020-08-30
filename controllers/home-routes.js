const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {loggedIn: true});
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;