const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// add a new post
router.get('/add', withAuth, (req, res) => {
    res.render('add-post', { 
        loggedIn: req.session.loggedIn
    });
});

// edit a post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes:  [
        'id',
        'title',
        'body'
    ],
    include: [
      {
          model: User,
          attributes: ['username']
      }
  ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
    }
    // serialize data before passing to template
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', {
        post, 
        loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;