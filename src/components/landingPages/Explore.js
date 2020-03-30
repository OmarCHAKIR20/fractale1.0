import React, { useEffect, useRef, useState } from "react";
import "../../App.scss";
import { TimelineLite, TweenMax, Power3 } from "gsap";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import MendelBrot from "../../images/MendelBrot.jpeg";
import MendelBrotO from "../../images/MendelBrotO.jfif";
import ButtonB from "../buttons/ButtonB";

const Explore = props => {
  let app = useRef(null);
  let images = useRef(null);
  let content = useRef(null);
  let tl = new TimelineLite({ delay: 0.9 }); //delai for the entire page to get loaded
  const [lg, setLg] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    // Images Vars
    const img1 = images.firstElementChild; // access the first child[0]
    const img2 = images.lastElementChild; // access tha last child

    //content vars
    const headlineFirst = content.children[0].children[0]; // refers to the header h1
    const headlineSecond = headlineFirst.nextSibling; // first sibling of h1
    const headlineThird = headlineSecond.nextSibling; // 2nd sibling of h1
    const contentP = content.children[1];
    const contentButton = content.children[2];
    const contentBackButton = content.children[3];

    //Remove initial flash , visibility is no more hidden (App.scss)
    TweenMax.to(app, 0, { css: { visibility: "visible" } });

    //Images Animation
    tl.from(img1, 1.2, { y: 1280, ease: Power3.easeOut }, "start") // start to asych animation with the stagger
      .from(
        img1.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      ) //girlImage.firstElementChild its the image itself
      .from(img2, 1.4, { y: 1280, ease: Power3.easeOut }, 0.2)
      .from(
        img2.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      ); //.2 is a delai to make the animation smooth

    //Content Animation
    tl.staggerFrom(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      1,
      {
        y: 44,
        ease: Power3.easeOut,
        delay: 1
      },
      0.15,
      "start"
    ) // async animation with images
      .from(contentP, 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 1.4)
      .from(contentButton, 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 0.5)
      .from(
        contentBackButton,
        1,
        { y: 20, opacity: 0, ease: Power3.easeOut },
        0.5
      );
  }, [tl]);

  return (
    <I18nProvider locale={lg}>
      <div className="hero" ref={el => (app = el)}>
        <div className="container">
          <FormattedMessage id="choose a laguage :" />
          <input
            value="english"
            type="button"
            className="laguage-button"
            onClick={() => {
              setLg(LOCALES.ENGLISH);
            }}
          />
          <input
            value="french"
            type="button"
            className="laguage-button"
            onClick={() => {
              setLg(LOCALES.FRENCH);
            }}
          />
          <input
            value="germany"
            type="button"
            className="laguage-button"
            onClick={() => {
              setLg(LOCALES.GERMAN);
            }}
          />
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-content-inner" ref={el => (content = el)}>
                <h1>
                  <div className="hero-content-line">
                    <div className="hero-content-line-inner">
                      Benoit Mandelbrot
                    </div>
                  </div>
                  <div className="hero-content-line">
                    <div className="hero-content-line-inner">
                      {" "}
                      <FormattedMessage id="Born:November 20, 1924. Poland." />
                    </div>
                  </div>
                  <div className="hero-content-line">
                    <div className="hero-content-line-inner">
                      <FormattedMessage id="Died:October 14, 2010." />
                    </div>
                  </div>
                </h1>

                <p>
                  <FormattedMessage id='Benoit B. Mandelbrot was a Polish-born, French and American mathematician and polymath with broad interests in the practical                                  sciences, especially regarding what he labeled as "the art of roughness" of physical phenomena and "the uncontrolled element in life".' />
                </p>

                <div className="btn-row">
                  <Link exact to="/fractal">
                    <div className="btn-row">
                      <button className="explore-button">
                        {" "}
                        <FormattedMessage id={"Create your own fractal"} />
                      </button>
                    </div>
                  </Link>
                  <br />
                  <ButtonB path="/" language={lg} />
                </div>
              </div>
            </div>
            <div className="hero-images">
              <div ref={el => (images = el)} className="hero-images-inner">
                <div className="hero-image img1">
                  <img src={MendelBrotO} alt="img2" />
                </div>
                <div className="hero-image img2">
                  <img src={MendelBrot} alt="img2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nProvider>
  );
};

export default Explore;
