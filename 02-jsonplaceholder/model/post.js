const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = {
  userId: {type: Number, default: -1},
  id: {type: Number, default: -1},
  title: {type: String, default: 'empty'},
  body: {type: String, default: 'empty' }
}

const PostSchema = new Schema(post);

PostSchema.static('findPostById', function(commentId, cb) {
  return this.find({ id: commentId }, cb);
});
PostSchema.static('findPostByUserId', function(userId, cb) {
  return this.find({ userId }, cb);
});
module.exports = mongoose.model('Post', PostSchema);
