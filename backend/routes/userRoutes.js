import express from 'express'
import {
  authUser,
  authAdminUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword,
  adminForgotPassword,
  resetPassword,
  updateUserProfilePicture,
  updateUserProfilePictureAsAdmin,
  
} from '../controllers/userController.js'
import { protect, admin } from '../middlewere/authMiddlewere.js'

const router = express.Router()

router.post('/', registerUser)
router.get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.post('/admin-login', authAdminUser)
router.post('/forgot-password', forgotPassword)
router.post('/admin-forgot-password', adminForgotPassword)
router.post('/reset-password', resetPassword)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.put('/:id', protect, admin, updateUser)
router.delete('/:id', protect, admin,deleteUser)
router.get('/:id', protect, admin, getUserById)
router.post('/profile-picture', protect, updateUserProfilePicture)
router.post('/profile-picture/:id', protect, admin,  updateUserProfilePictureAsAdmin)

//router.get('/', protect, admin, getUsers)
//router.delete('/:id', protect, admin, deleteUser)
//router.put('/:id', protect, admin, updateUser)
export default router
