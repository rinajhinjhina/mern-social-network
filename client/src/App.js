import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Route exact path="/" component={Landing} />
			<section className="container">
				<Switch>
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</section>
		</Fragment>
	</Router>
)

export default App
