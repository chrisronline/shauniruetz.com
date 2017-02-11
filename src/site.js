import React, { Component } from 'react'
import classnames from 'classnames'
import { Router, Route } from 'react-enroute'
import App from './app'
import Home from './components/home/home'
import Bio from './components/bio/bio'
import Resume from './components/resume/resume'
import Media from './components/media/media'

if (process.env.BROWSER) {
  require('./style.scss')
}

function AttachRoute(site, component) {
  return ({ children }) => {
    return React.createElement(component, { site }, children)
  }
}

class Site extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: process.env.BROWSER ? window.location.pathname : '/'
    }
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      window.addEventListener('popstate', e => {
        this.setState({ location: window.location.pathname })
      })
      if (window.location.pathname === '/') {
        this.navigate('/home')
      }
    }
  }

  navigate(path) {
    if (process.env.BROWSER) {
      history.pushState(null, '', path)
      window.dispatchEvent(new CustomEvent('NAVIGATED', { detail: path.substring(1) }))
      this.setState({ location: path })
    }
  }

  render() {
    return (
      <Router location={this.state.location}>
        <Route path="/" component={AttachRoute(this, App)}>
          <Route path="bio" component={Bio}/>
          <Route path="resume" component={Resume}/>
          <Route path="media" component={Media}/>
          <Route path="home" component={Home}/>
        </Route>
      </Router>
    )
  }
}

export default Site
