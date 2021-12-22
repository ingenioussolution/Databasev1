import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import useStyles from './styles'

const HorizontalLoader = ({color}) => {
  const classes = useStyles()

  return (
    <LinearProgress
      variant='indeterminate'
      className={classes.bottom}
      color={color || 'secondary'}
      thickness={4}
    />
  )
}

export default HorizontalLoader
