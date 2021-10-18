//import { dollarUS } from '../format'

export const phone = {
  field: 'phone',
  label: 'Phone Number',
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

export const validMobile = {
  field: 'validMobile',
  label: 'validMobile',
}

export const incomeSource = {
  field: 'incomeSource',
  label: 'Monthly Income($)',
}
export const monthlyIncome = {
  field: 'monthlyIncome',
  label: 'Income Source',
}

export const status = {
  field: 'status',
  label: 'Status',
  align: 'center'
}

export const countryCode = {
  field: 'countryCode',
  label: 'Country Code',
  align: 'center'
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

export const formatStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'sold':
      return <span className='text-success'>{status}</span>
    case 'reject':
      return <span className='text-warning'>{status}</span>
    default:
      return <span>{status}</span>
  }
}

export const formatIncomeSource = (incomeSource) => {
  switch (incomeSource?.toLowerCase()) {
    case 'benefits':
      return <span className='text-success'>{incomeSource}</span>
    case 'job':
        return <span className='text-success'>{incomeSource}</span>
    case 'selfEmployed':
        return <span className='text-success'>{incomeSource}</span>
    default:
      return <span>{incomeSource}</span>
  }
}

export const formatCreditScore = (creditScore) => {
  switch (creditScore?.toLowerCase()) {
    case 'no':
      return <span className='text-success'>{creditScore}</span>
    case 'poor':
        return <span className='text-success'>{creditScore}</span>
    case 'bad':
        return <span className='text-success'>{creditScore}</span>
    case 'fair':
          return <span className='text-success'>{creditScore}</span>
    case 'good':
            return <span className='text-success'>{creditScore}</span>
    case 'excellent':
              return <span className='text-success'>{creditScore}</span>            
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
              return `${el.firstName} ${el.lastName}`
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
            // case 'monthlyIncome': {
            //   return dollarUS.format(el.monthlyIncome)
            // }
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
  name,
  email,
  phone,
  carrier,
  monthlyIncome,
  validMobile,
  status,
  incomeSource,
]

