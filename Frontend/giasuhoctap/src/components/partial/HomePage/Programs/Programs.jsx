import React from 'react';
import styles from "./Programs.module.css";

const Programs = () => {
  const prices = [
    { group: 'Lớp 6 - 7 - 8 - 9', data: [{ grade: 6, price: '50 xu' }, { grade: 7, price: '50 xu' }, { grade: 8, price: '50 xu' }, { grade: 9, price: '50 xu' }] },
    { group: '10 - 11 - 12', data: [{ grade: 10, price: '50 xu' }, { grade: 11, price: '50 xu' }, { grade: 12, price: '50 xu' }] },
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
