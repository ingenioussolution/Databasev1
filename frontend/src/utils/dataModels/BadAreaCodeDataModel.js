import stateList from '../statesList'
let arrayNameState = []
let arrayState = []

stateList.map((nameIndex) => {
  return (
    arrayNameState.push(nameIndex.nameState), arrayState.push(nameIndex.state)
  )
})

export const nameState = {
  field: 'nameState',
  title: 'Name State',
  lookup: { ...arrayNameState },
}
export const state = {
  field: 'state',
  title: 'State',
  lookup: { ...arrayState },
}
export const areaCode = {
  field: 'areaCode',
  title: 'Area Code',
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
