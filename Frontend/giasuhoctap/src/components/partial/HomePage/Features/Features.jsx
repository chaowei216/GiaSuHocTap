import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { GetAllTopTutor } from "../../../../api/TopTutorApi";
import styles from "./Features.module.css"; // Đảm bảo import CSS module của bạn

const baseUrl = import.meta.env.VITE_API_HOST;

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllTopTutor();
        setFeatures(result.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} color="gold" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStarEmpty} className={styles.emptyStar} />);
    }

    return (
      <div className={styles.ratingStars}>
        {stars.map((star, index) => (
          <span style={{ color: '#ddd' }} key={index}>{star}</span>
        ))}
        <span className={styles.ratingValue}>{rating}</span>
      </div>
    );
  };

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`${styles.featuresWrapper} center`}>
      <div className={styles.featuresHeading}>
        <h1 style={{ fontFamily: 'cursive', color: '#E81C4B' }}>CÁC GIA SƯ TIÊU BIỂU ĐƯỢC PHỤ HUYNH TIN TƯỞNG</h1>
      </div>
      <div className={styles.featuresListWrapper}>
        <Slider {...settings} className={styles.featuresList}>
          {features.map((feature) => (
            <div key={feature.userId} className={`container ${styles.swiper}`}>
              <div className={`swiper-wrapper ${styles.content}`}>
                <div className={`swiper-slide ${styles.card}`}>
                  <div className={styles.cardContent}>
                    <div className={styles.image}>
                      <img src={`${baseUrl}/api/Auth/user-image?fileName=${feature.userImage}`} alt={feature.fullName} />
                    </div>
                    <div className={styles.cardBody}>
                      <h5 className="card-title" style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>{feature.fullName}</h5>
                      <div className={styles.boxItem} style={{ display: 'flex', marginTop: '5px' }}>
                        <p>Lớp dạy:</p>
                        <div className={styles.classList}>
                          {feature.userClasses.map((userClass) => (
                            <div key={userClass.class.classId} className={styles.class}>{userClass.class.className}</div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.boxItem} style={{ display: 'flex' }}>
                        <p>Môn dạy:</p>
                        <div className={styles.courseList}>
                          {feature.userCourses.map((course) => (
                            <div key={course.course.courseId} className={styles.course}>{course.course.courseName}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {renderStars(feature.averageRating)}
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
