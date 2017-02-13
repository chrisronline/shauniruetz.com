import React, { PureComponent } from 'react'

if (process.env.BROWSER) {
  require('./contact.scss')
}

function updateBodyClass(page) {
  if (page === 'contact') {
    document.body.classList.add('contact-bg')
  } else {
    document.body.classList.remove('contact-bg')
  }
}

if (process.env.BROWSER) {
  updateBodyClass(window.location.pathname.substring(1))
  window.addEventListener('NAVIGATED', ({ detail }) => updateBodyClass(detail))
}

class Contact extends PureComponent {
  render() {
    return (
      <section className="page page-contact">
        <div className="fb-contact">
          <a className="fb-contact-link" target="_blank" href="https://www.facebook.com/profile.php?id=528116600562452&tsid=0.415159170050174&source=typeahead">
            <i className="fb-icon"></i>
            Facebook Page
          </a>
        </div>
        <div className="email-contact">
          <a className="email-contact-link" target="_blank" href="mailto:shauniruetz@gmail.com">
            <i className="email-icon"></i>
            shauniruetz@gmail.com
          </a>
        </div>
      </section>
    )
  }
}

export default Contact
