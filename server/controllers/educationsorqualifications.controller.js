import EducationOrQualification from '../models/educationsorqualifications.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  const record = new EducationOrQualification(req.body)
  try {
    const savedRecord = await record.save()
    return res.status(200).json(savedRecord)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let records = await EducationOrQualification.find().select('title firstname lastname completion')
    res.json(records)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// [通過ID獲取教育記錄] (中介軟體)
const educationByID = async (req, res, next, id) => {
  try {
    let record = await EducationOrQualification.findById(id)
    if (!record) {
      return res.status('400').json({
        error: "Education record not found"
      })
    }
    req.profile = record // 將記錄對象附加到請求對象
    next() // 傳遞給下個中介軟體
  } catch (err) {
    return res.status('400').json({
      error: "Unable to retrieve education record data"
    })
  }
}

// [讀取教育記錄資料]
const read = (req, res) => {
  return res.json(req.profile) // 返回教育記錄資料
}

// [更新教育記錄資料]
const update = async (req, res) => {
  try {
    let record = req.profile // 從中介軟體獲取記錄
    record = extend(record, req.body) // 使用lodash合併更新
    record.updated = Date.now() // 更新時間戳
    await record.save() // 保存更新
    
    res.json(record)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// [刪除單個教育記錄]
const remove = async (req, res) => {
  try {
    let record = req.profile // 從中介軟體獲取記錄
    let deletedRecord = await record.deleteOne() // 刪除記錄
    
    res.json(deletedRecord)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await EducationOrQualification.deleteMany({}) // Delete all education records
    res.json({
      message: `${result.deletedCount} education records deleted successfully`
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { 
  create, 
  educationByID,
  read, 
  list, 
  remove, 
  removeAll,
  update 
}