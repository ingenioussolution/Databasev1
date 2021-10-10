import { createTheme } from '@material-ui/core/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#f79623',
      light: '',
      dark: '#000000',
      text: '#888888',
      bgLight: '#ffffff',
      lineLight: '#cfcfcf',
    },
    secondary: {
      main: '#f03c6b',
      light: '',
      dark: '',
      text: '#7ccc4b',
      lineLight: '',
      bgLight: '#f9f9f9',
    },
    default: {
      main: '#ffffff',
      hover: '',
      dark: '#393939',
      text: '',
      logoBg: '',
    },
    dashboard: {
      main: '#5e35b1',
      mainLight: '#e3f2fd',
      light: '#ffffff',
      dark: '#000000',
      text: '#ede7f6',
      bgLight: '#ede7f6',
      successLight: '#b9f6ca',
      errorLight: '#ef9a9a',
      orangeLight: '#fbe9e7',
      warningLight: '#fff8e1',
      grey50: '#fafafa',
      primary: '#2196f3',
      secondary: '#673ab7',
      success: '#00c853',
      error: '#f44336',
      warning: '#ffc107',
      alertConfirm: '#f03c6b',
      alertCancel: '#f79623',
    },
    boxShadow: '0px -3px 5px 0px #fde6ee',
    boxShadowDown: '1px 7px 7px 0px #ffd2e2',
    boxShadowCard: '-1px 8px 16px 0px #fde6ee',
  },
  font: {
    primary: '"Dosis", sans-serif',
    secondary: '"Playfair Display", serif',
  },
  spacing: (factor) => `${0.5 * factor}vw`,
})

export default customTheme
