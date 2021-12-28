import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
} from '@material-ui/core'

import {
  FaUserFriends,
  FaEnvelope,
  FaLock,
  FaRegClock,
  FaCheckSquare,
  FaBroadcastTower,
  FaPhoneSlash,
} from 'react-icons/fa'
import {
  getCountClicker,
  getCountConverter,
  getCountCCC,
  getCountBadState,
  getCountHardBounce,
  getCountSuppressed,
  getCountVerizon,
  getCountAtt,
  getCountSprint,
  getCountTMobile,
  getCountUsCellular,
  // getMasterVerizon,
  // getMasterAtt,
  // getMasterSprint,
  // getMasterTMobile
} from '../../../../actions/homeFilterActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DashboardItem from '../../../DashboardItem/DashboardItem'
import Message from '../../../DashboardItem/DashboardItem'
import Loader from '../../../Loader/Loader'
import Swal from 'sweetalert2'

const DashboardHome = () => {
  //const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin

  const CountClicker = useSelector((state) => state.CountClicker)
  const { loading: loadingClicker, clicker } = CountClicker

  const countConverter = useSelector((state) => state.CountConverter)
  const { loading: loadingConverter, converter } = countConverter

  const CountCCC = useSelector((state) => state.CountCCC)
  const { loading: loadingCCC, ccc } = CountCCC

  const CountBadStates = useSelector((state) => state.CountBadStates)
  const { loading: loadingBadState, badState } = CountBadStates

  const CountHardBounce = useSelector((state) => state.CountHardBounce)
  const { loading: loadingHardBounce, hardBounce } = CountHardBounce

  const CountSupressed = useSelector((state) => state.CountSupressed)
  const { loading: loadingSuppressed, suppressed } = CountSupressed

  const CountVerizon = useSelector((state) => state.CountVerizon)
  const { loading: loadingVerizon, verizon } = CountVerizon

  const CountAtt = useSelector((state) => state.CountAtt)
  const { loading: loadingAtt, att } = CountAtt

  const CountSprint = useSelector((state) => state.CountSprint)
  const { loading: loadingSprint, sprint } = CountSprint

  const CountTMobile = useSelector((state) => state.CountTMobile)
  const { loading: loadingTMobile, tMobile } = CountTMobile

  const CountUsCellular = useSelector((state) => state.CountUsCellular)
  const { loading: loadingUsCellular, usCellular } = CountUsCellular


  // Master CCC 


  // const MasterVerizon = useSelector((state) => state.MasterCCCVerizon)
  // const { loading: loadingMasterVerizon, masterVerizon } = MasterVerizon

  // const MasterAtt = useSelector((state) => state.MasterCCCAtt)
  // const { loading: loadingMasterAtt, masterAtt } = MasterAtt

  // const MasterSprint = useSelector((state) => state.MasterCCCSprint)
  // const { loading: loadingMasterSprint, masterSprint } = MasterSprint

  // const MasterTMobile = useSelector((state) => state.MasterCCC_T_Mobile)
  // const { loading: loadingMasterTMobile, masterTMobile } = MasterTMobile


  useEffect(() => {
    document.title = 'Dashboard Home | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      Swal.fire('Attention', 'Please login', 'warning')
      history.push('/')
      return
    }
  }, [history, userInfo])

  return (
    <Grid container justifyContent="space-around" spacing={3}>
      <Snackbar
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Message severity="error"></Message>
      </Snackbar>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={'Filters'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                {!loadingBadState ? (
                  <DashboardItem
                    title={'Bad State'}
                    icon={<FaLock />}
                    detailColor="colorLight"
                    bgColor="green"
                    value={Intl.NumberFormat().format(badState)}
                    action={() => dispatch(getCountBadState())}
                    to="#"
                    tooltip={'Please click here, search value'}
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {!loadingCCC ? (
                  <DashboardItem
                    title={'MaterCCC'}
                    icon={<FaUserFriends />}
                    detailColor="colorLight"
                    bgColor="red"
                    value={Intl.NumberFormat().format(ccc)}
                    action={() => dispatch(getCountCCC())}
                    to="#"
                    tooltip={'Please click here, search value'}
                  />
                ) : (
                  <Loader />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {!loadingSuppressed ? (
                  <DashboardItem
                    title={'Suppressed'}
                    icon={<FaCheckSquare />}
                    detailColor="colorLight"
                    bgColor="green"
                    value={Intl.NumberFormat().format(suppressed)}
                    action={() => dispatch(getCountSuppressed())}
                    to="#"
                    tooltip={'Please click here, search value'}
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={'Results'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                {!loadingClicker ? (
                  <DashboardItem
                    title={'Clicker'}
                    icon={<FaEnvelope />}
                    value={Intl.NumberFormat().format(clicker)}
                    detailColor="colorLight"
                    bgColor="blue"
                    action={() => dispatch(getCountClicker())}
                    to="#"
                    tooltip={'Please click here, search value'}
                  />
                ) : (
                  <Loader />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {!loadingHardBounce ? (
                  <DashboardItem
                    title={'Hard Bounce'}
                    icon={<FaPhoneSlash />}
                    detailColor="colorLight"
                    bgColor="red"
                    value={Intl.NumberFormat().format(hardBounce)}
                    action={() => dispatch(getCountHardBounce())}
                    tooltip={'Please click here, search value'}
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {!loadingConverter ? (
                  <DashboardItem
                    title={'Converter'}
                    icon={<FaRegClock />}
                    detailColor="colorLight"
                    bgColor="orange"
                    value={Intl.NumberFormat().format(converter)}
                    action={() => dispatch(getCountConverter())}
                    to="#"
                    tooltip={'Please click here, for search value'}
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title={'Carriers'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingVerizon ? (
                  <DashboardItem
                    title={'Verizon'}
                    icon={<FaBroadcastTower />}
                    detailColor="colorLight"
                    bgColor="green"
                    value={Intl.NumberFormat().format(verizon)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getCountVerizon())}
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingTMobile ? (
                  <DashboardItem
                    title={'T-Mobile'}
                    icon={<FaBroadcastTower />}
                    detailColor="colorLight"
                    bgColor="red"
                    value={Intl.NumberFormat().format(tMobile)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getCountTMobile())}
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                {!loadingSprint ? (
                  <DashboardItem
                    title={'Sprint'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(sprint)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getCountSprint())}
                    detailColor="colorLight"
                    bgColor="orange"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingAtt ? (
                  <DashboardItem
                    title={'AT&T'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(att)}
                    action={() => dispatch(getCountAtt())}
                    tooltip={'Please click here, for search value'}
                    detailColor="colorLight"
                    bgColor="blue"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingUsCellular ? (
                  <DashboardItem
                    title={'US Cellular'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(usCellular)}
                    action={() => dispatch(getCountUsCellular())}
                    tooltip={'Please click here, for search value'}
                    detailColor="colorLight"
                    bgColor="dark"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
     {/* <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title={'Master CCC by Carrier'} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingMasterVerizon ? (
                  <DashboardItem
                    title={'Verizon'}
                    icon={<FaBroadcastTower />}
                    detailColor="colorLight"
                    bgColor="green"
                    value={Intl.NumberFormat().format(masterVerizon)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getMasterVerizon())}
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingMasterTMobile ? (
                  <DashboardItem
                    title={'T-Mobile'}
                    icon={<FaBroadcastTower />}
                    detailColor="colorLight"
                    bgColor="red"
                    value={Intl.NumberFormat().format(masterTMobile)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getMasterTMobile())}
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                {!loadingMasterSprint ? (
                  <DashboardItem
                    title={'Sprint'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(masterSprint)}
                    tooltip={'Please click here, for search value'}
                    action={() => dispatch(getMasterSprint())}
                    detailColor="colorLight"
                    bgColor="orange"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingMasterAtt ? (
                  <DashboardItem
                    title={'AT&T'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(masterAtt)}
                    action={() => dispatch(getMasterAtt())}
                    tooltip={'Please click here, for search value'}
                    detailColor="colorLight"
                    bgColor="blue"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {!loadingUsCellular ? (
                  <DashboardItem
                    title={'US Cellular'}
                    icon={<FaBroadcastTower />}
                    value={Intl.NumberFormat().format(usCellular)}
                    action={() => dispatch(getCountUsCellular())}
                    tooltip={'Please click here, for search value'}
                    detailColor="colorLight"
                    bgColor="dark"
                    to="#"
                  />
                ) : (
                  <Loader />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
                </Grid>*/}
    </Grid>
  )
}

export default DashboardHome
