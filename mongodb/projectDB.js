const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId

const NoteSchema = new Schema({
  'title': { type: String, default: '' },
  'description': { type: String, default: '' },
  'content': { type: String, default: '' },
  'logo': { type: String, default: '' },
  'createTime': { type: Date, default: new Date() },
  'updateTime': { type: Number, default: 0 },
});

const Model = mongoose.model('Project', NoteSchema, 'Project');

class ProjectMongodb {
  constructor() { }

  static async add({ title, description, content, logo }) {
    const param = { title, description, content, logo };
    return new Model(param).save();
  }

  static async delete(projectId) {
    const param = { _id: ObjectId(projectId) };
    return await Model.findOneAndRemove(param);
  }

  static async update({ projectId, title, description, content, logo, updateTime }) {
    const param = { _id: ObjectId(projectId) }
    console.log(description)
    return await Model.updateOne(param, { title, description, content, logo, updateTime })
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
