const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = {
  id: { type: String, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
}
const AdminSchema = new Schema(schema);

module.exports = mongoose.model('Admin', AdminSchema);
