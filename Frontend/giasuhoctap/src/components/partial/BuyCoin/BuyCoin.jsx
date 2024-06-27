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
      quantity: "10",
      price: "10.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Pile of Gems",
      quantity: "5",
      price: "5.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Bag of Gems",
      quantity: "20",
      price: "20.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Sack of Gems",
      quantity: "50",
      price: "50.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Box of Gems",
      quantity: "100",
      price: "100.000 VND",
      image: "/img/coin_3.png",
    },
  ];

  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 1300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
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
        <div style={{ fontSize: "24px", fontWeight: "bold", paddingLeft: "30px" }}>Get coins</div>
        <div className={styles.avatar1}>
          <Avatar alt="Remy Sharp" src="/img/avatarMessi.png" />
          <div>Luu Trieu Nam</div>
        </div>
        <Slider {...settings} className={styles.sliderList} ref={sliderRef}>
          {gems.map((gem, index) => (
            <div key={index} className={`container ${styles.swiper}`}>
              <div className={`swiper-wrapper ${styles.content}`}>
                <div className={`swiper-slide ${styles.card}`}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardBody}>
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "22px",
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
                          justifyContent: "center",
                        }}
                      >
                        <p>Số lượng coin:</p>
                        <p
                          className="card-text"
                          style={{
                            color: "black",
                            marginLeft: "5px",
                            marginTop: "0px",
                            fontWeight: "bold",
                          }}
                        >
                          {gem.quantity}
                        </p>
                      </div>
                      <div className={styles.image}>
                        <img src={gem.image} alt={gem.title} />
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#2c5b67",
                          color: "white",
                          width: "180px"
                        }}
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
      <div className={styles.avatar}>
        <div>Payment Method</div>
        <div>Total: $ 0</div>
      </div>
    </div>
  )
}

export default BuyCoin;
