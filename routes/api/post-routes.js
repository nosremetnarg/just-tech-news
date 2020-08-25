const router = require('express').Router();
const { Post, User } = require('../../models'); // these create the express endpoints
// we want to pull information from Post as well as User

// get all users
router.get('/', (req, res) => {
    console.log('===============');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [ // this makes a JOIN 
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData)) // return the promise
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id // sets the value of the id with req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => { // return the promise
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' }); // 404 is user error
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a post route
router.post('/', (req, res) => {
    // expects json info back
    Post.create({

        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id

    })
        .then(dbPostData => res.json(dbPostData)) // return the promise

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//create put route
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title // finding the post with req.body.title and replace the title of the post
        },
        {
            where: {
                id: req.params.id // matching the id
            }
        }
    )
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router; // this exposes the changes/code to the express server. Keep this at the bottom of the file