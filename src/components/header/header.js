import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('./header.scss')
}

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <h1 className="site-heading">Shauni Ruetz</h1>
        <h2 className="site-subheading">Singer, Dancer, Choreographer</h2>
      </header>
    )
  }
}

export default Header
