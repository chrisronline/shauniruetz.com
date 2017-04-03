import React, { PureComponent } from 'react'

if (process.env.BROWSER) {
  require('./headshots.scss')
}

class Headshots extends PureComponent {
  render() {
    return (
      <section className="page page-headshots">
        <div className="headshots-list">
          <img className="headshot" src="/assets/images/CHRIS1.png" alt="Shauni Ruetz headshot" />
          <img className="headshot" src="/assets/images/CHRIS2.png" alt="Shauni Ruetz headshot (2)" />
          <img className="headshot" src="/assets/images/CHRIS3.png" alt="Shauni Ruetz headshot (2)" />
        </div>
        <p>
          Picture credit: <a href="http://www.yaninamayphotography.com" target="_blank">www.yaninamayphotography.com</a>
        </p>
      </section>
    )
  }
}

export default Headshots
