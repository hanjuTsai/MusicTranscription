const request = require('request-promise')
const config = require('../../config')
const ObjectId = require('mongoose').Types.ObjectId
const Works = require('../models/Works')
const User = require('../models/User')
const fs = require('fs')
const Busboy = require('busboy')

exports.convert_for_music = async (req, res) => {
  try {
    await save_music_file(req, res)
    
  } catch (err) {
    console.error(err)
  }
}

exports.convert_for_music_information = async (req, res) => {
  try {
    await save_music_information(req, res)

  } catch (err) {
    res.status(403).json({
      message: 'save information and convert fail',
      type: 'fail'
    })
  }
}

const save_music_file = async (req, res) => {
  const posi = '/service/improj2019/server/origin/' + req.session.current_user.username + '/'
  const busboy = new Busboy({
    headers: req.headers,
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  })

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'audio/mpeg' && mimetype !== 'audio/wave' && mimetype !== 'audio/mp3') {
      res.status(403).json({
        message: 'error format',
        type: 'fail'
      })

      file.resume()
    }
    else {
      if (!fs.existsSync(posi))
        fs.mkdirSync(posi)

      const file_path = posi + filename
      file.pipe(fs.createWriteStream(file_path))

      busboy.on('finish', () => {
        res.status(200).send({
          message: { file_path: file_path, file_name: filename },
          type: 'success'
        })
      })
    }
  })

  return req.pipe(busboy)
}

const save_music_information = async (req, res) => {
  try {
    const works_num = await Works.find({}).countDocuments()
    const work_id = ObjectId()
    const this_id = works_num + 1
    const file_path = req.body.file_path
    const file_name = req.body.file_name
    const method = req.body.isseparate && req.body.isconvert ? 'both' :
                   req.body.isseparate && !req.body.isconvert ? 'separate' :
                   !req.body.isseparate && req.body.isconvert ? 'convert' : 'else'
    
    if (method === 'else')
      res.status(403).json({
        message: 'choose at least one of separate or convert',
        type: 'fail'
      })

    const convert_result = await call_sheep_server(method, req.session.current_user.username, file_path, file_name)
    // convert_result = { success: true }

    if (convert_result.success) {
      const newWork = new Works({
        _id: work_id,
        file_id: this_id.toString(),
        pdf_file_path: convert_result.pdf,
        sep_piano_path: convert_result.others,
        sep_human_path: convert_result.voice,
        title: req.body.title,
        description: req.body.description,
        uploader: ObjectId(req.session.current_user._id),
        click_times: 0,
        download_times: 0,
        separate: req.body.isseparate,
        convert: req.body.isconvert,
        public: req.body.ispublic
      })
  
      await newWork.save()
      await User.updateOne({ google_id: req.session.current_user.google_id }, { $push: { upload_works: work_id } })
  
      res.status(200).json({
        message: 'backend: save information and convert success & django:' + convert_result.msg,
        type: 'success'
      })
    }
    else {
      res.status(403).json({
        message: 'both backend and django: save information and convert fail',
        type: 'fail'
      })
    }

  } catch (err) {
    console.error(err)
    res.status(403).json({
      message: 'failure due to unknown error',
      type: 'fail'
    })
  }
}

const call_sheep_server = async (method, user, path, file_name) => {
  askfor_convert = await request({
    method: 'POST',
    uri: 'http://localhost:10000/api',
    headers: {
      'Content-Type': 'application/json'
    },
    form: JSON.stringify({
      method: method,
      path: path,
      user: user,
      file: file_name
    }),
    json: true
  })
  // .then(res => { return res.json() })
  .then(res => {
    return {
      success: res.success,
      voice: res.voice,
      others: res.others,
      pdf: res.pdf,
      msg: res.msg
    }
  })
  .catch(err => {
    console.error(err)
  })

  return askfor_convert
}
