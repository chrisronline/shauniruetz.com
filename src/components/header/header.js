import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('./header.scss')
}

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <h1 className="site-heading">Shauni Ruetz</h1>
      </header>
    )
  }
}

export default Header
