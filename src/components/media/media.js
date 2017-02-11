import React, { Component } from 'react'
import request from 'superagent'
// import YouTube from 'react-youtube'
import Loading from '../loading/loading'

if (process.env.BROWSER) {
  require('./media.scss')
}

class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    request
      .get('http://localhost/api/?action=media')
      .end((err, response, body) => {
        this.setState({ list: response.body })
      })
  }

  render() {
    const videos = this.state.list.map((video, id) => <YouTubeVideo {...video} key={id}/>)
    return (
      <section className="page page-media">
        {videos.length
          ? videos
          : <Loading enabled="true"/>
        }
      </section>
    )
  }
}

const YouTubeVideo = ({ title, description, resourceId: { videoId } }) => {
  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      showinfo: 0,
      controls: 2,
      modestbranding: 1
    }
  }

  return (
    <article className="video-container">
      <header>
        <h3 className="video-title">{title}</h3>
      </header>
    </article>
  )
}

export default Media
