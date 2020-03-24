import React, { useState, useEffect, useCallback, useRef } from "react";
import Swiper from "swiper";
import "../../common/swiper.min.css";
import "./index.less";
import playerBtn from "./img/playerBtn.png";

const Comp = ({ video = "", images = [] }) => {
  const [playStatus, setPlayStatus] = useState(false);
  const [pics, setPics] = useState([]);
  const slideVideo = useRef(null);
  const pagination = useRef(null);

  const onVideoPlay = useCallback(() => {
    slideVideo.current.play();
    setPlayStatus(true);
  }, []);

  const onVideoPause = useCallback(() => {
    slideVideo.current.pause();
    setPlayStatus(false);
  }, []);

  useEffect(() => {
    if (video) {
      setPics(images.slice(1));
    } else {
      setPics(images);
    }
  }, [images]);

  useEffect(() => {
    if (pics.length > 0) {
      const swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          formatFractionTotal: num => {
            if (video) {
              return num - 1;
            }
            return num;
          },
          formatFractionCurrent: num => {
            if (video) {
              return num - 1;
            }
            return num;
          }
        },
        paginationClickable: true,
        updateOnImagesReady: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 2,
        on: {
          slideChangeTransitionStart: () => {
            onVideoPause();
            const sliderIndex = swiper.activeIndex;
            if (sliderIndex === 0 && video) {
              pagination.current.style.opacity = 0;
            } else {
              pagination.current.style.opacity = 1;
            }
          }
        }
      });
    }
  }, [pics, video, onVideoPause]);

  return (
    <div className="carousel">
      {images.length > 0 ? (
        <div className="swiper-container swiper">
          <div className="swiper-wrapper bsd load-div">
            {video ? (
              <div className="swiper-slide">
                <div className="swiper-slideVideo">
                  <video
                    src={video}
                    ref={slideVideo}
                    poster={images[0].picurl}
                    width="100%"
                    height="311"
                    webkit-playsinline="true"
                    playsInline={true}
                    x5-playsinline="true"
                    // preload=""
                    x-webkit-airplay="true"
                    onClick={onVideoPause}
                  >
                    <source type="video/mp4" src={video} />
                  </video>
                  <div
                    className={`video_btn ${playStatus ? "videoIsPlay" : ""}`}
                    onClick={onVideoPlay}
                  >
                    <img src={playerBtn} alt="" />
                  </div>
                </div>
              </div>
            ) : null}
            {pics.map((cur, idx) => {
              return (
                <div className="swiper-slide" key={`${cur}${idx + 1}`}>
                  <img src={cur.picurl} alt="商品图" />
                </div>
              );
            })}
          </div>
          <div ref={pagination} style={video ? { opacity: 0 } : {}}>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comp;
