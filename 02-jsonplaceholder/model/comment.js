const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = {
  postId: {type: String, default: -1 },
  id: {type: String, default: -1 },
  name: {type: String, default: 'empty' },
  email: {type: String, default: 'empty' },
  body: {type: String, default: 'empty' }
}
const CommentSchema = new Schema(comment);

CommentSchema.static('findCommentById', function(commentId, cb) {
  return this.find({ id: commentId }, cb);
})

CommentSchema.static('findCommentByPostId', function(postId, cb){
  return this.find({ postId }, cb);
});

module.exports = mongoose.model('Comment', CommentSchema);
