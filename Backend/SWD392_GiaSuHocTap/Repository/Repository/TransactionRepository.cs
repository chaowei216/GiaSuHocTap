using DAO.DAO;
using Repository.IRepository;
using DAO.Model;
using Common.DTO;
using Common.DTO.Query;
using Microsoft.EntityFrameworkCore;
using Common.Constant.Payment;

namespace Repository.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IGenericDAO<Transaction> _transactionDAO;

        public TransactionRepository(IGenericDAO<Transaction> transactionDAO)
        {
            _transactionDAO = transactionDAO;
        }

        public async Task<Transaction> AddNewTransaction(Transaction transaction)
        {
            return await _transactionDAO.AddAsync(transaction);
        }

        public IEnumerable<Transaction> GetAllTransactions()
        {
            return _transactionDAO.GetAll().AsEnumerable();
        }

        public Transaction? GetLastTransactionOfUser(int userId)
        {
            var pendingTransactions = _transactionDAO.GetByCondition(p => p.UserId == userId && p.Status == PaymentConstant.PendingStatus);
            return (pendingTransactions != null && pendingTransactions.Any()) ? pendingTransactions.First() : null;
        }

        public PagedList<Transaction> GetPagedTransactionList(TransactionParameters parameters)
        {
            return PagedList<Transaction>.ToPagedList(_transactionDAO.GetAll().Include(p => p.User).Where(p => p.Status != PaymentConstant.CancelStatus), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Transaction> GetPagedTransOfUser(int userId, TransactionParameters parameters)
        {
            var transOfUser = _transactionDAO.GetByCondition(p => p.UserId == userId && p.Status != PaymentConstant.CancelStatus).Include(p => p.User);

            return PagedList<Transaction>.ToPagedList(transOfUser, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Transaction?> GetTransaction(int id)
        {
            return await _transactionDAO.GetByIdAsync(id);
        }

        public async Task<Transaction> UpdateTransaction(Transaction transaction)
        {
            return await _transactionDAO.UpdateAsync(transaction);
        }
    }
}
