import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: 'Please enter your first name',
    },
    lastName: {
      type: String,
      require: 'Please enter your last name',
    },
    email: {
      type: String,
      require: 'Please enter your email address',
      unique: true,
    },
    username: {
      type: String,
      require: 'Please enter a username',
      unique: true,
    },
    password: {
      type: String,
      require: 'Please enter a password',
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
