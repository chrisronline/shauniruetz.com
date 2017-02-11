import React, { Component } from 'react'
import Modal from 'react-modal'

if (process.env.BROWSER) {
  require('./home.scss')
}

class NewsItem extends Component {
  openModal() {
    this.setState({})
  }

  render() {
    const { title, date, desc, isOpen, showModal, closeModal } = this.props

    return (
      <li className="news-item">
        <h3 className="news-item-date">{date}</h3>
        <a onClick={showModal} className="news-item-link">
          {title}
        </a>
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modal">
          <header>
            <h3>{title}</h3>
            <h4>{date}</h4>
          </header>
          <p>
            {desc}
          </p>
        </Modal>
      </li>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: null,
      news: [
        {
          id: 1,
          title: 'My dream come true! Elphaba in Wicked!',
          date: '01/02/2017',
          desc: 'I cannot believe it!'
        },
        {
          id: 2,
          title: 'Heading back to Rochester',
          date: '01/13/2017',
          desc: 'Rochester is awesome!'
        }
      ]
    }
  }

  showModal(item) {
    this.setState({ active: item.id })
  }

  closeModal() {
    this.setState({ active: null })
  }

  render() {
    const { news } = this.state

    return (
      <section className="page">
        <header>
          <h2 className="page-heading">Latest News</h2>
        </header>
        <ol className="news">
          {news.map((item, idx) =>
            <NewsItem {...item}
              showModal={this.showModal.bind(this, item)}
              closeModal={this.closeModal.bind(this)}
              isOpen={item.id === this.state.active}
              key={idx}/>
          )}
        </ol>
      </section>
    )
  }
}

export default Home
