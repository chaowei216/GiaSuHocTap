﻿using AutoMapper;
using Common.Constant.Firebase;
using Common.Constant.Message;
using Common.Constant.Notification;
using Common.Constant.Request;
using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.Constant.User;
using Common.DTO;
using Common.DTO.Email;
using Common.DTO.Query;
using Common.DTO.TimeTable;
using Common.DTO.User;
using Common.Enum;
using DAO.Model;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Repository.IRepository;
using Service.IService;
using System.Security.Cryptography;

namespace Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IClassService _classService;
        private readonly ICourseService _courseService;
        private readonly ITimeTableService _timeTableService;
        private readonly IValidateHandleService _validateHandleService;
        private readonly INotificationService _notificationService;
        private readonly IFeedbackService _feedbackService;
        private readonly StorageClient _storageClient;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public UserService(IUserRepository userRepository, 
                            IMapper mapper, 
                            IValidateHandleService validateHandleService,
                            IClassService classService,
                            ICourseService courseService,
                            ITimeTableService timeTableService,
                            INotificationService notificationService,
                            IFeedbackService feedbackService,
                            IConfiguration configuration,
                            IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _validateHandleService = validateHandleService;
            _classService = classService;
            _courseService = courseService;
            _timeTableService = timeTableService;
            _notificationService = notificationService;
            _feedbackService = feedbackService;
            _emailService = emailService;
            _configuration = configuration;

            string pathToJsonFile = "firebase.json";

            try
            {
                // Create GoogleCredential from the JSON file
                GoogleCredential credential = GoogleCredential.FromFile(pathToJsonFile)
                    .CreateScoped(FirebaseLink.LinkFirebase);

                // Create StorageClient with the provided credential
                _storageClient = StorageClient.Create(credential);
            }
            catch (Exception ex)
            {
                // Handle any exceptions related to credential creation
                throw new Exception(FirebaseLink.FailToCreatCer + ex.Message);
            }
        }

        public async Task<ParentCreateResponseDTO> AddNewParent(ParentCreateRequestDTO parent, IFormFile userImageUrl)
        {
            var userMap = _mapper.Map<User>(parent);
            string image = string.Empty;

            // Generate a unique name for each image file
            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(userImageUrl.FileName);
            image = imageName;
            // Upload each image to Firebase Storage
            using (var stream = userImageUrl.OpenReadStream())
            {
                await _storageClient.UploadObjectAsync(
                    bucket: "giasuhoctap-91d48.appspot.com",
                    objectName: imageName,
                    contentType: userImageUrl.ContentType,
                    source: stream);
            }

            CreatePasswordHash(parent.Password, out byte[] passwordHash, out byte[] passwordSalt);
            userMap.PasswordHash = passwordHash;
            userMap.PasswordSalt = passwordSalt;
            userMap.CoinBalance = 0;
            userMap.RoleId = (int)RoleEnum.Parents;
            userMap.Status = UserStatusEnum.Active;
            userMap.UserImage = image;

            userMap = await _userRepository.AddNewParent(userMap);

            if (userMap != null)
            {
                var result = new ParentCreateResponseDTO()
                {
                    Request = parent,
                    IsSuccess = true,
                };
                return result;
            }
            else
            {
                var result = new ParentCreateResponseDTO()
                {
                    IsSuccess = false,
                };
                return result;
            }
        }

        public async Task<TutorCreateResponseDTO> AddNewTutor(TutorCreateRequestDTO tutor, IFormFile imageFile, List<IFormFile> idenFiles,
                                                                List<IFormFile> cerFiles)
        {
            List<string> identityFiles = new List<string>();
            List<string> certiFiles = new List<string>();
            string image = string.Empty;
            var userMap = _mapper.Map<User>(tutor);
            var tutorMap = _mapper.Map<TutorDetail>(tutor);

            CreatePasswordHash(tutor.Password, out byte[] passwordHash, out byte[] passwordSalt);

            foreach (var file in idenFiles)
            {
                if (file == null || file.Length == 0)
                {
                    return new TutorCreateResponseDTO()
                    {
                        IsSuccess = false,
                    };
                }

                // Generate a unique name for each image file
                var idenName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                identityFiles.Add(idenName);
                // Upload each image to Firebase Storage
                using (var stream = file.OpenReadStream())
                {
                    await _storageClient.UploadObjectAsync(
                        bucket: "giasuhoctap-91d48.appspot.com",
                        objectName: idenName,
                        contentType: file.ContentType,
                        source: stream);
                }
            }

            foreach (var file in cerFiles)
            {
                if (file == null || file.Length == 0)
                {
                    return new TutorCreateResponseDTO()
                    {
                        IsSuccess = false,
                    };
                }

                // Generate a unique name for each image file
                var cerName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                certiFiles.Add(cerName);
                // Upload each image to Firebase Storage
                using (var stream = file.OpenReadStream())
                {
                    await _storageClient.UploadObjectAsync(
                        bucket: "giasuhoctap-91d48.appspot.com",
                        objectName: cerName,
                        contentType: file.ContentType,
                        source: stream);
                }
            }

            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            image = imageName;
            // Upload each image to Firebase Storage
            using (var stream = imageFile.OpenReadStream())
            {
                await _storageClient.UploadObjectAsync(
                    bucket: "giasuhoctap-91d48.appspot.com",
                    objectName: imageName,
                    contentType: imageFile.ContentType,
                    source: stream);
            }

            userMap.PasswordHash = passwordHash;
            userMap.PasswordSalt = passwordSalt;
            userMap.CoinBalance = 0;
            userMap.RoleId = (int)RoleEnum.Tutor;
            userMap.Status = UserStatusEnum.Pending;
            userMap.UserImage = image;
            userMap.IdentityImage = identityFiles;

            tutorMap.Major = tutor.Major;
            tutorMap.CertificateImage = certiFiles;
            tutorMap.Job = tutor.Job;
            tutorMap.User = userMap;
            userMap = await _userRepository.AddNewTutor(userMap);
            tutorMap = await _userRepository.AddNewTutorDetail(tutorMap);

            if (userMap != null && tutorMap != null) {
                var result = new TutorCreateResponseDTO()
                {
                    Request = tutor,
                    IsSuccess = true,
                };
                return result;
            } else
            {
                var result = new TutorCreateResponseDTO()
                {
                    IsSuccess = false,
                };
                return result;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hMac = new HMACSHA512())
            {
                passwordSalt = hMac.Key;
                passwordHash = hMac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail)
        {
            return await _userRepository.AddNewTutorDetail(tutorDetail);
        }

        public CheckValidateResponseDTO CheckCreateTutor(TutorCreateRequestDTO tutor)
        {
            var userList = _userRepository.GetAllUsers().ToList();

            var checkNullFullName = _validateHandleService.CheckNull(tutor.Fullname);
            if (!checkNullFullName)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullFullName,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatFullName = _validateHandleService.CheckFormatFullName(tutor.Fullname);
            if (!checkFormatFullName)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatFullName,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullPassword = _validateHandleService.CheckNull(tutor.Password);
            if (!checkNullPassword)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullPassword,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatPassword = _validateHandleService.CheckFormatPassword(tutor.Password);
            if (!checkFormatPassword)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatPassword,
                    IsSuccess=false
                };
                return response;
            }

            var checkNullPhoneNumber = _validateHandleService.CheckNull(tutor.Phonenumber);
            if (!checkNullPhoneNumber)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullPhoneNumber,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatPhoneNumber = _validateHandleService.CheckFormatPhoneNumber(tutor.Phonenumber);
            if (!checkFormatPhoneNumber)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatPhoneNumber,
                    IsSuccess = false
                };
                return response;
            }

            var checkPhoneAlreadyExists = _validateHandleService.CheckPhoneNumberAlreadyExists(tutor.Phonenumber, userList);
            if (!checkPhoneAlreadyExists)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.PhoneNumberAlreadyExists,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullEmail = _validateHandleService.CheckNull(tutor.Email);
            if (!checkNullEmail)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullEmail,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatEmail = _validateHandleService.CheckFormatEmail(tutor.Email);
            if (!checkFormatEmail)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatEmail,
                    IsSuccess = false
                };
                return response;
            }

            var checkEmailAlreadyExists = _validateHandleService.CheckEmailAlreadyExists(tutor.Email, userList);
            if (!checkEmailAlreadyExists)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.EmailAlreadyExists,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullBirthday = _validateHandleService.CheckNull(tutor.DateOfBirth);
            if (!checkNullBirthday)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullBirthday,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullGender = _validateHandleService.CheckNull(tutor.Gender);
            if (!checkNullGender)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullGender,
                    IsSuccess=false
                };
                return response;
            }

            var checkNullAdress = _validateHandleService.CheckNull(tutor.Address);
            if (!checkNullAdress)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullAddress,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullDistrict = _validateHandleService.CheckNull(tutor.District);
            if (!checkNullDistrict)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullDistrict,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullCity = _validateHandleService.CheckNull(tutor.City);
            if (!checkNullCity)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullCity,
                    IsSuccess = false
                };
                return response;
            }

            var successfulResponse = new CheckValidateResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = CreateUserMessage.CheckSuccess,
                IsSuccess = true
            };
            return successfulResponse;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public User? GetUserByEmail(string email)
        {
            var result = _userRepository.GetUserByEmail(email);
            if(result != null)
            {
                return result;
            } else
            {
                return null;
            }
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail)
        {
            return await _userRepository.UpdateTutorDetail(tutorDetail);
        }

        public async Task<User> UpdateUserOtp(User user)
        {
            return await _userRepository.UpdateUser(user);
        }

        public CheckValidateResponseDTO CheckCreateParent(ParentCreateRequestDTO parent)
        {
            var userList = _userRepository.GetAllUsers().ToList();

            var checkNullFullName = _validateHandleService.CheckNull(parent.Fullname);
            if (!checkNullFullName)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullFullName,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatFullName = _validateHandleService.CheckFormatFullName(parent.Fullname);
            if (!checkFormatFullName)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatFullName,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullPassword = _validateHandleService.CheckNull(parent.Password);
            if (!checkNullPassword)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullPassword,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatPassword = _validateHandleService.CheckFormatPassword(parent.Password);
            if (!checkFormatPassword)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatPassword,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullPhoneNumber = _validateHandleService.CheckNull(parent.Phonenumber);
            if (!checkNullPhoneNumber)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullPhoneNumber,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatPhoneNumber = _validateHandleService.CheckFormatPhoneNumber(parent.Phonenumber);
            if (!checkFormatPhoneNumber)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatPhoneNumber,
                    IsSuccess = false
                };
                return response;
            }

            var checkPhoneAlreadyExists = _validateHandleService.CheckPhoneNumberAlreadyExists(parent.Phonenumber, userList);
            if (!checkPhoneAlreadyExists)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.PhoneNumberAlreadyExists,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullEmail = _validateHandleService.CheckNull(parent.Email);
            if (!checkNullEmail)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullEmail,
                    IsSuccess = false
                };
                return response;
            }

            var checkFormatEmail = _validateHandleService.CheckFormatEmail(parent.Email);
            if (!checkFormatEmail)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.WrongFormatEmail,
                    IsSuccess = false
                };
                return response;
            }

            var checkEmailAlreadyExists = _validateHandleService.CheckEmailAlreadyExists(parent.Email, userList);
            if (!checkEmailAlreadyExists)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.EmailAlreadyExists,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullBirthday = _validateHandleService.CheckNull(parent.DateOfBirth);
            if (!checkNullBirthday)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullBirthday,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullGender = _validateHandleService.CheckNull(parent.Gender);
            if (!checkNullGender)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullGender,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullAdress = _validateHandleService.CheckNull(parent.Address);
            if (!checkNullAdress)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullAddress,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullDistrict = _validateHandleService.CheckNull(parent.District);
            if (!checkNullDistrict)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullDistrict,
                    IsSuccess = false
                };
                return response;
            }

            var checkNullCity = _validateHandleService.CheckNull(parent.City);
            if (!checkNullCity)
            {
                var response = new CheckValidateResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = CreateUserMessage.NullCity,
                    IsSuccess = false
                };
                return response;
            }

            var successfulResponse = new CheckValidateResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = CreateUserMessage.CheckSuccess,
                IsSuccess = true
            };
            return successfulResponse;
        }

        public PaginationResponseDTO<TutorDTO> GetPagedUserList(UserParameters parameters)
        {
            var userList = _userRepository.GetPagedUserList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorDTO>>(userList);
            mappedResponse.Data = _mapper.Map<List<TutorDTO>>(userList);

            return mappedResponse;
        }

        public PaginationResponseDTO<TutorInforDTO> GetAllPendingUser(UserParameters parameters)
        {
            var userList = _userRepository.GetPagedPendingUserList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorInforDTO>>(userList);
            mappedResponse.Data = _mapper.Map<List<TutorInforDTO>>(userList);

            return mappedResponse;
        }

        public PaginationResponseDTO<TutorInforDTO> GetAllActiveUser(UserParameters parameters)
        {
            var userList = _userRepository.GetPagedActiveUserList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorInforDTO>>(userList);
            mappedResponse.Data = _mapper.Map<List<TutorInforDTO>>(userList);

            return mappedResponse;
        }

        public async Task<FileStream> RetrieveItemAsync(string rootPath)
        {
            try
            {
                // Create temporary file to save the memory stream contents
                var fileName = Path.GetTempFileName();

                // Create an empty zip file
                using (var fileStream = new FileStream(fileName, FileMode.Create))
                {
                    using (var stream = new MemoryStream())
                    {
                        // Download the file contents
                        await _storageClient.DownloadObjectAsync("giasuhoctap-91d48.appspot.com", rootPath, stream);

                        // Set the position of the memory stream to the beginning
                        stream.Seek(0, SeekOrigin.Begin);

                        // Copy the contents of the memory stream to the file stream
                        await stream.CopyToAsync(fileStream);
                    }
                }

                // Return FileStream for the file
                return new FileStream(fileName, FileMode.Open, FileAccess.Read);
            }
            catch (Google.GoogleApiException ex) when (ex.Error.Code == 403)
            {
                Console.WriteLine($"Access denied: {ex.Error.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null!;
        }

        public async Task<bool> UpdateTutorLastStep(UpdateTutorDTO tutorInfo)
        {
            var user = await _userRepository.GetUserById(tutorInfo.TutorId);
            var tutorDetail = await _userRepository.GetTutorDetailByTutorId(tutorInfo.TutorId);

            if (user != null && tutorDetail != null &&
                tutorInfo.Subjects.Any() && 
                tutorInfo.Classes.Any() &&
                tutorInfo.DayOfWeekOnline.Any())
            {
                // update Youtube link
                user.YoutubeLink = tutorInfo.YoutubeLink;
                tutorDetail.TeachingOnline = true;

                // add user class
                foreach (var c in tutorInfo.Classes)
                {
                    await _classService.AddNewUserClass(new UserClass()
                    {
                        ClassId = c,
                        UserId = user.UserId
                    });
                }

                // add user course
                foreach (var c in tutorInfo.Subjects)
                {
                    await _courseService.AddNewUserCourse(new UserCourse ()
                    {
                        CourseId = c,
                        UserId = user.UserId
                    });
                }

                // add time table
                // online
                foreach (var time in tutorInfo.DayOfWeekOnline)
                {
                    var splitTime = time.Last().Split('-');
                    int startTime = int.Parse(splitTime[0].ToString());
                    int endTime = int.Parse(splitTime[1].ToString());

                    if (startTime > endTime)
                    {
                        int temp = startTime;
                        startTime = endTime;
                        endTime = temp;
                    }

                    for (int i = startTime; i < endTime; i++)
                    {
                        await _timeTableService.AddTimeTable(new TimeTable()
                        {
                            UserId = user.UserId,
                            DayOfWeek = time.First(),
                            StartTime = i.ToString() + ":00",
                            EndTime = (i+1).ToString() + ":00",
                            LearningType = LearningType.Online,
                            Period = time[1],
                            Status = TimeTableConst.FreeStatus
                        });
                    }
                }

                // check if tutor choose offline teaching 
                if (tutorInfo.IsOfflineTeaching)
                {
                    foreach (var time in tutorInfo.DayOfWeekOffline!)
                    {
                        var splitTime = time.Last().Split('-');
                        string startTime = splitTime[0] + ":00";
                        string endTime = splitTime[1] + ":00";

                        await _timeTableService.AddTimeTable(new TimeTable()
                        {
                            UserId = user.UserId,
                            DayOfWeek = time.First(),
                            StartTime = startTime,
                            EndTime = endTime,
                            LearningType = LearningType.Offline,
                            Period = time[1],
                            Status = TimeTableConst.FreeStatus,                         
                        });
                    }

                    tutorDetail.TeachingOffline = true;
                }

                user.Status = UserStatusEnum.Checking;
                await _userRepository.UpdateUser(user);
                await _userRepository.UpdateTutorDetail(tutorDetail);

                // add notification
                var notification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.UpdateTutorDetailSuccess,
                    CreatedTime = DateTime.Now,
                    Status = false,                   
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = user.UserId,
                    NotificationId = notification.NotificationId
                });

                return true;
            }

            return false;
        }

        public PaginationResponseDTO<TutorInforDTO> GetTutorTeachOnline(TutorParameters parameters)
        {
            DateTime today = DateTime.Now;
            string dayOfWeek = GetDayOfWeek(today);
            var userList = _userRepository.GetTutorTeachOnline(parameters);
            List<TutorInforDTO> tutorInfoDTOs = new List<TutorInforDTO>();

            foreach (var user in userList)
            {
                user.TimeTables = user.TimeTables.Where(t => t.LearningType == TimeTableConst.Online && t.DayOfWeek == dayOfWeek
                                                                                    && DateTime.Parse(t.StartTime) <= DateTime.Now.AddMinutes(20) &&
                                                                                    DateTime.Parse(t.EndTime) >= DateTime.Now.AddMinutes(20)
                                                                                    && t.Status == TimeTableConst.FreeStatus).ToList();
                tutorInfoDTOs.Add(_mapper.Map<TutorInforDTO>(user));

            }

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorInforDTO>>(userList);
            mappedResponse.Data = tutorInfoDTOs;
            return mappedResponse;
        }
        private string GetDayOfWeek(DateTime date)
        {
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    return "Monday";
                case DayOfWeek.Tuesday:
                    return "Tuesday";
                case DayOfWeek.Wednesday:
                    return "Wednesday";
                case DayOfWeek.Thursday:
                    return "Thursday";
                case DayOfWeek.Friday:
                    return "Friday";
                case DayOfWeek.Saturday:
                    return "Saturday";
                case DayOfWeek.Sunday:
                    return "Sunday";
                default:
                    return "Unknown";
            }
        }

        public PaginationResponseDTO<TutorInforDTO> GetTutorTeachOffline(TutorParameters parameters)
        {
            var userList = _userRepository.GetTutorTeachOffline(parameters);
            List<TutorInforDTO> mappedData = new List<TutorInforDTO>();

            foreach (var user in userList)
            {
                user.TimeTables = user.TimeTables.Where(p => p.LearningType == LearningType.Offline && p.Status == TimeTableConst.FreeStatus).ToList();
                mappedData.Add(_mapper.Map<TutorInforDTO>(user));
            }

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorInforDTO>>(userList);
            mappedResponse.Data = mappedData;

            return mappedResponse;
        }

        public TutorDTO? GetUserByEmailInclude(string email)
        {
            var user = _userRepository.GetUserByEmailInclude(email);

            var adminPassword = _configuration["AdminAccount:Password"];

            var admin = CheckAdminAccount(email, adminPassword);

            if (admin != null)
            {
                var response = _mapper.Map<TutorDTO>(admin);
                return response;
            }

            var userMap = _mapper.Map<TutorDTO>(user);
            return userMap;
        }

        private User? CheckAdminAccount(string username, string password)
        {
            var adminEmail = _configuration["AdminAccount:Email"];
            var adminPassword = _configuration["AdminAccount:Password"];

            if (!string.IsNullOrEmpty(adminEmail) && !string.IsNullOrEmpty(adminPassword))
            {
                if (adminEmail == username && adminPassword == password)
                {
                    return new User
                    {
                        Email = adminEmail,
                        RoleId = (int)RoleEnum.Admin
                    };
                }
            }

            return null;
        }

        public IEnumerable<TopTutorInfoDTO> GetTopTutor()
        {
            var allFeedback = _feedbackService.GetAllFeedbacks();

            var topTutors = _userRepository.GetTopTutorByFeedBack(allFeedback);

            var mappedResponse = _mapper.Map<List<TopTutorInfoDTO>>(topTutors);

            foreach(var tutor  in mappedResponse)
            {
                var tutorInfo = topTutors.Where(p => p.UserId == tutor.UserId);
                var fbOfUser = allFeedback.Where(p => p.ToId == tutor.UserId);
                if (fbOfUser.Any())
                {
                    tutor.AverageRating = fbOfUser.Average(p => p.Rating);
                } else
                {
                    tutor.AverageRating = 0;
                }

            }

            return mappedResponse;
        }

        public async Task<User> UpdateUser(User user)
        {
            return await _userRepository.UpdateUser(user);
        }

        public async Task<TutorDetail?> GetTutorDetailByUserId(int userId)
        {
            return await _userRepository.GetTutorDetailByTutorId(userId);
        }

        public async Task<TutorDTO?> UpdateUser(User user, UserUpdateDTO userInfo)
        {
            user.Address = userInfo.Address;
            user.City = userInfo.City;
            user.District = userInfo.District;
            user.Gender = userInfo.Gender;
            CreatePasswordHash(userInfo.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            var updatedUser = await _userRepository.UpdateUser(user);

            if (updatedUser != null)
            {
                var mappedResponse = _mapper.Map<TutorDTO>(updatedUser);
                return mappedResponse;
            }

            return null;
        }

        public PaginationResponseDTO<TutorDTO> GetPagedTutorList(UserParameters parameters)
        {
            var userList = _userRepository.GetPagedTutorList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<TutorDTO>>(userList);
            mappedResponse.Data = _mapper.Map<List<TutorDTO>>(userList);

            return mappedResponse;
        }

        public PaginationResponseDTO<TimetableDTO> GetTimeTableByEmail(string email, TimeTableParameters parameters)
        {
            var user = GetUserByEmail(email);

            if (user != null)
            {
                var timetable = _timeTableService.GetTimeTableByUserId(user.UserId, parameters);

                return timetable;
            }
            return null;
        }

        public async Task<ModeratorDTO?> AddNewModerator(ModeratorCreateRequestDTO request)
        {
            var userList = _userRepository.GetAllUsers().ToList();

            if (!_validateHandleService.CheckFormatPhoneNumber(request.Phonenumber) ||
                !_validateHandleService.CheckPhoneNumberAlreadyExists(request.Phonenumber, userList) ||
                !_validateHandleService.CheckFormatEmail(request.Email) ||
                !_validateHandleService.CheckEmailAlreadyExists(request.Email, userList)
                )
            {
                return null;
            }
            else
            {
                var userMap = _mapper.Map<User>(request);

                CreatePasswordHash(UserConst.ModeratorPassword, out byte[] passwordHash, out byte[] passwordSalt);
                userMap.PasswordHash = passwordHash;
                userMap.PasswordSalt = passwordSalt;
                userMap.CoinBalance = 0;
                userMap.RoleId = (int)RoleEnum.Moderator;
                userMap.Status = UserStatusEnum.Active;
                userMap.IsVerified = true;

                userMap = await _userRepository.AddNewModerator(userMap);

                if (userMap != null)
                {
                    // add notification
                    var userNotification = await _notificationService.AddNewNotification(new Notification()
                    {
                        NotificationType = NotificationType.Infomation,
                        Description = Description.CreateModeratorSuccess,
                        CreatedTime = DateTime.Now,
                        Status = false,
                    });

                    // add user notification
                    await _notificationService.AddNewUserNotification(new UserNotification
                    {
                        UserId = userMap.UserId,
                        NotificationId = userNotification.NotificationId
                    });

                    _emailService.SendInfomationModeratorEmail(request.Email, EmailSubject.ModeratorInfoSubject, userMap);
                    return _mapper.Map<ModeratorDTO>(userMap);
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task<bool> UnBlockAccount(User user)
        {
            user.Status = UserStatusEnum.Active;
            var updatedUser = await _userRepository.UpdateUser(user);

            if (updatedUser != null)
            {
                // add notification
                var tutorNotification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.UnBlockAccount,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = user.UserId,
                    NotificationId = tutorNotification.NotificationId
                });

                return true;
            }

            return false;
        }

        public async Task<bool> UpdateTimetable(UpdateTimeTableDTO tutorInfo)
        {
            var user = await _userRepository.GetUserById(tutorInfo.TutorId);
            var tutorDetail = await _userRepository.GetTutorDetailByTutorId(tutorInfo.TutorId);

            if (user != null && tutorDetail != null &&
                tutorInfo.Subjects.Any() &&
                tutorInfo.Classes.Any() &&
                tutorInfo.DayOfWeekOnline.Any())
            {

                // add user class
                foreach (var c in tutorInfo.Classes)
                {
                    var userclass = await _classService.GetUserClassByUserIdAndClassId(user.UserId, c);
                    if (userclass == null)
                    {
                        await _classService.AddNewUserClass(new UserClass()
                        {
                            ClassId = c,
                            UserId = user.UserId
                        });
                    }
                }

                // add user course
                foreach (var c in tutorInfo.Subjects)
                {
                    var usercourse = await _courseService.GetUserClassByUserIdAndCourseId(user.UserId, c);
                    if (usercourse == null)
                    {
                        await _courseService.AddNewUserCourse(new UserCourse()
                        {
                            CourseId = c,
                            UserId = user.UserId
                        });
                    }
                }

                // add time table
                // online
                foreach (var time in tutorInfo.DayOfWeekOnline)
                {
                    var splitTime = time.Last().Split('-');
                    int startTime = int.Parse(splitTime[0].ToString());
                    int endTime = int.Parse(splitTime[1].ToString());

                    if (startTime > endTime)
                    {
                        int temp = startTime;
                        startTime = endTime;
                        endTime = temp;
                    }

                    for (int i = startTime; i < endTime; i++)
                    {
                        var timetable = _timeTableService.GetTimetableByDayAndPeriodAndUserIdOnline(user.UserId, time.First(), i.ToString() + ":00", (i + 1).ToString() + ":00").FirstOrDefault();
                        if (timetable == null)
                        {
                            await _timeTableService.AddTimeTable(new TimeTable()
                            {
                                UserId = user.UserId,
                                DayOfWeek = time.First(),
                                StartTime = i.ToString() + ":00",
                                EndTime = (i + 1).ToString() + ":00",
                                LearningType = LearningType.Online,
                                Period = time[1],
                                Status = TimeTableConst.FreeStatus
                            });
                        }
                    }
                }

                // check if tutor choose offline teaching 
                if (tutorInfo.IsOfflineTeaching)
                {
                    foreach (var time in tutorInfo.DayOfWeekOffline!)
                    {
                        var splitTime = time.Last().Split('-');
                        string startTime = splitTime[0] + ":00";
                        string endTime = splitTime[1] + ":00";

                        var timetableOff = _timeTableService.GetTimetableByDayAndPeriodAndUserIdOffline(user.UserId, time.First(), time[1]).FirstOrDefault();
                        if (timetableOff == null)
                        {
                            await _timeTableService.AddTimeTable(new TimeTable()
                            {
                                UserId = user.UserId,
                                DayOfWeek = time.First(),
                                StartTime = startTime,
                                EndTime = endTime,
                                LearningType = LearningType.Offline,
                                Period = time[1],
                                Status = TimeTableConst.FreeStatus,
                            });
                        }
                    }

                    tutorDetail.TeachingOffline = true;
                }

                user.Status = UserStatusEnum.Checking;
                await _userRepository.UpdateUser(user);
                await _userRepository.UpdateTutorDetail(tutorDetail);

                // add notification
                var notification = await _notificationService.AddNewNotification(new Notification()
                {
                    NotificationType = NotificationType.Infomation,
                    Description = Description.UpdateTutorDetailSuccess,
                    CreatedTime = DateTime.Now,
                    Status = false,
                });

                // add user notification
                await _notificationService.AddNewUserNotification(new UserNotification
                {
                    UserId = user.UserId,
                    NotificationId = notification.NotificationId
                });

                return true;
            }

            return false;
        }
    }
}
