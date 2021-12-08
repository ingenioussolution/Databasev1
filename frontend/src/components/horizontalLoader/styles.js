import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    width: '100%'
  },
}))
