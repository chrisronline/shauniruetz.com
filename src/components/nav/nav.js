import React, { Component } from 'react'
import classnames from 'classnames'

if (process.env.BROWSER) {
  require('./nav.scss')
}

function NavLink({ link, onClick, isActive }) {
  const classes = classnames('nav-link', { active: isActive })
  const label = link[0].toUpperCase() + link.substring(1)

  return (
    <a className={classes} href={`/${link}`} onClick={onClick}>
      {label}
    </a>
  )
}

const links = ['home', 'bio', 'resume', 'media', 'headshots', 'contact']

class Nav extends Component {
  propTypes: {
    navigate: React.PropTypes.func,
    toggleMobileNav: React.PropTypes.func,
    site: React.PropTypes.object,
  }

  onClick(link, e) {
    e.preventDefault()
    this.props.navigate(`/${link}`)
  }

  render() {
    const activeRoute = this.props.site.state.location
    const navLinks = links.map((link, key) =>
      <NavLink key={key} link={link} onClick={this.onClick.bind(this, link)}
          isActive={`/${link}` === activeRoute} />
    )

    return (

        <nav className="site-nav">
          <a className="nav-mobile" onClick={this.props.toggleMobileNav}></a>
          {navLinks}
        </nav>
    )
  }
}

export default Nav
