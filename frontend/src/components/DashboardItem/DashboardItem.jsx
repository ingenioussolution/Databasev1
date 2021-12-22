import React from 'react'

import { Card, CardContent, Grid , Tooltip} from '@material-ui/core'
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
  action,
  tooltip,
  to,
}) => {
  const classes = useStyles()

  return (
    <Link to={to || '#'} onClick={action}>
    <Tooltip title={tooltip} aria-label="message">
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
                {value === 'NaN' ? 0 : value}
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
      </Tooltip>
    </Link>
  )
}

export default DashboardItem
