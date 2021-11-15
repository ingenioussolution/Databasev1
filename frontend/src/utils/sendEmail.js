import * as emailjs from 'emailjs-com'
import { getEmailJsService } from '../actions/siteSettingsActions'

export const FORGOT_PASSWORD_EMAIL_TEMPLATE_ID = 'template_tlj7xbg'
export const RESET_PASSWORD_EMAIL_TEMPLATE_ID = 'template_99jms8l'

export const sendEmail = async (template, params) => {
  const emailJsService = localStorage.getItem('emailJsService')
    ? localStorage.getItem('emailJsService')
    : await getEmailJsService()

  return emailjs.send(
    emailJsService,
    template,
    params,
    'user_01WHZGaJF4ix89o7UBRDg'
  )
}
