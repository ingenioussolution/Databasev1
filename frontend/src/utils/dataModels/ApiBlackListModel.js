export const phone = {
  field: 'phone',
  title: 'Phone',
}
export const carrier = {
  field: 'carrier',
  title: 'Carrier',
}

export const blackListAlliance = {
  field: 'blackListAlliance',
  title: 'BlackList',
  align: 'center',
  render: (row) => (
    <div className={row.blackListAlliance ? 'text-success' : 'text-error'}>
      {row.blackListAlliance ? 'True' : 'False'}
    </div>
  ),
  filtering: false,
}

export const loopUp = {
  field: 'loopUp',
  title: 'Loop Up',
  align: 'center',
  render: (row) => (
    <div className={row.loopUp ? 'text-success' : 'text-error'}>
      {row.loopUp ? 'True' : 'False'}
    </div>
  ),
  filtering: false,
}

export const formatBlackList = (blackListAlliance) => {
  switch (blackListAlliance.toString()) {
    case 'true':
      return <span className="text-success">{'true'}</span>
    default:
      return <span className="text-false">{'false'}</span>
  }
}

export const formatLoopUp = (loopUp) => {
  switch (loopUp.toString()) {
    case 'true':
      return <span className="text-success">{'true'}</span>
    default:
      return <span className="text-false">{'false'}</span>
  }
}

export const createRows = (data) => {
  let rows = []
  if (data) {
    data.map((el) => {
      rows.push({
        getValueAt(columnName) {
          switch (columnName) {
            case 'blackListAlliance': {
              return formatBlackList(el.blackListAlliance)
            }
            case 'loopUp': {
              return formatLoopUp(el.loopUp)
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

export const defaultColumns = [phone,blackListAlliance, loopUp]
