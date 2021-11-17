import React from 'react'
import MaterialTable from 'material-table'
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

import { useDispatch, useSelector } from 'react-redux'
import {
  UpdateBadAreaCode,
  registerBadAreaCode,
  deleteBadAreaCode,
} from '../../actions/badAreaCodeAction'

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

const Table = ({
  columns,
  title,
  data,
  filter,
  selection,
  paging,
  editable,
}) => {
  const dispatch = useDispatch()

  const listBadArea = useSelector((state) => state.listBadArea)
  const { badArea } = listBadArea

  const updateBadArea = useSelector((state) => state.updateBadArea)
  const { loading, error, success } = updateBadArea

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleRowUpdate = (newData, oldData, resolve) => {
    console.log(newData)
    if (
      newData.nameState !== oldData.nameState ||
      newData.state !== oldData.state ||
      newData.areaCode !== oldData.areaCode
    ) {
      console.log('data change!!!!!')
      setTimeout(() => {
        dispatch(UpdateBadAreaCode(newData))

        resolve()
      }, 1000)
    } else {
      console.log('data no change')
      resolve()
    }
  }


  const handleRowDelete = (oldData, resolve) =>{
    setTimeout(() => {

      dispatch(deleteBadAreaCode(oldData._id))

      resolve()
    }, 1000)
  }

  const handleRowAdd = (newData, resolve) =>{
    setTimeout(() => {

      dispatch(registerBadAreaCode(newData))

      resolve()
    }, 1000)
  }

  return (
    <div>
      <MaterialTable
        style={{ padding: '20px' }}
        title={title}
        columns={columns}
        icons={tableIcons}
        filtering={filter}
        options={{
          exportButton: true,
          paging: { paging },
          pageSize: 10,
          selection: selection,
          padding: 'default',
          pageSizeOptions: [5, 10, 20],
        }}
        data={data}
        editable={
          editable === 'never'
            ? 'never'
            : {
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve)
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }
        }
      />
    </div>
  )
}

export default Table
