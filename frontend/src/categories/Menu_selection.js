import React from 'react';
import {Link, withRouter} from "react-router-dom";


export const slideData = [
  {
    index: 0,
    headline: "Logement",
    button: 'Détails',
    src: 'https://www.villanovo.fr/images/landing_pages/landing_26_40_1507725110.1920.jpg'
  },
  {
    index: 1,
    headline: 'Activités Touristiques',
    button: 'Détails',
    src: 'https://maximumwallhd.com/wp-content/uploads/2015/07/fonds-ecran-mont-fuji-3.jpg'
  },
  {
    index: 2,
    headline: 'Restauration',
    button: 'Détails',
    src: 'https://mo-zil-moris.com/wp-content/uploads/2019/12/la-citronnelle.jpg'
  },

]





  // =========================
  // Slide
  // =========================

  class Slide extends React.Component {
    constructor(props) {
      super(props)

      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.handleSlideClick = this.handleSlideClick.bind(this)
      this.imageLoaded = this.imageLoaded.bind(this)
      this.slide = React.createRef()
    }

    

    handleMouseMove(event) {
      const el = this.slide.current
      const r = el.getBoundingClientRect()

      el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
      el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }

    handleMouseLeave(event) {
      this.slide.current.style.setProperty('--x', 0)
      this.slide.current.style.setProperty('--y', 0)
    }

    handleSlideClick(event) {
      this.props.handleSlideClick(this.props.slide.index)
      
    }

    imageLoaded(event) {
      event.target.style.opacity = 1
    }

    render() {
      
        const {src, button, headline, index} = this.props.slide
        const current = this.props.current
        const location = this.props.location
        let classNames = 'slide'
        const country = location.pathname.split('/').pop();
     
        if (current === index) classNames += ' slide--current'
        else if (current - 1 === index) classNames += ' slide--previous'
        else if (current + 1 === index) classNames += ' slide--next'

        return (
            <li
                ref={this.slide}
                className={classNames}
                onClick={this.handleSlideClick}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="slide__image-wrapper">
                    <img
                        className="slide__image"
                        alt={headline}
                        src={src}
                        onLoad={this.imageLoaded}
                    />
                </div>

                <article className="slide__content">
                    <h2 className="slide__headline">{headline}</h2>
                    <Link to={{
                        pathname: "/recommandations",
                        state: {
                            country: country,
                            id: index+1
                        }
                    }}>
                        <button className="slide__action btn">{button}</button>
                    </Link>
                </article>
            </li>
        )
    }
  }


  // =========================
  // Slider control
  // =========================

  const SliderControl = ({ type, title, handleClick }) => {
    return (
      <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    )
  }


  // =========================
  // Slider
  // =========================

  class Slider extends React.Component {
    constructor(props) {
      super(props)

      this.state = { current: 0 }
      this.handlePreviousClick = this.handlePreviousClick.bind(this)
      this.handleNextClick = this.handleNextClick.bind(this)
      this.handleSlideClick = this.handleSlideClick.bind(this)

    }

    handlePreviousClick() {
      const previous = this.state.current - 1

      this.setState({
        current: (previous < 0)
          ? slideData.length - 1
          : previous
      })
    }

    handleNextClick() {
      const next = this.state.current + 1;

      this.setState({
        current: (next === slideData.length)
          ? 0
          : next
      })
    }

    handleSlideClick(index) {
      if (this.state.current !== index) {
        this.setState({
          current: index
        })
      }
    }

    render() {
      const { router, params, location, routes } = this.props
      const { current, direction } = this.state
      const {heading} = this.props
      const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
      const wrapperTransform = {
        'transform': `translateX(-${current * (100 / slideData.length)}%)`
      }

      return (
        <div className='slider' aria-labelledby={headingId}>
          <ul className="slider__wrapper" style={wrapperTransform}>
            <h3 id={headingId} class="visuallyhidden">{heading}</h3>

            {slideData.map(slide => {
              return (
                <Slide
                  key={slide.index}
                  slide={slide}
                  current={current}
                  location={location}
                  handleSlideClick={this.handleSlideClick}
                />
              )
            })}
          </ul>

          <div className="slider__controls">
            <SliderControl
              type="previous"
              title="Go to previous slide"
              handleClick={this.handlePreviousClick}
            />

            <SliderControl
              type="next"
              title="Go to next slide"
              handleClick={this.handleNextClick}
            />
          </div>
        </div>
      )
    }
  }


//ReactDOM.render(<Slider heading="Example Slider" slides={slideData} />, document.getElementById('app'));
export default withRouter(Slider);
