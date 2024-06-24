import React from "react";
import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselItem,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

function BuyCoin() {
  const items = [
    {
      title: "Pocketful of Gems",
      gems: "80",
      price: "€1.09",
      img: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
    },
    {
      title: "Pile of Gems",
      gems: "500",
      price: "€5.49",
      img: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
    },
    {
      title: "Bag of Gems",
      gems: "1200",
      price: "€10.99",
      img: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
    },
    {
      title: "Sack of Gems",
      gems: "2500",
      price: "€21.99",
      img: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
    },
    {
      title: "Box of Gems",
      gems: "6500",
      price: "€54.99",
      img: "https://mdbootstrap.com/img/new/standard/nature/184.webp",
    },
  ];

  return (
    <MDBContainer>
      <MDBCarousel showControls>
        {items.map((item, index) => (
          <MDBCarouselItem key={index} className={index === 0 ? "active" : ""}>
            <MDBCard>
              <MDBCardImage src={item.img} position="top" alt="..." />
              <MDBCardBody>
                <MDBCardTitle>{item.title}</MDBCardTitle>
                <MDBCardText>
                  <strong>{item.gems} gems</strong>
                  <br />
                  {item.price}
                </MDBCardText>
                <MDBBtn href="#">Buy Now</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </MDBContainer>
  );
}

export default BuyCoin;
