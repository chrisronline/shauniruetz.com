import React, { Component } from 'react'
import classnames from 'classnames'

if (process.env.BROWSER) {
  require('./resume.scss')
  const lightbox = require('react-image-lightbox')
}

const LITTLE_THEATRE_ROCKIES = 'Little Theatre of the Rockies'
const UNC = 'Univ. of Northern Colorado'

const images = [
  '/assets/images/1Dogfight-Rose.jpg',
  '/assets/images/2Aida-Dance Captain.jpg',
  '/assets/images/3Little Shop of Horrors- Crystal9.jpg',
  '/assets/images/4Once in a Lifetime-Tapper_Dance Captain.jpg',
  '/assets/images/5Side Show-Bearded Lady.png',
  '/assets/images/6The Imaginary A New Musical Concept Album-Lizzie.jpg',
  '/assets/images/7Intro To Show Biz Workshop-Instructor.jpg',
  '/assets/images/8New York\'s Got Talent- Season 2! Semi-Finalist.jpg'
]

function ResumeSectionHeader({ title }) {
  return (
    <header className="resume-header">
      <h3 className="resume-header-title">{title}</h3>
    </header>
  )
}

function ResumeList({ list }) {
  const items = list.map((cols, key) => {
    const spans = cols.map((col, idx) => <span>{col}</span>)
    return (
      <li className="resume-list-item">
        {spans}
      </li>
    )
  })

  return (
    <ol className="resume-list">
      {items}
    </ol>
  )
}

function ResumeLightBoxList({ list, triggerMap, trigger }) {
  const triggerCls = 'lightbox-trigger'
  const items = list.map((cols, key) => {
    const classes = classnames('resume-list-item', { [triggerCls]: triggerMap[key] !== undefined })
    const spans = cols.map((col, idx) => <span>{col}</span>)
    return (
      <li className={classes} onClick={() => classes.length > 1 && trigger(triggerMap[key])}>
        {spans}
      </li>
    )
  })

  return (
    <ol className="resume-list">
      {items}
    </ol>
  )
}

function DefaultResumeSection({ title, list }) {
  return (
    <article className="resume-section">
      <ResumeSectionHeader title={title}/>
      <ResumeList list={list}/>
    </article>
  )
}

function LightBoxResumeSection({ title, list, triggerMap, trigger }) {
  return (
    <article className="resume-section">
      <ResumeSectionHeader title={title}/>
      <ResumeLightBoxList list={list} triggerMap={triggerMap} trigger={trigger}/>
    </article>
  )
}

