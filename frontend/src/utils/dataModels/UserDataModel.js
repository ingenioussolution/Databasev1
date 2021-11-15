export const firstName = {
  field: 'firstName',
  title: 'First Name',
}
export const lastName = {
  field: 'lastName',
  title: 'Last Name',
}
export const email = {
  field: 'email',
  title: 'Email',
}
export const avatar = {
  field: 'avatar',
  title: 'Avatar',
}
export const username = {
  field: 'username',
  title: 'User Name',
}
export const isAdmin = {
  field: 'isAdmin',
  title: 'Admin',
}
export const status = {
  field: 'status',
  title: 'Status',
}
export const updatedAt = {
  field: 'updatedAt',
  title: 'Update Date',
  type: 'date',
}
export const createdAt = {
  field: 'createdAt',
  title: 'Create Date',
  type: 'date',
}

export const createRows = (data) => {
  let rows = []
  if (data) {
    data.map((el) => {
      rows.push({
        getValueAt(columnName) {
          switch (columnName) {
            case 'name': {
              return (
                `${el.firstName}` +
                (`${el.lastName}` === 'undefined' ? '' : `${el.lastName}`)
              )
            }
            default:
              return el[columnName]
          }
        },
        ...el,
      })
      return true
    })
  }
  return rows
}

export const defaultColumns = [
  firstName,
  email,
  firstName,
  lastName === '' ? null : lastName,
  username,
  isAdmin,
  updatedAt,
]
