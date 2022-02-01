import asyncHandler from 'express-async-handler'
import BlackList from '../models/apiBlackListModel.js'
import PhoneList from '../models/phoneslist.js'
import mongoose from 'mongoose'
import axios from 'axios'

// @routes GET /
// @des GET All Api Black List List
// @access  Private/User

export const getApiDataList = asyncHandler(async (req, res, next) => {
  try {
    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1
    const user = req.query.user

    const listTemp = await BlackList.countDocuments({})
    console.log('pageSize', pageSize, Math.ceil(listTemp / pageSize))
    const data = await BlackList.find({user:mongoose.Types.ObjectId(user)})
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    if (data) {
      res.status(200).json({
        data,
        page,
        totalPages: Math.ceil(listTemp / pageSize),
        listTemp,
      })
    } else {
      res.status(404)
      throw new Error('Not items')
    }
  } catch (error) {
    next(error)
  }
})


// @routes POST /clean-bl-api
// @des GET Clean Data Black List API
// @access  Private/User

export const getCleanPhone = asyncHandler(async (req, res, next) => {
  try {
    
    const blackList = await BlackList.find({}, {_id: 0, __v: 0, createdAt: 0, updatedAt: 0})
      .lean()
      .cursor()
    for (
      let phoneNumber = await blackList.next();
      phoneNumber != null;
      phoneNumber = await blackList.next()
    ) {
      const { data } = await axios.get(
        `https://api.blacklistalliance.com/standard/api/v3/Lookup/key/b128a57d1da0fdaea16f8ab95883a5f2/response/json/phone/${phoneNumber.phone}`
      )
      if (data.results === 0) {
        await BlackList.findOneAndUpdate(
          { phone: phoneNumber.phone },
          {
            blackListAlliance: data.results === 0 ? true : false,
            loopUp: true,
            //state: data.carrier.state,
            //carrier: data.carrier.name,
            //city: data.carrier.ratecenter,
          },
          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        )
      } else {
        const resDelete = await BlackList.findOne({ phone: phoneNumber.phone })
        console.log('delete phone:', resDelete.phone)
        await resDelete.remove()
      }
    }
    res.status(200).json({
      message: 'Clean Data Successfully !!!!',
    })
  } catch (error) {
    next(error)
  }
})


// @routes POST /import-bl-api
// @des GET Import Phone List Clean Data
// @access  Private/User

export const ImportApiData = asyncHandler(async (req, res, next) => {
  try {
    let arrayRemove = []
    const cursor = BlackList.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
      .lean()
      .cursor()
    for (
      let phoneCount = await cursor.next();
      phoneCount != null;
      phoneCount = await cursor.next()
    ) {
      console.log('Old: ', phoneCount.phone)
      await PhoneList.findOneAndUpdate(
        { phone: phoneCount.phone },
        phoneCount,
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      )
      await arrayRemove.push(phoneCount.phone)
    } 
    if (arrayRemove) {
      const resDelete = await BlackList.deleteMany({ phone: arrayRemove })
      console.log('deletedCount:', resDelete.deletedCount)
      console.log("Delete !!!");
    }
    res.status(200).json({
      message: 'Import Successfully !!!!',
    })
  } catch (error) {
    next(error)
  }
})