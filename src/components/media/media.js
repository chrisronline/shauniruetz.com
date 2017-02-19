import React, { PureComponent } from 'react'
import YouTube from 'react-youtube'
import Loading from '../loading/loading'

if (process.env.BROWSER) {
  require('./media.scss')
}

const VideoTag = ({ url }) => {
  return (
    <video className="media-video" controls>
      <source src={url} type="video/mp4" />
    </video>
  )
}

class Media extends PureComponent {
  componentWillUnmount() {
    // Bug with react-lite and react-youtube
    // Need to readd a `vchildren` object manually
    document.querySelectorAll('.page-media iframe').forEach(iframe => iframe.vchildren = [])
  }

  render() {
    return (
      <section className="page page-media">
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Audio</h3>
          </header>
          <h4 className="media-audio-title">I Miss Her</h4>
          <audio className="media-audio" src="/assets/audio/I Miss Her.mp3" controls></audio>
          <h4 className="media-audio-title">Lost in the Brass</h4>
          <audio className="media-audio" src="/assets/audio/Lost in the Brass.mp3" controls></audio>
        </article>
        <article className="media-section jimmy-section">
          <header className="media-header">
            <h3 className="media-heading">Jimmy Awards</h3>
          </header>
          <YouTube id="jimmy-youtube" videoId="T-HC1ijKwkQ" opts={{width: '50%'}} />
        </article>
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Studio</h3>
          </header>
          <YouTube videoId="yHousn2S2PI" opts={{width: '100%'}} />
        </article>
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Vocal</h3>
          </header>
          <VideoTag url="/assets/videos/Vocal Reel.m4v"/>
        </article>
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Dance</h3>
          </header>
          <VideoTag url="/assets/videos/Dance Reel.m4v"/>
        </article>
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Acting</h3>
          </header>
          <VideoTag url="/assets/videos/Acting Reel.m4v"/>
        </article>
        <article className="media-section">
          <header className="media-header">
            <h3 className="media-heading">Choreography</h3>
          </header>
          <VideoTag url="/assets/videos/Choreography Reel.m4v"/>
        </article>
      </section>
    )
  }
}

export default Media
