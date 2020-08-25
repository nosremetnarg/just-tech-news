const User = require('./User');
const Post = require('./Post');

// create associations associates user with posts

User.hasMany(Post, {
    foreignKey: 'user_id'
});

// associates posts with user
// constraint is that a post can belong to one user, not many
// this is a common relationship for backend dev folks
/*
Creating associations in sequelize is done by calling one of the belongsTo / hasOne / hasMany / belongsToMany 
functions on a model (the source), and providing another model as the first argument to the function (the target).
*/

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };

