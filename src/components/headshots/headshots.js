import React, { Component } from 'react'
import Lightbox from 'react-images'

if (process.env.BROWSER) {
  require('./headshots.scss')
}

const images = [
  { src: '/assets/images/CHRIS1.png' },
  { src: '/assets/images/CHRIS2.png' },
  { src: '/assets/images/CHRIS3.png' },
]

class Headshots extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      isOpen: false,
    }
  }

  prev() {
    this.setState({
      currentImage: Math.max(0, this.state.currentImage - 1),
    })
  }

  next() {
    this.setState({
      currentImage: Math.min(images.length - 1, this.state.currentImage + 1),
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      isOpen: false,
    })
  }

  openLightbox(index) {
    this.setState({
      currentImage: index,
      isOpen: true,
    })
  }

  render() {
    const localImages = images.map(({ src }, index) => {
      return (
        <img onClick={this.openLightbox.bind(this, index)}
          className="headshot"
          src={src}
          alt="Shauni Ruetz headshot" />
      )
    })
    return (
      <section className="page page-headshots">
        <div className="headshots-list">
          {localImages}
          <Lightbox
            images={images}
            currentImage={this.state.currentImage}
            isOpen={this.state.isOpen}
            onClickPrev={this.prev.bind(this)}
            onClickNext={this.next.bind(this)}
            onClose={this.closeLightbox.bind(this)}
          />
        </div>
        <p>
          Picture credit: <a href="http://www.yaninamayphotography.com" target="_blank">www.yaninamayphotography.com</a>
        </p>
      </section>
    )
  }
}

export default Headshots
