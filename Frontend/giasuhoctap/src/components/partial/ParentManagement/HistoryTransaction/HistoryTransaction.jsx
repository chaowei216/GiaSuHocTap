import React from 'react';
import styles from './HistoryTransaction.module.css';

const HistoryTransaction = () => {
  // Dữ liệu cứng cho các giao dịch
  const transactions = [
    { id: 1, date: '2024-07-01', amount: '500.000 VND', type: 'Nạp tiền' },
    { id: 2, date: '2024-07-02', amount: '200.000 VND', type: 'Thanh toán' },
    { id: 3, date: '2024-07-03', amount: '300.000 VND', type: 'Nạp tiền' },
    { id: 4, date: '2024-07-04', amount: '150.000 VND', type: 'Thanh toán' },
  ];

  return (
    <div className={styles.historyTransactionContainer}>
      <h2>Lịch sử giao dịch</h2>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Số tiền</th>
            <th>Loại giao dịch</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTransaction;
