import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Features.module.css";
import { GetAllTopTutor } from "../../../../api/TopTutorApi";
const baseUrl = import.meta.env.VITE_API_HOST;


const Features = () => {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAllTopTutor();
      if (result.error) {
        setError(result.error);
      } else {
        setFeatures(result.data);
      }
    };

    fetchData();
  }, []);

  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`${styles.featuresWrapper} center`}>
      <div className={styles.featuresHeading}>
        <h1 style={{ fontFamily: 'cursive', color: '#E81C4B' }}>CÁC GIA SƯ TIÊU BIỂU ĐƯỢC ĐƯỢC PHỤ HUYNH TIN TƯỞNG</h1>
      </div>
      <div className={`${styles.featuresListWrapper}`}>
        <Slider {...settings} className={`${styles.featuresList}`} ref={sliderRef}>
          {features.map((feature, index) => (
              <div key={index} className={`container ${styles.swiper}`}>
                <div className={`swiper-wrapper ${styles.content}`}>
                  <div className={`swiper-slide ${styles.card}`}>
                    <div className={styles.cardContent}>
                      <div className={styles.image}>
                      
                        <img src={`${baseUrl}/api/Auth/user-image?fileName=${feature.userImage}`} />
                      </div>
                      <div className={styles.cardBody}>
                        <h5 className="card-title" style={{textAlign: 'center', fontSize: '18px', fontWeight: '600'}}>{feature.fullname}</h5>
                        <div style={{display: 'flex', marginTop: '10px'}}>
                          <p>Môn dạy:</p>
                          {/* <p className="card-text" style={{color: '#0000FF', marginLeft: '5px', marginTop: '5px', fontWeight: 'bold'}}>{feature.subject || 'Chưa cập nhật'}</p> */}
                        </div>
                        {/* <p className="card-text" style={{ fontWeight: '600', marginTop: '15px'}}>{feature.description || 'Chưa có mô tả'}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
