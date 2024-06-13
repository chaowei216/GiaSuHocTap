import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Features.module.css";
import imgTutor from "../../../../../public/img/tutor.jpg";

const Features = () => {
  const features = [
    {
      name: "Hà Thanh Tùng 1",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 2",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 3",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 4",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 5",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 6",
      description: "Tôi chỉ qua trung tâm làm việc trực tiếp 1 lần, còn những lần sau đều được gửi lớp qua điện thoại. Cách làm rất hay giúp tôi nhận lớp rất nhanh gọn lẹ.",      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
  ];

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
                        <img src={feature.image} alt="Profile" />
                      </div>
                      <div className={styles.cardBody}>
                        <h5 className="card-title" style={{textAlign: 'center', fontSize: '18px', fontWeight: '600'}}>{feature.name}</h5>
                        <div style={{display: 'flex', marginTop: '10px'}}>
                          <p>Môn dạy:</p>
                          <p className="card-text" style={{color: '#0000FF', marginLeft: '5px', marginTop: '5px', fontWeight: 'bold'}}>{feature.subject}</p>
                        </div>
                        <p className="card-text" style={{ fontWeight: '600', marginTop: '15px'}}>{feature.description}</p>
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








