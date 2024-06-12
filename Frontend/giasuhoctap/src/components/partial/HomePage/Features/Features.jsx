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
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 2",
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 3",
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 4",
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 5",
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
    {
      name: "Hà Thanh Tùng 6",
      description: "Thiết kế bài học phù hợp với trình độ của học sinh, theo dõi và đánh giá tiến bộ của học sinh, cung cấp phản hồi và đề xuất cải thiện.",
      subject: 'Toán, Lý, Hóa',
      image: imgTutor,
    },
  ];

  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 1000,
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
        <h1 style={{fontFamily: 'cursive', color: '#E81C4B'}}>CÁC GIA SƯ TIÊU BIỂU ĐƯỢC ĐƯỢC PHỤ HUYNH TIN TƯỞNG</h1>
      </div>
      <div className={`${styles.featuresListWrapper}`}>
        <Slider {...settings} className={`${styles.featuresList}`} ref={sliderRef}>
          {features.map((feature, index) => (
            <div key={index} className="card" style={{ width: '18rem', marginRight:'10px', marginLeft: '-10px', maxHeight:'500px' }}>
              <img className="card-img-top" style={{width:'70%', marginLeft: '60px'}} src={feature.image} />
              <div className="card-body">
                <h5 className="card-title">{feature.name}</h5>
                <p className="card-text">{feature.subject}</p>
                <p className="card-text" style={{maxHeight: '70px'}}>{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
