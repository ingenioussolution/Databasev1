import asyncHandler from 'express-async-handler'
import SiteSettings from '../models/siteSettingsModel.js'

// @desc     Get settings
// @route    GET /settings
// @access   Private
export const getSettings = asyncHandler(async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOne({})
    if (settings) res.json(settings)
  } catch (error) {
    next(error)
  }
})

// @desc     Update settings
// @route    PUT /settings/:id
// @access   Private/Admin
export const updateSettings = asyncHandler(async (req, res, next) => { 
  try {
    const {
      siteUnderMaintenance,
      talentResponseDuration,
      siteCommission,
      talentAcceptanceTimeLimit,
      maximumVideoUploadSize,
      facebookLink,
      twitterLink,
      linkedInLink,
      instagramLink,
    } = req.body
    const settings = await SiteSettings.findById(req.params.id)

    if (settings) {
      settings.siteCommission = siteCommission || settings.siteCommission

      settings.siteUnderMaintenance = siteUnderMaintenance
        ? siteUnderMaintenance
        : siteUnderMaintenance === false
        ? false
        : settings.siteUnderMaintenance
      settings.talentResponseDuration = talentResponseDuration
        ? talentResponseDuration
        : talentResponseDuration === ''
        ? undefined
        : settings.talentResponseDuration
      settings.talentAcceptanceTimeLimit = talentAcceptanceTimeLimit
        ? talentAcceptanceTimeLimit
        : talentAcceptanceTimeLimit === ''
        ? undefined
        : settings.talentAcceptanceTimeLimit
      settings.maximumVideoUploadSize = maximumVideoUploadSize
        ? maximumVideoUploadSize
        : maximumVideoUploadSize === ''
        ? undefined
        : settings.maximumVideoUploadSize
      settings.facebookLink = facebookLink
        ? facebookLink
        : facebookLink === ''
        ? undefined
        : settings.facebookLink
      settings.twitterLink = twitterLink
        ? twitterLink
        : twitterLink === ''
        ? undefined
        : settings.twitterLink
      settings.linkedInLink = linkedInLink
        ? linkedInLink
        : linkedInLink === ''
        ? undefined
        : settings.linkedInLink
      settings.instagramLink = instagramLink
        ? instagramLink
        : instagramLink === ''
        ? undefined
        : settings.instagramLink      

      const updatedSettings = await settings.save()

      res.json({
        _id: updatedSettings._id,
        adminName: updatedSettings.adminName,
        adminEmail: updatedSettings.adminEmail,
        adminPhone: updatedSettings.adminPhone,
        siteUnderMaintenance: updatedSettings.siteUnderMaintenance,
        talentResponseDuration: updatedSettings.talentResponseDuration,
        siteCommission: updatedSettings.siteCommission,
        talentAcceptanceTimeLimit: updatedSettings.talentAcceptanceTimeLimit,
        maximumVideoUploadSize: updatedSettings.maximumVideoUploadSize,
        facebookLink: updatedSettings.facebookLink,
        twitterLink: updatedSettings.twitterLink,
        linkedInLink: updatedSettings.linkedInLink,
        instagramLink: updatedSettings.instagramLink,        
      })
    } else {
      res.status(404)
      throw new Error('Talent settings not found')
    }
  } catch (error) {
    next(error)
  }
})

export const getEmailJsService = asyncHandler(async (req, res, next) => {
  res.json(process.env.EMAILJS_SERVICE)
})