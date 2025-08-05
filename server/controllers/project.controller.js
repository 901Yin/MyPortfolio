import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  const project = new Project(req.body)
  try {
    const savedProject = await project.save()
    return res.status(200).json(savedProject)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let projects = await Project.find().select('title firstname lastname email completion')
    res.json(projects)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id)
    if (!project)
      return res.status(400).json({
        error: "No project found"
      })
    req.profile = project
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Unable to obtain project information"
    })
  }
}

// [讀取專案資料]
const read = (req, res) => {
  return res.json(req.profile) // 返回專案資料
}

// [更新專案資料]
const update = async (req, res) => {
  try {
    let project = req.profile // 從中介軟體獲取專案
    project = extend(project, req.body) // 使用lodash合併更新
    project.updated = Date.now() // 更新時間戳
    await project.save() // 保存更新
    
    res.json(project)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// [刪除單個專案]
const remove = async (req, res) => {
  try {
    let project = req.profile // 從中介軟體獲取專案
    let deletedProject = await project.deleteOne() // 刪除專案
    
    res.json(deletedProject)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({}) // Delete all projects
    res.json({
      message: `${result.deletedCount} projects deleted successfully`
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { 
  create, 
  projectByID, 
  read,     // Added
  list, 
  remove,   // Added
  removeAll,  
  update    // Added
}