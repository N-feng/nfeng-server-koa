const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId

const NoteSchema = new Schema({
  'title': { type: String, default: '' },
  'link': { type: String, default: '' },
  'content': { type: String, default: '' },
  'logo': { type: String, default: '' },
  'createTime': { type: Date, default: new Date() },
  'updateTime': { type: Number, default: 0 },
});

const Model = mongoose.model('Project', NoteSchema, 'Project');

class ProjectMongodb {
  constructor() { }

  static async add({ title, link, content, logo }) {
    const param = { title, link, content, logo };
    return new Model(param).save();
  }

  static async delete(projectId) {
    const param = { _id: ObjectId(projectId) };
    return await Model.findOneAndRemove(param);
  }

  static async update({ projectId, title, link, content, logo, updateTime }) {
    const param = { _id: ObjectId(projectId) }
    return await Model.updateOne(param, { title, link, content, logo, updateTime })
  }

  static async find(projectId) {
    const param = { _id: ObjectId(projectId) };
    return await Model.findOne(param);
  }

  static async list() {
    return await Model.find();
  }
}

module.exports = ProjectMongodb
