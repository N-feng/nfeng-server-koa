const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId

const NoteSchema = new Schema({
  'title': { type: String, default: '' },
  'content': { type: String, default: '' },
  'createTime': { type: Date, default: new Date() },
  'updateTime': { type: Number, default: 0 },
});

const Model = mongoose.model('Note', NoteSchema, 'Note');

class NoteMongodb {
  constructor() { }

  static async add(title, content) {
    const param = { title, content };
    return new Model(param).save();
  }

  static async delete(noteId) {
    const param = { _id: ObjectId(noteId) };
    return await Model.findOneAndRemove(param);
  }

  static async update(noteId, title, content) {
    const param = { _id: ObjectId(noteId) }
    return await Model.updateOne(param, { title, content })
  }

  static async find(noteId) {
    const param = { _id: ObjectId(noteId) };
    return await Model.findOne(param);
  }

  static async list() {
    return await Model.find();
  }
}

module.exports = NoteMongodb
