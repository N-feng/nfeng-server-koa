const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId

const TaskSchema = new Schema({
  'title': { type: String, default: '' },
  'description': { type: String, default: '' },
  'date': { type: String, default: '' },
  'priority': { type: String, default: '' },
});

const Model = mongoose.model('Task', TaskSchema, 'task');

class TaskMongodb {
  constructor() { }

  static async add(title, description, date, priority) {
    const param = { title, description, date, priority };
    return new Model(param).save();
  }

  static async delete(taskId) {
    const param = { _id: ObjectId(taskId) };
    return await Model.findOneAndRemove(param);
  }

  static async update(taskId, title, description, date, priority) {
    const param = { _id: ObjectId(taskId) }
    return await Model.updateOne(param, { title, description, date, priority })
  }

  static async detail(taskId) {
    const param = { _id: ObjectId(taskId) }
    return await Model.findOne(param)
  }

  static async list() {
    return await Model.find();
  }
}

module.exports = TaskMongodb
