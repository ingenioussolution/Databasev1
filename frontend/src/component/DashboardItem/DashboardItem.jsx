import React from 'react'

import { Card, CardContent, Grid } from '@material-ui/core'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import useStyles from './styles'
const DashboardItem = ({
  title,
  icon,
  value,
  detailColor,
  bgColor,
  isFaIcon,
  to,
}) => {
  const classes = useStyles()

  return (
    <Link to={to || '#'}>
      <Card variant='outlined' className={clsx(classes.card, classes[bgColor])}>
        <CardContent className={clsx('dashboard-item-content', classes.content)}>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            className={classes[detailColor]}
          >
            <Grid item>
              <h5 className={clsx(classes.dataValue, classes[detailColor])}>
                {value}
              </h5>
            </Grid>
            <Grid item className={isFaIcon ? classes.faIcon : ''}>
              {icon}
            </Grid>
          </Grid>
          <Grid className={`${classes[detailColor]} ${classes.titleWrapper}`}>
            <h6>{title}</h6>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default DashboardItem
