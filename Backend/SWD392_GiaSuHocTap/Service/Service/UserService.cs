using AutoMapper;
using Common.Constant.Firebase;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Email;
using Common.DTO.Query;
using Common.DTO.User;
using Common.Enum;
using DAO.Model;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Repository.IRepository;
using Service.IService;
using System.Security.Cryptography;

namespace Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IValidateHandleService _validateHandleService;
        private readonly StorageClient _storageClient;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IValidateHandleService validateHandleService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _validateHandleService = validateHandleService;

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
            userMap.RoleId = (int)RoleEnum.Parents + 1;
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
            userMap.RoleId = (int)RoleEnum.Tutor + 1;
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

        public PaginationResponseDTO<UserDTO> GetPagedUserList(UserParameters parameters)
        {
            var userList = _userRepository.GetPagedUserList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<UserDTO>>(userList);
            mappedResponse.Data = _mapper.Map<List<UserDTO>>(userList);

            return mappedResponse;
        }
    }
}
