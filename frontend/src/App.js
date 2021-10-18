import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import Layout from './component/Dashboard/Layout/Layout'

// <Route path="/" exact component={DashboardLayout} />
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/clean-list" exact component={Layout} />
      </Switch>
    </Router>
  )
}

export default withRouter(App)
