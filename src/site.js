import React, { Component } from 'react'
import classnames from 'classnames'
import { Router, Route } from 'react-enroute'
import App from './app'
import Home from './components/home/home'
import Bio from './components/bio/bio'
import Resume from './components/resume/resume'
import Media from './components/media/media'
import Headshots from './components/headshots/headshots'
import Contact from './components/contact/contact'

const bodyClasses = [
  'home-bg',
  'bio-bg',
  'resume-bg',
  'media-bg',
  'headshots-bg',
  'contact-bg'
]

if (process.env.BROWSER) {
  require('./style.scss')
}

function AttachRoute(site, component) {
  return ({ children }) => {
    return React.createElement(component, { site }, children)
  }
}

function updateBodyClass(page) {
  bodyClasses.forEach(cls => document.body.classList.remove(cls))
  document.body.classList.add(page + '-bg')
}

if (process.env.BROWSER) {
  updateBodyClass(window.location.pathname.substring(1))
  window.addEventListener('NAVIGATED', ({ detail }) => updateBodyClass(detail))
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
      } else {
        this.setTitle(window.location.pathname)
      }
    }
  }

  setTitle(path) {
    let title = path.substr(1)
    title = title[0].toUpperCase() + title.substr(1)
    document.title = `Shauni Ruetz - ${title}`
  }

  navigate(path) {
    if (process.env.BROWSER) {
      history.pushState(null, '', path)
      this.setTitle(path)
      window.dispatchEvent(new CustomEvent('NAVIGATED', { detail: path.substr(1) }))
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
          <Route path="headshots" component={Headshots}/>
          <Route path="contact" component={Contact}/>
          <Route path="home" component={Home}/>
        </Route>
      </Router>
    )
  }
}

export default Site
