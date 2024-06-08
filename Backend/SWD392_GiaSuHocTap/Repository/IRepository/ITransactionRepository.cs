using DAO.Model;

namespace Repository.IRepository
{
    public interface ITransactionRepository
    {
        /// <summary>
        /// Get all transactions
        /// </summary>
        /// <returns></returns>
        IEnumerable<Transaction> GetAllTransactions();

        /// <summary>
        /// Add new transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        Task<Transaction> AddNewTransaction(Transaction transaction);

        /// <summary>
        /// Get transaction by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Transaction?> GetTransaction(int id);
    }
}
