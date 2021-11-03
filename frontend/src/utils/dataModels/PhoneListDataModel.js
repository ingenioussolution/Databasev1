import { dollarUS } from '../format'

export const phone = {
  field: 'phone',
  title: 'Phone',
}
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
  title: 'Email Address',
}

export const carrier = {
  field: 'carrier',
  title: 'Carrier',
}

export const blackListAlliance = {
  field: 'blackListAlliance',
  title: 'Black List',
  align: 'center',
}

export const incomeSource = {
  field: 'incomeSource',
  title: 'Income Source',
}
export const monthlyIncome = {
  field: 'monthlyIncome',
  title: 'Monthly Income($)',
  align: 'right',
}

export const status = {
  field: 'status',
  title: 'Status',
  align: 'center',
}

export const countryCode = {
  field: 'countryCode',
  title: 'Country Code',
  align: 'center',
}

export const state = {
  field: 'state',
  title: 'State',
}

export const revenue = {
  field: 'revenue',
  title: 'Revenue',
}

export const creditScore = {
  field: 'creditScore',
  title: 'Credit Score',
}

export const clicker = {
  field: 'clicker',
  title: 'Clicker',
}

export const converter = {
  field: 'converter',
  title: 'Converter',
}

export const hardBounce = {
  field: 'hardBounce',
  title: 'hardBounce',
}

export const suppressed = {
  field: 'suppressed',
  title: 'Suppressed',
}

export const list = {
  field: 'list',
  title: 'List',
}

export const source = {
  field: 'source',
  title: 'Source',
}

export const ip = {
  field: 'ip',
  title: 'IP',
}

export const site = {
  field: 'site',
  title: 'Site',
}

export const zipCode = {
  field: 'zipCode',
  title: 'Zip Code',
}

export const subId = {
  field: 'subId',
  title: 'SubId',
}
export const vertical = {
  field: 'vertical',
  title: 'Vertical',
}
export const platform = {
  field: 'platform',
  title: 'Platform',
}
export const message = {
  field: 'message',
  title: 'Message',
}
export const recentAbuse = {
  field: 'recentAbuse',
  title: 'Recent Abuse',
}
export const fraudScore = {
  field: 'fraudScore',
  title: 'FraudScore',
}
export const validMobile = {
  field: 'validMobile',
  title: 'Valid Mobile',
}
export const lineType = {
  field: 'lineType',
  title: 'Line Type',
}
export const prepaid = {
  field: 'prepaid',
  title: 'Prepaid',
}
export const risky = {
  field: 'risky',
  title: 'Risky',
}
export const city = {
  field: 'city',
  title: 'City',
}
export const listID = {
  field: 'listID',
  title: 'ListID',
}
export const birthDate = {
  field: 'birthDate',
  title: 'Birth date',
}
export const gender = {
  field: 'gender',
  title: 'Gender',
}
export const senderID = {
  field: 'senderID',
  title: 'SenderID',
}
export const sendAt = {
  field: 'sendAt',
  title: 'SendAt',
}

export const validity = {
  field: 'validity',
  title: 'validity',
}

export const subject = {
  field: 'subject',
  title: 'Subject',
}

export const vertical2 = {
  field: 'vertical2',
  title: 'Vertical2',
}

export const vertical3 = {
  field: 'vertical3',
  title: 'Vertical3',
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
  lastName === "" ? null : lastName,
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
  hardBounce,
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
