import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2/src/sweetalert2.js'
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core'
//import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../../DataTable/DataTable'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { listPhoneClean } from '../../../../actions/phoneListCleanActions.js'


import useStyles from './styles'

const CleanList = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const clearFilters = {}
    const listPhoneClean = useSelector((state) => state.listPhoneClean)
    const {
    loading: loadingListClean,
    error: errorListClean,
    phoneClean,
  } = listPhoneClean

  const [filterState, setFilterState] = useState(clearFilters)

  return (
    <div>
      <h1>New Window</h1>
    </div>
  )
}

export default CleanList
