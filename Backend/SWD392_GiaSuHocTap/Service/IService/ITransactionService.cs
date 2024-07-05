using Common.DTO;
using Common.DTO.Payment;
using Common.DTO.Query;
using DAO.Model;

namespace Service.IService
{
    public interface ITransactionService
    {
        /// <summary>
        /// Get all transactions
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TransactionDTO> GetAllTransactions(TransactionParameters parameters);

        /// <summary>
        /// Add new transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        Task<Transaction> AddNewTransaction(Transaction transaction);

        /// <summary>
        /// Update transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        Task<Transaction> UpdateTransaction(Transaction transaction);

        /// <summary>
        /// Get last unpaid trans of user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Transaction? GetLastTransOfUser(int userId);

        /// <summary>
        /// Get trans of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<TransactionDTO> GetTransOfUser(int userId, TransactionParameters parameters);
    }
}
