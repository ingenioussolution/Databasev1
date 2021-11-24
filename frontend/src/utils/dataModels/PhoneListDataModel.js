import { dollarUS } from '../format'

export const phone = {
  field: 'phone',
  title: 'Phone',
}
export const firstName = {
  field: 'firstName',
  title: 'First_Name',
}

export const lastName = {
  field: 'lastName',
  title: 'Last_Name',
  filtering: false,
}

export const email = {
  field: 'email',
  title: 'Email Address',
  filtering: false,
}

export const carrier = {
  field: 'carrier',
  title: 'Carrier',
}

export const blackListAlliance = {
  field: 'blackListAlliance',
  title: 'Black List',
  align: 'center',
  filtering: false,
}

export const incomeSource = {
  field: 'incomeSource',
  title: 'Income Source',
  filtering: false,
}
export const monthlyIncome = {
  field: 'monthlyIncome',
  title: 'Monthly Income($)',
  align: 'right',
  filtering: false,
}

export const status = {
  field: 'status',
  title: 'Status',
  align: 'center',
  filtering: false,
}

export const countryCode = {
  field: 'countryCode',
  title: 'Country Code',
  align: 'center',
  filtering: false,
}

export const state = {
  field: 'state',
  title: 'State',
  filtering: false,
}

export const revenue = {
  field: 'revenue',
  title: 'Revenue',
}

export const creditScore = {
  field: 'creditScore',
  title: 'Credit Score',
  filtering: false,
}

export const clicker = {
  field: 'clicker',
  title: 'Clicker',
  lookup: { true: 'true', false: 'false' },
}

export const converter = {
  field: 'converter',
  title: 'Converter',
  lookup: { true: 'true', false: 'false' },
}

export const hardBounce = {
  field: 'hardBounce',
  title: 'hardBounce',
  lookup: { true: 'true', false: 'false' },
}

export const suppressed = {
  field: 'suppressed',
  title: 'Suppressed',
  lookup: { true: 'true', false: 'false' },
}

export const list = {
  field: 'list',
  title: 'List',
  filtering: false,
}

export const source = {
  field: 'source',
  title: 'Source',
  filtering: false,
}

export const ip = {
  field: 'ip',
  title: 'IP',
  filtering: false,
}

export const site = {
  field: 'site',
  title: 'Site',
  filtering: false,
}

export const zipCode = {
  field: 'zipCode',
  title: 'Zip Code',
  filtering: false,
}

export const subId = {
  field: 'subId',
  title: 'SubId',
  filtering: false,
}
export const vertical = {
  field: 'vertical',
  title: 'Vertical',
  filtering: false,
}
export const platform = {
  field: 'platform',
  title: 'Platform',
  filtering: false,
}
export const message = {
  field: 'message',
  title: 'Message',
  filtering: false,
}
export const recentAbuse = {
  field: 'recentAbuse',
  title: 'Recent Abuse',
  filtering: false,
}
export const fraudScore = {
  field: 'fraudScore',
  title: 'FraudScore',
  filtering: false,
}
export const validMobile = {
  field: 'validMobile',
  title: 'Valid Mobile',
  filtering: false,
}
export const lineType = {
  field: 'lineType',
  title: 'Line Type',
  filtering: false,
}
export const prepaid = {
  field: 'prepaid',
  title: 'Prepaid',
  filtering: false,
}
export const risky = {
  field: 'risky',
  title: 'Risky',
  filtering: false,
}
export const city = {
  field: 'city',
  title: 'City',
  filtering: false,
}
export const listID = {
  field: 'listID',
  title: 'ListID',
  filtering: false,
}
export const birthDate = {
  field: 'birthDate',
  title: 'Birth date',
  filtering: false,
}
export const gender = {
  field: 'gender',
  title: 'Gender',
  filtering: false,
}
export const senderID = {
  field: 'senderID',
  title: 'SenderID',
  filtering: false,
}
export const sendAt = {
  field: 'sendAt',
  title: 'SendAt',
  filtering: false,
}

export const validity = {
  field: 'validity',
  title: 'validity',
  filtering: false,
}

export const subject = {
  field: 'subject',
  title: 'Subject',
  filtering: false,
}

export const vertical2 = {
  field: 'vertical2',
  title: 'Vertical2',
  filtering: false,
}

export const vertical3 = {
  field: 'vertical3',
  title: 'Vertical3',
  filtering: false,
}

export const updatedAt = {
  field: 'updatedAt',
  title: 'Update Date',
  type: 'date',
  filtering: false,
}
export const createdAt = {
  field: 'createdAt',
  title: 'Create Date',
  type: 'date',
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

export const formatRisky = (risky) => {
  switch (risky.toString()) {
    case 'true':
      return <span className="text-success">{'true'}</span>
    default:
      return <span className="text-false">{'false'}</span>
  }
}

export const formatClicker = (clicker) => {
  switch (clicker.toString()) {
    case 'true':
      return <span className="text-success">{'true'}</span>
    default:
      return <span className="text-false">{'false'}</span>
  }
}

export const formatStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'sold':
      return <span className="text-success">{status}</span>
    case 'reject':
      return <span className="text-warning">{status}</span>
    default:
      return <span>{status}</span>
  }
}

export const formatIncomeSource = (incomeSource) => {
  switch (incomeSource?.toLowerCase()) {
    case 'benefits':
      return <span className="text-success">{incomeSource}</span>
    case 'job':
      return <span className="text-success">{incomeSource}</span>
    case 'selfEmployed':
      return <span className="text-success">{incomeSource}</span>
    default:
      return <span>{incomeSource}</span>
  }
}

export const formatCreditScore = (creditScore) => {
  switch (creditScore?.toLowerCase()) {
    case 'no':
      return <span className="text-success">{creditScore}</span>
    case 'poor':
      return <span className="text-success">{creditScore}</span>
    case 'bad':
      return <span className="text-success">{creditScore}</span>
    case 'fair':
      return <span className="text-success">{creditScore}</span>
    case 'good':
      return <span className="text-success">{creditScore}</span>
    case 'excellent':
      return <span className="text-success">{creditScore}</span>
    default:
      return <span>{creditScore}</span>
  }
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

            case 'blackListAlliance': {
              return formatBlackList(el.blackListAlliance)
            }
            case 'risky': {
              return formatRisky(el.risky)
            }
            case 'clicker': {
              return formatClicker(el.clicker)
            }
            case 'status': {
              return formatStatus(el.status)
            }
            case 'incomeSource': {
              return formatIncomeSource(el.incomeSource)
            }
            case 'creditScore': {
              return formatCreditScore(el.creditScore)
            }
            case 'monthlyIncome': {
              return dollarUS.format(el.monthlyIncome)
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
  phone,
  carrier,
  firstName,
  lastName === '' ? null : lastName,
  clicker,
  converter,
  hardBounce,
  revenue,
  suppressed,
  updatedAt,
  email,
  monthlyIncome,
  validMobile,
  blackListAlliance,
  status,
  incomeSource,
  risky,
  lineType,
  creditScore,
  list,
  source,
  ip,
  site,
  zipCode,
  state,
  subId,
  vertical,
  platform,
  message,
  recentAbuse,
  fraudScore,
  prepaid,
  city,
  listID,
  birthDate,
  gender,
  senderID,
  sendAt,
  validity,
  subject,
  vertical2,
  vertical3,
]
