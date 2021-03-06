const Router = require('koa-router')
const ProjectMongodb = require('../../mongodb/projectDB')

const router = new Router({
  prefix: '/project'
})

router.post('/add', async ctx => {
  ctx.isStrings(['title', 'link', 'content', 'logo'])
  const { title, link, content, logo } = ctx.vals
  const projectData = await ProjectMongodb.add({ title, link, content, logo })
  const projectId = projectData._id
  const data = {
    projectId, title, link, content, logo
  }
  ctx.sendSuccess(data, 'create success!')
})

router.post('/delete', async ctx => {
  ctx.isStrings(['projectId'])
  const { projectId } = ctx.vals
  const projectData = await ProjectMongodb.delete(projectId)
  ctx.sendSuccess(projectData, 'delete success!')
})

router.post('/update', async ctx => {
  ctx.isStrings(['projectId', 'title', 'link', 'content', 'logo'])
  const { projectId, title, link, content, logo } = ctx.vals
  if (!(await ProjectMongodb.find(projectId))) {
    throw { code: 10002, msg: 'Note does not exist' }
  }
  const updateTime = new Date().getTime()
  const projectData = await ProjectMongodb.update({ projectId, title, link, content, logo, updateTime })
  if (!projectData.ok) {
    throw { code: 500, msg: 'update fail' }
  }
  ctx.sendSuccess('', 'update success~')
})

router.post('/detail', async ctx => {
  ctx.isStrings(['projectId'])
  const { projectId } = ctx.vals
  const projectData = await ProjectMongodb.find(projectId)
  if (!projectData) {
    throw { code: 500, msg: '任务不存在' }
  }
  const { title, link, content, logo, createTime, updateTime } = projectData
  const data = {
    projectId, title, link, content, logo, createTime, updateTime
  }
  ctx.sendSuccess(data)
})

router.post('/list', async ctx => {
  const projectList = await ProjectMongodb.list()
  const data = projectList.map(item => {
    const projectId = item._id
    const { title, link, content, logo, createTime, updateTime } = item
    return {
      projectId, title, link, content, logo, createTime, updateTime
    }
  })
  ctx.sendSuccess(data)
})

module.exports = router
