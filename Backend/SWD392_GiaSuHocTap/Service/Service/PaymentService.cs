using Common.Constant.Notification;
using Common.Constant.Payment;
using Common.DTO.Payment;
using DAO.Model;
using Firebase.Auth;
using Microsoft.AspNetCore.Http;
using Service.IService;

namespace Service.Service
{
    public class PaymentService : IPaymentService
    {
        private readonly ITransactionService _transactionService;
        private readonly IVnPayService _vnpPayService;
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;

        public PaymentService(ITransactionService transactionService,
                              IVnPayService vnpPayService,
                              INotificationService notificationService,
                              IUserService userService)
        {
            _transactionService = transactionService;
            _vnpPayService = vnpPayService;
            _notificationService = notificationService;
            _userService = userService;
        }

        public async Task<string> CreatePaymentRequest(PaymentRequestDTO paymentInfo, HttpContext context)
        {
            var unpaidTrans = _transactionService.GetLastTransOfUser(paymentInfo.UserId);

            if (unpaidTrans != null)
            {
                unpaidTrans.Status = PaymentConstant.CancelStatus;
                await _transactionService.UpdateTransaction(unpaidTrans);
            }

            var newTran = await _transactionService.AddNewTransaction(new Transaction ()
            {
                PaymentMethod = paymentInfo.PaymentMethod,
                TransactionDate = DateTime.Now,
                Amount = paymentInfo.Coin,
                TransactionInfo = PaymentConstant.UnSet,
                TransactionNumber = PaymentConstant.UnSet,
                Status = PaymentConstant.PendingStatus,
                UserId = paymentInfo.UserId,
            });

            if (newTran != null)
            {
                return _vnpPayService.CreatePaymentUrl(paymentInfo, context);
            }

            return string.Empty;
        }

        public async Task<bool> HandlePaymentResponse(PaymentResponseDTO response)
        {
            var unpaidTrans = _transactionService.GetLastTransOfUser(response.UserId);

            if (unpaidTrans != null && unpaidTrans.Status == PaymentConstant.PendingStatus)
            {
                string notifyDes = Description.BuyCoinPending;

                if (response.IsSuccess)
                {
                    // update trans
                    unpaidTrans.Status = PaymentConstant.PaidStatus;
                    unpaidTrans.TransactionInfo = response.TransactionInfo;
                    unpaidTrans.TransactionNumber = response.TransactionNumber;

                    // update trans description
                    notifyDes = Description.BuyCoinSuccess;

                    // update balance
                    var user = await _userService.GetUserById(response.UserId);

                    if (user != null)
                    {
                        user.CoinBalance += (int)unpaidTrans.Amount;
                        await _userService.UpdateUser(user);
                    }
                } else
                {
                    // update trans
                    unpaidTrans.TransactionInfo = response.TransactionInfo;
                    unpaidTrans.TransactionNumber = response.TransactionNumber;
                    unpaidTrans.Status = PaymentConstant.CancelStatus;

                    // update trans description
                    notifyDes = Description.BuyCoinFail;
                }
                await _transactionService.UpdateTransaction(unpaidTrans);

                // add notification
                var notification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = notifyDes,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = response.UserId,
                    NotificationId = notification.NotificationId
                });

                return true;
            }

            return false;
        }
    }
}
