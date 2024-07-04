import React from 'react';
import styles from "./Programs.module.css";

const Programs = () => {
  const prices = [
    { group: 'Lớp 5 - 6 - 7 - 8', data: [{ grade: 5, price: '150.000 ~ 170.000' }, { grade: 6, price: '150.000 ~ 180.000' }, { grade: 7, price: '170.000 ~ 190.000' }, { grade: 8, price: '190.000 ~ 220.000' }] },
    { group: 'Lớp 9 - 10 - 11 - 12', data: [{ grade: 9, price: '200.000 ~ 240.000' }, { grade: 10, price: '210.000 ~ 250.000' }, { grade: 11, price: '220.000 ~ 280.000' }, { grade: 12, price: '220.000 ~ 300.000' }] },
  ];

  return (
    <div className={styles.programsWrapper}>
      <div className={styles.programsTable}>
      <h1 className={styles.title}>Bảng giá tham khảo thuê gia sư</h1>
      <table className={styles.pricingTable}>
        <thead>
          <tr>
            <th>Khối lớp</th>
            <th>Giá tham khảo (VND/giờ)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((group, index) => (
            <React.Fragment key={index}>
              <tr className={styles.groupHeader}>
                <td colSpan="2">{group.group}</td>
              </tr>
              {group.data.map((item, subIndex) => (
                <tr key={subIndex}>
                  <td>Lớp {item.grade}</td>
                  <td>{item.price.toLocaleString()}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Programs;
