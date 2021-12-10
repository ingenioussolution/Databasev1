/**
 *
 * @param {String} p : phone string
 * @returns true if matches the format false otherwise
 */
export const isValidPhone = (p) => {
  const phoneRe = /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im
  const digits = p.replace(/\D/g, '')
  return phoneRe.test(digits)
}

/**
 *
 * @param {String} email : email string
 * @returns true if matches the format false otherwise
 */
export const isValidEmail = (email) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailPattern.test(email)
}
