import bcrypt from 'bcryptjs'

const userData = [
  {
    firstName: 'Lisandra',
    lastName: 'Camps',
    email: 'lisandra.camps@gmail.com',
    username: 'lcamps',
    status: 'active',
    password: bcrypt.hashSync('123456', 10),
    isAdmin:true,
  },
  {
    firstName: 'Chris',
    lastName: 'Kay',
    email: 'Chris@chriskay.com',
    username: 'chriskay',
    status: 'active',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Cameron',
    lastName: '',
    email: 'Cameron@AdPath.com',
    username: 'cameron',
    status: 'active',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Alena',
    lastName: '',
    email: 'Alena@AdPath.com',
    username: 'alena',
    status: 'active',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default userData
