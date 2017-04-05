import React, { Component } from 'react'
import ModalVideo from 'react-modal-video'

if (process.env.BROWSER) {
  require('./home.scss')
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  openModal() {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <section className="page page-home">
        <article className="current-events">
          <h2 className="current-events-heading">Current Events</h2>
          <a className="current-events-heading--mobile" href="https://www.youtube.com/watch?v=fn4VctWvhh8" target="_blank">Current Events</a>
          <ModalVideo channel="youtube" isOpen={this.state.isOpen} videoId="fn4VctWvhh8" onClose={() => this.setState({isOpen: false})} />
            <span className="brave-girl-caption" onClick={this.openModal.bind(this)}>
              Click here to watch brave girl!
            </span>
          <img className="brave-girl" onClick={this.openModal.bind(this)} src="/assets/images/brave-girl.jpg" alt="brave girl"/>
        </article>
      </section>
    )
  }
}

export default Home
