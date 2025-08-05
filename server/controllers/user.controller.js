import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  // 必須傳入 "password"（不是 hashed_password）
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password 
  })

  try {
    await user.save()
    return res.status(200).json({ message: "Registration successful!" })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created') 
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id) // 通過ID查找用戶
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user 
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Unable to retrieve user data"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined // 移除密碼雜湊
  req.profile.salt = undefined // 移除鹽值
  return res.json(req.profile) // 返回清理後的用戶資料
}

// Get current user from JWT token
const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.auth._id).select('-hashed_password -salt')
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: "Unable to retrieve user data"
    })
  }
}

// [更新使用者資料]
const update = async (req, res) => {
  try {
    let user = req.profile // 從中介軟體獲取用戶
    user = extend(user, req.body) // 使用lodash合併更新
    user.updated = Date.now() // 更新時間戳
    await user.save() // 保存更新
    
    // 清理敏感資訊後返回
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// [刪除使用者]
const remove = async (req, res) => {
  try {
    let user = req.profile // 從中介軟體獲取用戶
    let deletedUser = await user.deleteOne() // 刪除用戶
    
    // 清理敏感資訊後返回
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({}) // 刪除所有用戶
    res.json({
      message: `${result.deletedCount} users deleted successfully`
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



export default { 
  create, 
  userByID, 
  read, 
  getCurrentUser,
  list, 
  remove, 
  update,
  removeAll
}