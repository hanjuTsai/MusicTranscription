const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  google_id: { type: String, unique: true },
  username: { type: String, required: true },
  name: String,
  email: String,
  self_description: String,
  self_tags: String,
  address: String,  
  profile_picture_url: String,
  upload_works: [{ type: Schema.Types.ObjectId, ref: 'Works' }],
  download_works: [{ type: Schema.Types.ObjectId, ref: 'Works' }],
  google_token: String,
  google_token_type: String,
  google_token_update_date: Date,
  sign_up_date: Date
},  {
  collection: 'User',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('User', UserSchema)
