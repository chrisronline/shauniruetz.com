import React, { Component } from 'react'
import classnames from 'classnames'

import Header from './components/header/header'
import Nav from './components/nav/nav'

class App extends Component {
  propTypes: {
    site: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      showMobileNav: false
    }
  }

  navigate(...args) {
    this.setState({ showMobileNav: false })
    this.props.site.navigate(...args)
  }

  toggleMobileNav() {
    this.setState({ showMobileNav: !this.state.showMobileNav })
  }

  render() {
    const classes = classnames('container', { 'mobile-nav-active': this.state.showMobileNav })
    return (
      <div className={classes}>
        <Header/>
        <Nav
          site={this.props.site}
          navigate={this.navigate.bind(this)}
          toggleMobileNav={this.toggleMobileNav.bind(this)}
          />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
