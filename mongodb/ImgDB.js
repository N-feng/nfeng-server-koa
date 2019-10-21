const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = require('mongoose').Types.ObjectId

const NoteSchema = new Schema({
  'username': { type: String, default: '' },
  'name': { type: String, default: '' },
  'url': { type: String, default: '' },
  'thumbUrl': { type: String, default: '' },
  'createTime': { type: Date, default: new Date() },
  'updateTime': { type: Number, default: 0 },
})

const Model = mongoose.model('Img', NoteSchema, 'Img')

class ProjectMongodb {
  constructor() { }

  static async add(params) {
    return new Model(params).save()
  }

  static async delete(_id) {
    return await Model.findOneAndRemove({ _id: ObjectId(_id) })
  }

  static async update({ projectId, title, link, content, logo, updateTime }) {
    const param = { _id: ObjectId(projectId) }
    return await Model.updateOne(param, { title, link, content, logo, updateTime })
  }

  static async find(params) {
    if ('_id' in params) {
      params._id = ObjectId(params._id)
    }
    return await Model.findOne(params)
  }

  static async list() {
    return await Model.find()
  }
}

module.exports = ProjectMongodb
