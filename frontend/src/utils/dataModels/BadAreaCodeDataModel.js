export const nameState = {
  field: 'nameState',
  title: 'Name State',
}
export const state = {
  field: 'state',
  title: 'State',
}
export const areaCode = {
  field: 'areaCode',
  title: 'Area Code',
}
export const updatedAt = {
  field: 'updatedAt',
  title: 'Update Date',
  type: 'date',
}


export const createRows = (data) => {
  let rows = []
  if (data) {
    data.map((el) => {
      rows.push({
        getValueAt(columnName) {
          switch (columnName) {
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

export const defaultColumns = [nameState, state, areaCode]
