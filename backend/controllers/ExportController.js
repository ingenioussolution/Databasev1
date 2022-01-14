import moment from 'moment'
import fs from 'fs'
import path from 'path'
import { parse } from 'url'
import aws from 'aws-sdk'
import ExportCsv from '../models/ExportCSVModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

const dateTime = moment.utc().format('YYYY-MM-DD-h-mm-ss')
//const dateTime = moment().format('YYYY-MM-DD-h-mm-ss')

let current_user = ''
aws.config = new aws.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  signatureVersion: 'v4', 
})

const s3 = new aws.S3({  
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_BUCKET_REGION,
})

// UPLOAD FILE TO S3
export const uploadExportFile = async (file, user) => {
  const parsed = parse(file)
  console.log("dateTime",dateTime);
  console.log('filename: ', dateTime + path.basename(parsed.pathname))
  const filename = dateTime + path.basename(parsed.pathname)
  const fileStream = fs.createReadStream(file)

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: filename,
    acl:'public-read',
  }
  s3.upload(uploadParams).promise() // this will upload file to S3
  let signedUrl = s3.getSignedUrl('getObject', {
    Key: filename,
    Bucket: process.env.AWS_BUCKET_NAME,
  })
  current_user = user
  registerExport(signedUrl, user, filename)
  return
}

export const registerExport = async (url, user, filename) => {
  try {
    const userItem = user ? await User.findById(user) : undefined
    const newExport = { url }
    newExport.fileName = filename
    newExport.user = userItem
    if (user && !userItem) {
      throw new Error('User not found')
    } else if (userItem !== ' ') {
    }
    const key = ExportCsv.find({fileName:filename})
    if(key){
      await key.deleteOne()
      console.log("remove duplicate");
      await ExportCsv.create(newExport)
    }else {
      await ExportCsv.create(newExport)
    }
    
  } catch (error) {
    throw new Error(error)
  }
}

// DOWNLOAD FILE FROM S3
export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  }
  return s3.getObject(downloadParams).createReadStream()
}

export const getExport = async (req, res, next) => {
  try {
    const userId = req.query.id
    const exportList = await ExportCsv.find({
      user: mongoose.Types.ObjectId(userId),
    },{fileName:1,url:1, createdAt:1, _id: 0 })

    if(!exportList) throw new Error('Csv file not found')
    res.json(exportList)
  } catch (error) {
    next(error)
  }
}
