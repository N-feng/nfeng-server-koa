const Router = require('koa-router');
const TaskMongodb = require('../../mongodb/task');

const router = new Router({
  prefix: '/task'
});

router.post('/add', async (ctx) => {
  ctx.isStrings(['title', 'description', 'date', 'priority']);
  const { title, description, date, priority } = ctx.vals;
  const taskData = await TaskMongodb.add(title, description, date, priority);
  const resData = {
    taskId: taskData._id,
    title: taskData.title,
    description: taskData.description,
    date: taskData.date,
    priority: taskData.priority,
  }
  const data = {
    ...resData,
  }
  ctx.sendSuccess(data, 'create success!');
})

router.post('/delete', async (ctx) => {
  ctx.isStrings(['taskId']);
  const { taskId } = ctx.vals;
  const taskData = await TaskMongodb.delete(taskId);
  ctx.sendSuccess(taskData, 'delete success!');
});

router.post('/update', async (ctx) => {
  ctx.isStrings(['taskId', 'title', 'description', 'date', 'priority'])
  const { taskId, title, description, date, priority } = ctx.vals
  const taskData = await TaskMongodb.update(taskId, title, description, date, priority)
  ctx.sendSuccess(taskData, 'update success~')
})

router.post('/detail', async (ctx) => {
  ctx.isStrings(['taskId'])
  const { taskId } = ctx.vals
  const taskData = await TaskMongodb.detail(taskId)
  if (!taskData) {
    throw { code: 500, msg: '任务不存在' }
  }
  const data = {
    taskId: taskData._id,
    title: taskData.title,
    description: taskData.description,
    date: taskData.date,
    priority: taskData.priority,
  }
  ctx.sendSuccess(data)
})

router.post('/list', async (ctx) => {
  const taskList = await TaskMongodb.list()
  const data = taskList.map(item => {
    return {
      taskId: item._id,
      title: item.title,
      description: item.description,
      date: item.date,
      priority: item.priority,
    }
  });
  ctx.sendSuccess(data);
})

module.exports = router