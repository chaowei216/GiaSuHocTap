import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BuyCoin.module.css"; // Create a CSS module for styling
import { Avatar, Button } from "@mui/material";

const BuyCoin = () => {
  const gems = [
    {
      title: "Pocketful of Gems",
      quantity: "80",
      price: "€1.09",
      image: "/img/coin_3.png",
    },
    {
      title: "Pile of Gems",
      quantity: "500",
      price: "€5.49",
      image: "/img/coin_3.png",
    },
    {
      title: "Bag of Gems",
      quantity: "1200",
      price: "€10.99",
      image: "/img/coin_3.png",
    },
    {
      title: "Sack of Gems",
      quantity: "2500",
      price: "€21.99",
      image: "/img/coin_3.png",
    },
    {
      title: "Box of Gems",
      quantity: "6500",
      price: "€54.99",
      image: "/img/coin_3.png",
    },
  ];

  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 1300,
    slidesToShow: 4,
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

  return (
    <div className={styles.gemsSliderWrapper}>
      <div className={styles.sliderHeading}>
        <h1 style={{ color: "#E81C4B", fontSize: "30px" }}>
          List of package coin
        </h1>
      </div>
      <div className={styles.sliderListWrapper}>
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <div>Luu Trieu Nam</div>
        </div>
        <Slider {...settings} className={styles.sliderList} ref={sliderRef}>
          {gems.map((gem, index) => (
            <div key={index} className={`container ${styles.swiper}`}>
              <div className={`swiper-wrapper ${styles.content}`}>
                <div className={`swiper-slide ${styles.card}`}>
                  <div className={styles.cardContent}>
                    <div className={styles.image}>
                      <img src={gem.image} alt={gem.title} />
                    </div>
                    <div className={styles.cardBody}>
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {gem.title}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p>Quantity:</p>
                        <p
                          className="card-text"
                          style={{
                            color: "#0000FF",
                            marginLeft: "5px",
                            marginTop: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {gem.quantity}
                        </p>
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "gray",
                          width: "100px",
                          color: "white",
                        }}
                        className="card-text"
                        style={{ fontWeight: "600", marginTop: "15px" }}
                      >
                        {gem.price}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <div>Payment Method</div>
        <div>Total: $ 0</div>
        <Button>Buy Now</Button>
      </div>
    </div>
  );
};

export default BuyCoin;
