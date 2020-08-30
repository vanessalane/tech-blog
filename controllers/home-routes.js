const { Post, User } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/post/:id', (req, res) => {
    res.render('post');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
});

module.exports = router;