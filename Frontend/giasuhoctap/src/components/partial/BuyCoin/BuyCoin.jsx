import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BuyCoin.module.css"; // Create a CSS module for styling
import { Avatar, Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const BuyCoin = () => {
  const navigate = useNavigate();
  const { user } = useAuth()
  const gems = [
    {
      title: "Gói 20 xu",
      quantity: "20",
      price: "20.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Gói 50 xu",
      quantity: "50",
      price: "50.000 VND",
      image: "/img/coin_3.png",
    },
    {
      title: "Gói 100 xu",
      quantity: "100",
      price: "100.000 VND",
      image: "/img/coins.png",
    },
    {
      title: "Gói 200 xu",
      quantity: "200",
      price: "200.000 VND",
      image: "/img/coins.png",
    },
    {
      title: "Gói 500 xu",
      quantity: "500",
      price: "500.000 VND",
      image: "/img/coins.png",
    },
  ];

  const sliderRef = useRef();

  const settings = {
    infinite: true,
    speed: 1500,
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
  const handleBuyCoin = (item) => {
    const coin = item
    navigate('/payment', { state: coin })
  }
  return (
    <div className={styles.gemsSliderWrapper}>
      <div className={styles.sliderHeading}>
        <h1 style={{ color: "#E81C4B", fontSize: "30px" }}>
          List of package coin
        </h1>
      </div>
      <div className={styles.sliderListWrapper}>
        <div style={{ fontSize: "24px", fontWeight: "bold", paddingLeft: "30px" }}>Get coins</div>
        {user?.fullname != undefined &&
          <div className={styles.avatar1}>
            <Avatar alt="Remy Sharp" src="/img/avatarMessi.png" />
            <div>{user?.fullname}</div>
          </div>
        }
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
                        <p>Số lượng xu:</p>
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
                        onClick={() => handleBuyCoin(gem)}
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
    </div>
  )
}

export default BuyCoin;
