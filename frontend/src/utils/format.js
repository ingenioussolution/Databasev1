import moment from 'moment'

export const dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const dateFormat = (date) => {
  return moment(date).format('MM/DD/YYYY')
}

export const dateTimeFormat = (date) => {
  return moment(date).format('MM/DD/YYYY HH:mm:ss')
}
