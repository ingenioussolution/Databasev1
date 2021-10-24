import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { listPhoneClean } from '../../../../actions/phoneListCleanActions'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import useStyles from './styles'

const CleanList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const listPhone = useSelector((state) => state.listPhoneClean)
  const { loading, error, listPhones, page, pages } = listPhone

  // console.log('listPhones', listPhones)
  // console.log('page', page)
  // console.log('pages', pages)

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'
    //dispatch(listPhoneClean())
  }, [dispatch, history])

  return (
    <div>
      <h1> Data List</h1>
    </div>
  )
}

export default CleanList
