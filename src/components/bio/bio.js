import React, { PureComponent } from 'react'

if (process.env.BROWSER) {
  require('./bio.scss')
}

class Bio extends PureComponent {
  render() {
    return (
      <section className="page page-bio">
        <article className="bio-list">
          <header>
            <h3 className="bio-heading">Background</h3>
          </header>
          <p className="bio-desc">
            Shauni is from upstate NY, where she found unique opportunities to explore her interest in the arts. She started dancing when she was three years old and soon ventured into singing at sporting events when she was eight.
          </p>
        </article>
        <article>
          <header>
            <h3 className="bio-heading">Off On The Right Foot</h3>
          </header>
          <p className="bio-desc">
            When she entered the 6th grade she was forever enchanted by the world of musical theater. She was involved in a traveling theater group called Act I from 6th grade until her senior year of high school, where she performed at various venues in Rochester.
          </p>
        </article>
        <article>
          <header>
            <h3 className="bio-heading">Star In the Making</h3>
          </header>
          <p className="bio-desc">
            In high school, she started studying with well known coaches in the industry through the Musical Theater College Auditions program (MTCA). In Shauni's senior year of high school, she won the regional Stars of Tomorrow Best Actress award through the <strong>Rochester Broadway Theater League</strong> for her portrayal of the Witch in “Into the Woods”.
          </p>
        </article>
        <article>
          <header>
            <h3 className="bio-heading">National Recognition</h3>
          </header>
          <p className="bio-desc">
            As a result, Shauni competed in New York City at the National High School Musical Theater Awards (NHSMTA), otherwise known in the industry as the 'Jimmy Awards' after James Nederlander. In just her senior year of high school, <strong>Shauni won the 2011 Jimmy Awards and the honorable national title of Best Actress.</strong>
          </p>
        </article>
        <article>
          <header>
            <h3 className="bio-heading">Collegiate Study & Current Events</h3>
          </header>
          <p className="bio-desc">
            Shauni graduated from the University of Northern Colorado with a BA in musical theater and dance minor. After moving to New York City over a year ago, Shauni was seen in a couple staged readings and workshops in NY and DC, NYC’s first Monday Night Live as the musical guest, and she recently finished competing in two vocal competitions which has lead her to start working on her solo shows around the city.
          </p>
        </article>
        <article>
          <header>
            <h3 className="bio-heading">Looking Onward to Stardom</h3>
          </header>
          <p className="bio-desc">
            Shauni's passion is studio recording and musical theater. She loves to be inspired and loves to inspire others through the performing arts. Support and love from her family and dear friends is what carries her through life and inspires her to delve into her future in the arts.
          </p>
        </article>
      </section>
    )
  }
}

export default Bio
