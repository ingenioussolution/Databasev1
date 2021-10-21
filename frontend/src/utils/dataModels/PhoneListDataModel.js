import { dollarUS } from '../format'

export const phone = {
  field: 'phone',
  label: 'Phone',
}
export const name = {
  field: 'name',
  label: 'Name',
  compareBy: 'firstName',
}

export const email = {
  field: 'email',
  label: 'Email Address',
}

export const carrier = {
  field: 'carrier',
  label: 'Carrier',
}

export const blackListAlliance = {
  field: 'blackListAlliance',
  label: 'Black List',
  align: 'center',
}

export const incomeSource = {
  field: 'incomeSource',
  label: 'Income Source',
}
export const monthlyIncome = {
  field: 'monthlyIncome',
  label: 'Monthly Income($)',
  align: 'right',
}

export const status = {
  field: 'status',
  label: 'Status',
  align: 'center',
}

export const countryCode = {
  field: 'countryCode',
  label: 'Country Code',
  align: 'center',
}

export const state = {
  field: 'state',
  label: 'State',
}

export const revenue = {
  field: 'revenue',
  label: 'Revenue',
}

export const creditScore = {
  field: 'creditScore',
  label: 'Credit Score',
}

export const clicker = {
  field: 'clicker',
  label: 'Clicker',
}

export const converter = {
  field: 'converter',
  label: 'Converter',
}

export const hardBouce = {
  field: 'hardBouce',
  label: 'Hard Bouce',
}

export const suppressed = {
  field: 'suppressed',
  label: 'Suppressed',
}

export const list = {
  field: 'list',
  label: 'List',
}

export const source = {
  field: 'source',
  label: 'Source',
}

export const ip = {
  field: 'ip',
  label: 'IP',
}

export const site = {
  field: 'site',
  label: 'Site',
}

export const zipCode = {
  field: 'zipCode',
  label: 'Zip Code',
}

export const subId = {
  field: 'subId',
  label: 'SubId',
}
export const vertical = {
  field: 'vertical',
  label: 'Vertical',
}
export const platform = {
  field: 'platform',
  label: 'Platform',
}
export const message = {
  field: 'message',
  label: 'Message',
}
export const recentAbuse = {
  field: 'recentAbuse',
  label: 'Recent Abuse',
}
export const fraudScore = {
  field: 'fraudScore',
  label: 'FraudScore',
}
export const validMobile = {
  field: 'validMobile',
  label: 'Valid Mobile',
}
export const lineType = {
  field: 'lineType',
  label: 'Line Type',
}
export const prepaid = {
  field: 'prepaid',
  label: 'Prepaid',
}
export const risky = {
  field: 'risky',
  label: 'Risky',
}
export const city = {
  field: 'city',
  label: 'City',
}
export const listID = {
  field: 'listID',
  label: 'ListID',
}
export const birthDate = {
  field: 'birthDate',
  label: 'Birth date',
}
export const gender = {
  field: 'gender',
  label: 'Gender',
}
export const senderID = {
  field: 'senderID',
  label: 'SenderID',
}
export const sendAt = {
  field: 'sendAt',
  label: 'SendAt',
}

export const validity = {
  field: 'validity',
  label: 'validity',
}

export const subject = {
  field: 'subject',
  label: 'Subject',
}

export const vertical2 = {
  field: 'vertical2',
  label: 'Vertical2',
}

export const vertical3 = {
  field: 'vertical3',
  label: 'Vertical3',
}

export const formatBlackList = (blackListAlliance) => {
  switch (blackListAlliance.toString()) {
    case 'true':
      return <span className="text-success">{'true'}</span>
    default:
      return <span className="text-false">{blackListAlliance}</span>
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
  name,
  email,
  monthlyIncome,
  validMobile,
  blackListAlliance,
  status,
  incomeSource,
  revenue,
  risky,
  clicker,
  converter,
  hardBouce,
  lineType,
  creditScore,
  suppressed,
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
