const Router = require('koa-router');
const NoteMongodb = require('../../mongodb/noteDB');

const router = new Router({
  prefix: '/note'
});

router.post('/add', async ctx => {
  ctx.isStrings(['title', 'content']);
  const { title, content } = ctx.vals;
  const NoteData = await NoteMongodb.add(title, content);
  const resData = {
    NoteId: NoteData._id,
    title: NoteData.title,
    content: NoteData.content
  };
  const data = {
    ...resData
  };
  ctx.sendSuccess(data, 'create success!');
});

router.post('/delete', async ctx => {
  ctx.isStrings(['noteId']);
  const { noteId } = ctx.vals;
  const taskData = await NoteMongodb.delete(noteId);
  ctx.sendSuccess(taskData, 'delete success!');
});

router.post('/update', async ctx => {
  ctx.isStrings(['noteId', 'title', 'content']);
  const { noteId, title, content } = ctx.vals;
  if (!(await NoteMongodb.find(noteId))) {
    throw { code: 10002, msg: '笔记不存在' };
  }
  const updateTime = new Date().getTime();
  const taskData = await NoteMongodb.update(noteId, title, content, updateTime);
  if (!taskData.ok) {
    throw { code: 500, msg: 'update fail' };
  }
  ctx.sendSuccess('', 'update success~');
});

router.post('/detail', async ctx => {
  ctx.isStrings(['noteId']);
  const { noteId } = ctx.vals;
  const taskData = await NoteMongodb.find(noteId);
  if (!taskData) {
    throw { code: 500, msg: '任务不存在' };
  }
  const data = {
    noteId: taskData._id,
    title: taskData.title,
    content: taskData.content,
    date: taskData.date,
    priority: taskData.priority
  };
  ctx.sendSuccess(data);
});

router.post('/list', async ctx => {
  const noteList = await NoteMongodb.list();
  const data = noteList.map(item => {
    return {
      noteId: item._id,
      title: item.title,
      content: item.content,
      createTime: item.createTime,
      updateTime: item.updateTime
    };
  });
  ctx.sendSuccess(data);
});

module.exports = router;
