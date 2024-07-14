using AutoMapper;
using Common.Constant.Payment;
using Common.DTO;
using Common.DTO.Payment;
using Common.DTO.Query;
using Common.DTO.User;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionRepository transactionRepository,
                                  IMapper mapper)
        {
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        public async Task<Transaction> AddNewTransaction(Transaction transaction)
        {
            return await _transactionRepository.AddNewTransaction(transaction);
        }

        public PaginationResponseDTO<TransactionDTO> GetAllTransactions(TransactionParameters parameters)
        {
            var transactions = _transactionRepository.GetPagedTransactionList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TransactionDTO>>(transactions);
            mappedResponse.Data = _mapper.Map<List<TransactionDTO>>(transactions);

            return mappedResponse;
        }

        public Transaction? GetLastTransOfUser(int userId)
        {
            return _transactionRepository.GetLastTransactionOfUser(userId);
        }

        public IEnumerable<Transaction> GetPaidTransOfUser(int userId)
        {
            var trans = _transactionRepository.GetAllTransactions();

            if (trans.Any())
            {
                return trans.Where(p => p.UserId == userId && p.Status == PaymentConstant.PaidStatus).ToList();
            }

            return trans;
        }

        public PaginationResponseDTO<TransactionDTO> GetTransOfUser(int userId, TransactionParameters parameters)
        {
            var transactions = _transactionRepository.GetPagedTransOfUser(userId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TransactionDTO>>(transactions);
            mappedResponse.Data = _mapper.Map<List<TransactionDTO>>(transactions);

            return mappedResponse;
        }

        public async Task<Transaction> UpdateTransaction(Transaction transaction)
        {
            return await _transactionRepository.UpdateTransaction(transaction);
        }
    }
}
