using DAO.DAO;
using Repository.IRepository;
using DAO.Model;
using Common.DTO;
using Common.DTO.Query;

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

        public PagedList<Transaction> GetPagedTransactionList(TransactionParameters parameters)
        {
            return PagedList<Transaction>.ToPagedList(_transactionDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Transaction?> GetTransaction(int id)
        {
            return await _transactionDAO.GetByIdAsync(id);
        }
    }
}
