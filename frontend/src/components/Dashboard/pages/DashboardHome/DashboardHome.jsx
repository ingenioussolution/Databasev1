import React,{useEffect} from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
} from '@material-ui/core'

import {
  FaUserFriends,
  FaTruck,
  FaEnvelope,
  FaExclamationTriangle,
  FaTimesCircle,
  FaRegClock,
  FaCheckSquare,
  FaBroadcastTower,
} from 'react-icons/fa'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DashboardItem from '../../../DashboardItem/DashboardItem'
import Message from '../../../DashboardItem/DashboardItem'

//import useStyles from './styles'

const DashboardHome = () => {
  //const classes = useStyles()

  const history = useHistory()
  const UserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = UserLogin


  useEffect(() => {
    document.title = 'Dashboard Home | Ingenious Solution Group'

    if (userInfo === null || userInfo === undefined) {
      history.push('/')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <DashboardItem
                  title={'Active Mobile'}
                  icon={<FaUserFriends />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={'1000'}
                  to="#"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Status'}
                  icon={<FaUserFriends />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={'1000'}
                  to="#"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Black List'}
                  icon={<FaTruck />}
                  value={'4000'}
                  detailColor="colorLight"
                  bgColor="red"
                  to="#"
                />
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
                <DashboardItem
                  title={'Clicker'}
                  icon={<FaEnvelope />}
                  value={'3500'}
                  detailColor="colorLight"
                  bgColor="blue"
                  to="#"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Risky'}
                  icon={<FaExclamationTriangle />}
                  detailColor="colorLight"
                  bgColor="red"
                  value={'5000'}
                  to="#"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Valid Mobile'}
                  icon={<FaTimesCircle />}
                  detailColor="colorLight"
                  bgColor="dark"
                  value={'2500'}
                  to="#"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Converter'}
                  icon={<FaRegClock />}
                  detailColor="colorLight"
                  bgColor="orange"
                  value={'6000'}
                  to="#"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardItem
                  title={'Revenue'}
                  icon={<FaCheckSquare />}
                  detailColor="colorLight"
                  bgColor="green"
                  value={'3000'}
                  to="#"
                />
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
              <DashboardItem
                title={'Verizon'}
                icon={<FaBroadcastTower />}
                detailColor="colorLight"
                bgColor="green"
                value={'1000'}
                to="#"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <DashboardItem
                title={'T-Mobile'}
                icon={<FaBroadcastTower />}
                detailColor="colorLight"
                bgColor="red"
                value={'1000'}
                to="#"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <DashboardItem
                title={'Sprint'}
                icon={<FaBroadcastTower />}
                value={'4000'}
                detailColor="colorLight"
                bgColor="orange"
                to="#"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <DashboardItem
                title={'AT&T'}
                icon={<FaBroadcastTower />}
                value={'4000'}
                detailColor="colorLight"
                bgColor="blue"
                to="#"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <DashboardItem
                title={'US Cellular'}
                icon={<FaBroadcastTower />}
                value={'4000'}
                detailColor="colorLight"
                bgColor="dark"
                to="#"
              />
            </Grid>
          
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    
    </Grid>
  )
}

export default DashboardHome
