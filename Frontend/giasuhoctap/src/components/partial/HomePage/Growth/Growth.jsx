import React, { Fragment, useState } from "react";
import styles from "./Growth.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faStar, faBuildingShield, faTrophy } from '@fortawesome/free-solid-svg-icons';
import background from "../../../../../public/img/Book.jpg";


const Growth = () => {

  return (
    <div className={`${styles.growthWrapper} center`} style={{background: '#F0F9FC'}}>
      <div className={styles.growthContainer}>
        <hr className="divider my-4 mx-auto bg-warning border-warning" style={{opacity: '1', width: '90%'}} />
        <div className={styles.growthImgContainer} style={{ display: "flex" }}>
          <div style={{ width: "45%" }}>
            <img src={background} alt="Book" className={styles.img1} style={{width:'75%', height:'80%', marginLeft: '180px', marginTop: '35px'}} />
          </div>
          <div className={styles.listReview} style={{ width: "50%", marginTop: '35px' }}>
            <h1>TẠI SAO CHỌN GIA SƯ HỌC TẬP?</h1>
            <div className="reasonDescription container">
              <div className={styles.reasonChoose} style={{ display: 'flex' }}>

                <p> <FontAwesomeIcon icon={faHandPointRight} className={styles.icon} />
                  Lý do để hơn 3000+ phụ huynh toàn quốc lựa chọn Gia Sư Học Tập giúp con học tốt và cảm thấy hiệu quả hơn bất kỳ hình thức học tập khác</p>
              </div>
              <div className={styles.reasonTitle}>
                <div className={styles.boderIcon}>
                  <FontAwesomeIcon icon={faStar} className={styles.icon} />
                </div>
                <div className={styles.reasonContent}>
                  <h3>Quản lý chất lượng từ giáo viên giỏi</h3>
                  <p>- Khác với học gia sư tự do, lớp học Gia Sư Học Tập sẽ được quản lý chất lượng và định hướng bởi tổ giáo viên giỏi.</p>
                </div>
              </div>
              <div className={styles.reasonTitle}>
                <div className={styles.boderIcon}>
                  <FontAwesomeIcon icon={faBuildingShield} className={styles.icon} />
                </div>
                <div className={styles.reasonContent}>
                  <h3>Cách học mới & Tài liệu độc quyền</h3>
                  <p>- Học sinh được học theo đúng phong cách của mình nên tiếp thu nhanh hơn, hứng thú hơn. Kho bài giảng được nghiên cứu, biên soạn độc quyền bởi Blacasa giúp học dễ hiểu và hiệu quả hơn.</p>
                </div>
              </div>
              <div className={styles.reasonTitle}>
                <div className={styles.boderIcon}>
                  <FontAwesomeIcon icon={faTrophy} className={styles.icon} />
                </div>
                <div className={styles.reasonContent}>
                  <h3>Thương hiệu uy tín, chuyên nghiệp</h3>
                  <p>- VietJack là đơn vị được đánh giá cao bởi phụ huynh, báo đài. Là đối tác của nhiều cơ quan và trường học lớn.</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Growth;
