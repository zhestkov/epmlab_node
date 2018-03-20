const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = {
  id: {type: String, default: -1 },
  name: {type: String, default: 'empty' },
  username: {type: String, default: 'empty' },
  email: {type: String, default: 'empty' },
  address: {
    street: {type: String, default: 'empty' },
    suite: {type: String, default: 'empty' },
    city: {type: String, default: 'empty' },
    zipcode: {type: String, default: 'empty' },
    geo: {
      lat: {type: String, default: 'empty' },
      lng: {type: String, default: 'empty' }
    }
  },
  phone: {type: String, default: 'empty' },
  website: {type: String, default: 'empty' },
  company: {
    name: {type: String, default: 'empty' },
    catchPhrase: {type: String, default: 'empty' },
    bs: {type: String, default: 'empty' }
  }
}

const UserSchema = new Schema(user);

UserSchema.static('findUserById', function(userId, cb){
  return this.find({ id: userId }, cb);
});
UserSchema.static('findUserByName', function(userName, cb) {
  return this.find({ name: userName}, cb);
})
module.exports = mongoose.model('User', UserSchema);
