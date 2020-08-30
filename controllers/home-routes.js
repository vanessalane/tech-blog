const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/post/:id', (req, res) => {
    res.render('post');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;