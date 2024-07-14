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
  const [pageSize, setPageSize] = useState(5);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await GetAllTransaction(user?.userId, page, pageSize);
        if (data) {
          setTransactions(data.data.data);
          setTotalPages(data.data.totalPages);
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
            <th>Xu</th>
            <th>Loại giao dịch</th>
            <th>Thông tin</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionDate.split("T")[0]}</td>
                <td>{transaction.amount} xu</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.transactionInfo}</td>
                <td>{transaction.status == "Paid" ? "Đã thanh toán" : "Đang chờ"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có giao dịch nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      {transactions && transactions.length > 0 && (
        <>
          <div
            style={{
              position: "relative",
              minHeight: "80px"
            }}
          >
            <ul style={{
              marginTop: "28px", marginBottom: "10px", position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
            }}>
              <PageNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </ul>
            <ul style={{ float: "right", marginTop: "12px" }} >
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryTransaction;