class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lbIndex: 0,
      isLbOpen: false
    }
  }

  trigger(index) {
    this.setState({ isLbOpen: true, lbIndex: index })
  }

  render() {
    const { lbIndex, isLbOpen } = this.state

    return (
      <section className="page page-resume">
        <a className="resume-download" href="/assets/resume.docx">Download Resume</a>
        <div className="resume-top">
          <div className="resume-top-left">
            <h4>Shauni Ruetz</h4>
            <p className="resume-top-section">Height: 5'4"</p>
            <p className="resume-top-section">Voice Type: Alto, Mezzo, High Belt</p>
          </div>
          <div className="resume-top-right">
            <img className="bbr-logo responsive-img" src="assets/images/bbr_logo.png"/>
            <p className="resume-top-section">Brady, Brannon &amp; Rich</p>
            <p className="resume-top-section">323.852.9559</p>
            <p className="resume-top-section">Bi-Coastal Theatrical/Legit</p>
            <p className="resume-top-section">Jodie Bowman &amp; Alisa Taylor</p>
          </div>
        </div>
        <LightBoxResumeSection title="Regional Theatre"
          triggerMap={{
            0: 0,
            1: 1,
            2: 2
          }}
          trigger={this.trigger.bind(this)}
          list={[
            ['Dogfight', 'Rose', LITTLE_THEATRE_ROCKIES],
            ['Aida', 'Dance Captain/Ensemble', LITTLE_THEATRE_ROCKIES],
            ['Little Shop of Horrors', 'Crystal', LITTLE_THEATRE_ROCKIES]
          ]} />
        <LightBoxResumeSection title="Educational Theatre"
          triggerMap={{
            0: 3,
            1: 4,
          }}
          trigger={this.trigger.bind(this)}
          list={[
            ['Once in a Lifetime', 'Tapper/Dance Captain', UNC],
            ['Side Show', 'The Bearded Lady', UNC],
            ['Oklahoma', 'Gertie Cummings/US Aunt Eller', UNC],
            ['Legally Blonde', 'Delta Nu', UNC],
            ['Mirada’s Nightmare', 'Dancer', UNC]
          ]} />
        <LightBoxResumeSection title="Workshops"
          triggerMap={{
            1: 5,
            3: 6
          }}
          trigger={this.trigger.bind(this)}
          list={[
            ['Wings of Fire', 'Emma', 'Staged Reading (NY/DC)'],
            ['The Imaginary A New Musical', 'Lizzie', 'Original Concept Release Album'],
            ['The Imaginary A New Musical', 'Lizzie', 'Reading'],
            ['Intro to Showbiz', 'Instructor', 'School of Diplomacy']
          ]} />
        <LightBoxResumeSection title="Performances"
          triggerMap={{
            0: 7,
          }}
          trigger={this.trigger.bind(this)}
          list={[
            ['New York’s Got Talent: Season 2', 'Semi-Finalist', 'Elektra Theater'],
            ['Monday Night Live', 'Musical Guest', 'Elektra Theater'],
            ['Rising Star Competition 2', 'Finalist', 'Rise Bar']
          ]} />
        <article className="resume-section">
          <ResumeSectionHeader title='Education and Training'/>
          <h4 className="resume-section-subheader">
            Bachelor of Arts in Musical Theatre/Dance Minor at the University of Northern Colorado
          </h4>
          <ol className="resume-list--modified">
            <li className="resume-list-item">
              <div className="resume-list-item--modified">
                <em className="resume-list-item-category">ACTING</em>
                <span className="resume-list-item-sublist">
                  Rhyn McLemore, Matthew Herrick, Tom McNalley, Ken Womble, David Grapes
                </span>
              </div>
            </li>
            <li className="resume-list-item">
              <div className="resume-list-item--modified">
                <em className="resume-list-item-category">VOICE</em>
                <span className="resume-list-item-sublist">
                  Ellen Lettrich, Matthew Herrick, Master class with touring cast of The Drowsy Chaperone
                </span>
              </div>
            </li>
            <li className="resume-list-item">
              <div className="resume-list-item--modified">
                <em className="resume-list-item-category">DANCE</em>
                <ol className="resume-list-item-sublist--modified">
                  <li>19 years Tap, Ballet, Jazz, Hip Hop</li>
                  <li>3 years Choreography: Monte Black, Christy Black</li>
                  <li>5 years Modern/Contemporary</li>
                  <li>2 years ACDA Dance Festival</li>
                </ol>
              </div>
            </li>
          </ol>
          <div className="resume-stacked-item">
            <span className="resume-stacked-item-category">Performance/Audition Workshops</span>
            <span className="resume-stacked-item-list">
              Dave Clemmons, VP Boyle, Deidre Goodwin, Mike Ruckles, Victoria Morris, Michael Donovan, Natalie Weiss
            </span>
          </div>
          <div className="resume-stacked-item">
            <span className="resume-stacked-item-category">Open Jar Insititue</span>
            <span className="resume-stacked-item-list">
              Jeff Whiting, James Grey, Susan Stroman, Bob Cline, other various guests Performance/Audition Workshop, Michael Cassara
            </span>
          </div>
          <ResumeList list={[
            ['2014 Jimmy Award Intern', 'Camp Broadway, NY', 'Van Kaplan'],
            ['2011 Jimmy Award Winner', 'Minskoff Theatre, NY', ''],
            ['2011 Regional Best Actress', 'Rochester Broadway Theatre League', 'Bob Sagan']
          ]} />
        </article>
        <article className="resume-section">
          <ResumeSectionHeader title='Special Skills'/>
          <span className="resume-single-item">Human Spring</span>
        </article>

        {isLbOpen &&
          <Lightbox
            mainSrc={images[lbIndex]}
            nextSrc={images[(lbIndex + 1) % images.length]}
            prevSrc={images[(lbIndex + images.length - 1) % images.length]}

            onCloseRequest={() => this.setState({ isLbOpen: false })}
            onMovePrevRequest={() => this.setState({
              lbIndex: (lbIndex + images.length - 1) % images.length,
            })}
            onMoveNextRequest={() => this.setState({
              lbIndex: (lbIndex + 1) % images.length,
            })}
          />
        }
      </section>
    )
  }
}

export default Resume
