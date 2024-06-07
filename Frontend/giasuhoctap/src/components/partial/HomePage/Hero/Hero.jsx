import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './Hero.module.css';
import carousel1 from "../../../../../public/img/Carousel1.jpg";
import carousel2 from "../../../../../public/img/Carousel2.jpg";
import carousel3 from "../../../../../public/img/Carousel3.jpg";

const Hero = () => {
  const items = [
    {
      image: carousel1,
      alt: "Image 1",
      caption: "Caption 1",
    },
    {
      image: carousel2,
      alt: "Image 2",
      caption: "Caption 2",
    },
    {
      image: carousel3,
      alt: "Image 3",
      caption: "Caption 3",
    },
  ];

  return (
    <div className={styles.heroWrapper}>
      <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={item.image}
              alt={item.alt}
            />
            {/* <Carousel.Caption className={styles.carouselCaption}>
              <h3>{item.caption}</h3>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
