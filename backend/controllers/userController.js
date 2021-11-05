import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc     Auth user & get token
// @route    POST /users/login
// @access   Public
export const authUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    next(error)
  }
})

// @desc     Auth admin user & get token
// @route    POST /users/admin-login
// @access   Public
export const authAdminUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email, isAdmin: true })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin,
        status: user.status,
        token: generateToken(user._id),
      })
    } else {
      res.status(404)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    next(error)
  }
})

// @desc   Register a new user
// @route    POST /users
// @access   Public
export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password } = req.body

    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      status: 'active',
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        status: user.status,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    next(error)
  }
})


// @desc     Update user profile
// @route    PUT /users/profile
// @access   Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email
      user.username = req.body.username || user.username
      user.status = req.body.status || user.status
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        status: updatedUser.status,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// @desc     Get user profile
// @route    GET /users/profile
// @access   Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id)
  
      if (user) {
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
          isAdmin: user.isAdmin,
        })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    } catch (error) {
      next(error)
    }
  })


  
// @desc     Get all users
// @route    GET /users
// @access   Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (error) {
      next(error)
    }
  })

// @desc     Delete user
// @route    Delete /users/:id
// @access   Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    } catch (error) {
      next(error)
    }
  })
  
  // @desc     Get forgot password token
// @route    PUT /api/users/forgot-password
// @access   Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      })
  
      if (user) {
        let token = randomBytes(20).toString('hex')
  
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 86400000
        const updatedUser = await user.save()
  
        res.json({ firstName: updatedUser.firstName, token: token })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    } catch (err) {
      next(err)
    }
  })
  
  // @desc     Get forgot password token
  // @route    PUT /api/users/admin-forgot-password
  // @access   Public
  export const adminForgotPassword = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
        isAdmin: true,
      })
  
      if (user) {
        let token = randomBytes(20).toString('hex')
  
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 86400000
        const updatedUser = await user.save()
  
        res.json({ firstName: updatedUser.firstName, token: token })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    } catch (err) {
      next(err)
    }
  })
  
  // reset password
  export const resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    })
  
    if (user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.password = req.body.newPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        const updatedUser = await user.save()
        return res.json({
          firstName: updatedUser.firstName,
          email: updatedUser.email,
          message: 'Password changed',
        })
      } else {
        return res.status(422).send({
          message: 'Passwords do not match',
        })
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.',
      })
    }
  })
  
  // @desc     Update user profile
  // @route    PUT /users/profile-picture
  // @access   Private
  export const updateUserProfilePicture = asyncHandler(async (req, res, next) => {
    try {
      singleUpload(req, res, async function (err) {
        if (err) {
          return res.json({
            success: false,
            errors: {
              title: 'Image Upload Error',
              detail: err.message,
              error: err,
            },
          })
        }
  
        const user = await User.findById(req.user._id)
        if (user) {
          user.profilePicture = req.file.location
        }
        const updatedUser = await user.save()
        res.json({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          username: updatedUser.username,
          profilePicture: updatedUser.profilePicture,
          status: updatedUser.status,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        })
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  })
  
  // @desc     Update user
// @route    PUT /users/:id
// @access   Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
  
      if (user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.username = req.body.username || user.username
        user.status = req.body.status || user.status
        user.password = req.body.password || user.password
  
        const updatedUser = await user.save()
  
        res.json({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          email: updatedUser.email,
        })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    } catch (error) {
      next(error)
    }
  })
  

  // @desc     Update user
  // @route    POST /users/profile-picture/:id
  // @access   Private/Admin
  export const updateUserProfilePictureAsAdmin = asyncHandler(
    async (req, res, next) => {
      try {
        singleUpload(req, res, async (err) => {
          if (err) {
            return res.json({
              success: false,
              errors: {
                title: 'Image Upload Error',
                detail: err.message,
                error: err,
              },
            })
          }
  
          const user = await User.findById(req.params?.id)
          if (user) {
            user.profilePicture = req.file?.location
  
            const updatedUser = await user.save()
            res.json({
              _id: updatedUser._id,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
              phone: updatedUser.phone,
              username: updatedUser.username,
              profilePicture: updatedUser.profilePicture,
              status: updatedUser.status,
              isAdmin: updatedUser.isAdmin,
              token: generateToken(updatedUser._id),
            })
          } else {
            res.status(404)
            throw new Error('User not found')
          }
        })
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
  )
  