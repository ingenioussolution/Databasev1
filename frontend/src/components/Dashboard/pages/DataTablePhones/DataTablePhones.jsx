import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { useDispatch } from 'react-redux'
import Loader from '../../../Loader/Loader'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {
  PHONE_CLEAN_LIST_REQUEST,
  PHONE_CLEAN_LIST_SUCCESS,
  PHONE_CLEAN_LIST_FAIL,
} from '../../../../constants/phonesListClean'

import { forwardRef } from 'react'
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const DataTablePhones = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const dataPagination = (query) =>
    new Promise((resolve, reject) => {
      let url = '/phoneslist?'

      console.log('query', query)
      //searching
      if (query.search) {
        url += '&q=' + query.search
      }

      //filtering
      if (query.filters.length) {
        const filter = query.filters.map((filter) => {
          return `&${filter.column.field}${filter.operator}${filter.value}`
        })
        url += filter.join('')
      }

      //sorting
      if (query.orderBy) {
        url += '&sort='(query.orderBy.field) + '&order='(query.orderDirection)
      }
      url += '&pageNumber=' + (query.page + 1)
      console.log('URL', url)

      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve({
            data: createRows(result.data),
            page: result.page - 1,
            totalCount: result.totalPages,
          })
          setData(result)
        })
    })

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'

    const listPhoneClean = () => {
      try {
        dispatch({
          type: PHONE_CLEAN_LIST_REQUEST,
        })

        dispatch({
          type: PHONE_CLEAN_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: PHONE_CLEAN_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
    listPhoneClean()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      {data ? (
        <MaterialTable
          style={{ padding: '20px' }}
          title="Ingenious Solution"
          columns={defaultColumns}
          icons={tableIcons}
          
          options={{
            exportButton: true,
            paging: true,
            pageSize: 10,
            selection: true,
            padding: 'default',
            pageSizeOptions: [5, 10],
            filtering: true,
          }}
          data={dataPagination}
        />
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default DataTablePhones
