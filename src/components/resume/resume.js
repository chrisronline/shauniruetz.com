import React, { PureComponent } from 'react'
import classnames from 'classnames'

if (process.env.BROWSER) {
  require('./resume.scss')
}

const LITTLE_THEATRE_ROCKIES = 'Little Theatre of the Rockies'
const UNC = 'Univ. of Northern Colorado'

const images = [
  { id: 1, caption: 'Rose in Dogfight' },
  { id: 2, caption: 'Aida Dance Captain' },
  { id: 3, caption: 'Little Shop of Horrors' },
  { id: 4, caption: 'Once in a Lifetime' },
  { id: 5, caption: 'Beared Lady' },
  { id: 6, caption: 'The Imaginary A New Musical Concept Album' },
  { id: 7, caption: 'Intro To Show Biz Workshop' },
  { id: 8, caption: 'New York\s Got Talent - Season 2' },
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

function DefaultResumeSection({ title, list }) {
  return (
    <article className="resume-section">
      <ResumeSectionHeader title={title}/>
      <ResumeList list={list}/>
    </article>
  )
}

class Resume extends PureComponent {
  render() {
    const imageList = []
    for (let i = 0; i < images.length; i += 2) {
      imageList.push([images[i], images[i+1]])
    }

    return (
      <section className="page page-resume">
        <a className="resume-download" href="/assets/resume.pdf">Download Resume</a>
        <section className="resume">
          <section className="actual-resume">
            <div className="resume-top">
              <div className="resume-top-left">
                <h4>Shauni Ruetz</h4>
                <p className="resume-top-section">Height: 5'4"</p>
                <p className="resume-top-section">Voice Type: Alto, Mezzo, High Belt</p>
              </div>
              <div className="resume-top-right">
                <img className="bbr-logo responsive-img" src="/assets/images/bbr_logo.png"/>
                <p className="resume-top-section">Brady, Brannon &amp; Rich</p>
                <p className="resume-top-section">323.852.9559</p>
                <p className="resume-top-section">Bi-Coastal Theatrical/Legit</p>
                <p className="resume-top-section">Jodie Bowman &amp; Alisa Taylor</p>
              </div>
            </div>
            <DefaultResumeSection title="Regional Theatre"
              list={[
                ['Dogfight', 'Rose', LITTLE_THEATRE_ROCKIES],
                ['Aida', 'Dance Captain/Ensemble', LITTLE_THEATRE_ROCKIES],
                ['Little Shop of Horrors', 'Crystal', LITTLE_THEATRE_ROCKIES]
              ]} />
            <DefaultResumeSection title="Educational Theatre"
              list={[
                ['Once in a Lifetime', 'Tapper/Dance Captain', UNC],
                ['Side Show', 'The Bearded Lady', UNC],
                ['Oklahoma', 'Gertie Cummings/US Aunt Eller', UNC],
                ['Legally Blonde', 'Delta Nu', UNC],
                ['Mirada’s Nightmare', 'Dancer', UNC]
              ]} />
            <DefaultResumeSection title="Workshops"
              list={[
                ['Wings of Fire', 'Emma', 'Staged Reading (NY/DC)'],
                ['The Imaginary A New Musical', 'Lizzie', 'Original Concept Release Album'],
                ['The Imaginary A New Musical', 'Lizzie', 'Reading'],
                ['Intro to Showbiz', 'Instructor', 'School of Diplomacy']
              ]} />
            <DefaultResumeSection title="Performances"
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
          </section>
          <section className="resume-image-section">
            {imageList.map((images, idx) => {
              var lis = images.map(({ url, caption, id }, _idx) => {
                const classes = classnames('resume-image-list-item', `resume-image-${id}`)
                return (
                  <li className={classes} key={_idx}>
                    <h4 className="resume-image-caption">{caption}</h4>
                  </li>
                )
              })

              return (
                <ol className="resume-image-list" key={idx}>
                  {lis}
                </ol>
              )
            })}
          </section>
        </section>
      </section>
    )
  }
}

export default Resume
