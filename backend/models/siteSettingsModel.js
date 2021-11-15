import mongoose from 'mongoose'

const siteSettingsSchema = mongoose.Schema(
  {    
    siteUnderMaintenance: Boolean,
    talentResponseDuration: Number,
    siteCommission: Number,
    talentAcceptanceTimeLimit: Number,
    maximumVideoUploadSize: Number,
    facebookLink: String,
    twitterLink: String,
    linkedInLink : String,
    instagramLink: String,
  },
  {
    timestamps: true,
  }
)

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema)

export default SiteSettings
