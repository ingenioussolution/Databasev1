import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { defaultColumns } from '../../../../utils/dataModels/PhoneListDataModel'
import { createRows } from '../../../../utils/dataModels/PhoneListDataModel.js'
import { listPhoneClean } from '../../../../actions/phoneListCleanActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../Loader/Loader'
import Message from '../../../message/Message'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import axios from 'axios'

import { forwardRef } from 'react';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const DataTablePhones = () => {
  const dispatch = useDispatch()
  

  const listPhone = useSelector((state) => state.listPhoneClean)
  const { loading, error, listPhones, page, pages } = listPhone

  console.log('listPhones', listPhones)
  console.log('page', page)
  console.log('defaultColumns', defaultColumns)

  const [pagination, setPagination] = useState(page)

  useEffect(() => {
    document.title = 'Data Base List | Ingenious Solution Group'
   // dispatch(listPhoneClean(pagination))
  }, [dispatch])

  const data = (query) =>(
    new Promise((resolve, reject) => {
      let url = '/phoneslist?';
      url += "&page=" + (query.page + 1);
      console.log("url",url);
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve({
            data: result.data,
            page: result.page - 1,
            totalCount: result.totalPages,
          });
        });
    }));

  return (
    <div>
      {listPhones ? (
        <MaterialTable
          title="List Phones"
          columns={defaultColumns}
          icons={tableIcons}
          options={{ exportButton: true,selection: true,filtering: true,sorting: true,search: true}}
          data={data}
        />
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default DataTablePhones
