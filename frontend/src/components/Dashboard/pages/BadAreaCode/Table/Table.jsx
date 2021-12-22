import React from 'react'
import MaterialTable from 'material-table'
import TableIcons from '../../../../tableIcons.js'
import PatchedPagination from '../../../../PaginationError'
import { useDispatch } from 'react-redux'
import {
  getAreaCode,
  UpdateBadAreaCode,
  registerBadAreaCode,
  deleteBadAreaCode,
} from '../../../../../actions/badAreaCodeAction'


const Table = ({ columns, data, filter, selection, editable }) => {
  const dispatch = useDispatch()

  const handleRowUpdate = (newData, oldData, resolve) => {
    if (
      newData.nameState !== oldData.nameState ||
      newData.state !== oldData.state ||
      newData.areaCode !== oldData.areaCode
    ) {
      setTimeout(() => {
        dispatch(UpdateBadAreaCode(newData))
        dispatch(getAreaCode())

        resolve()
      }, 1000)
    } else {
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    setTimeout(() => {
      dispatch(deleteBadAreaCode(oldData._id))
      dispatch(getAreaCode())

      resolve()
    }, 1000)
  }

  const handleRowAdd = (newData, resolve) => {
    setTimeout(() => {
      dispatch(registerBadAreaCode(newData))
      dispatch(getAreaCode())

      resolve()
    }, 1000)
  }

  return (
    <div>
      <MaterialTable
        title="Bad Area Code"
        style={{ padding: '20px' }}
        columns={columns}
        icons={TableIcons}
        filtering={filter}
        options={{
          exportButton: true,
          exportAllData: true,
          selection: selection,
          padding: 'default',
          pageSizeOptions: [5, 10, 20],
          search: true,
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
        components={{
          Pagination: PatchedPagination,
        }}
      />
    </div>
  )
}

export default Table
