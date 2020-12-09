const request = require('request-promise')
const config = require('../../config')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/User')
const Works = require('../models/Works')

exports.get_profile = async (req, res) => {
  const current_user = req.session.current_user
  let user = await User.findOne({ google_id: current_user.google_id })
                      .populate({ path: 'upload_works', options: { sort: { 'created_at': -1 } } })
                      .populate({ path: 'download_works', options: { sort: { 'created_at': -1 } } })
                      .lean()

  for (e of user.upload_works) {
    e.uploader = current_user.username
  }

  for (e of user.download_works) {
    e.uploader = current_user.username
  }

  const response = user

  res.send(response)
}

exports.edit_profile = async (req, res) => {
  const update = req.body
  const user = req.session.current_user
  await User.updateOne(
    { google_id: user.google_id },
    {
      $set: {
        username: update.username,
        self_tags: update.self_tags,
        self_description: update.self_description,
        address: update.address
      }
    }
  )
  
  const updated_user = await User.findOne({ google_id: user.google_id })
  res.send({ user: updated_user })
}
