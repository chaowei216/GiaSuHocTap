import React, { useState, useEffect } from 'react';
import styles from './HistoryTransaction.module.css';
import { GetAllTransaction } from '../../../../api/TransactionUserApi';
import { toast } from 'react-toastify';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
import useAuth from '../../../../hooks/useAuth';

const HistoryTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await GetAllTransaction(user?.userId, page, pageSize);
        if (data) {
          setTransactions(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu giao dịch.');
      }
    };

    fetchTransactions();
  }, [user?.userId, page, pageSize]);

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
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có giao dịch nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.paginationWrapper} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginLeft: '500px' }}>
        <PageNavigation page={page} setPage={setPage} totalPages={totalPages} />
        <div style={{marginLeft: '500px'}}>
        <PageSize pageSize={pageSize} setPageSize={setPageSize}/>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;
