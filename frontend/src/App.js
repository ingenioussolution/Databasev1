import './App.css'
import PhonesUp from './component/PhonesUp/PhoneUp'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PhonesUp} />
      </Switch>
    </Router>
  )
}

export default withRouter(App)
