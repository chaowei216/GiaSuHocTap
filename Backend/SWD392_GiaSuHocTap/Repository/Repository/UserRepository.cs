using Common.Constant.Teaching;
using Common.Constant.TimeTable;
using Common.DTO;
using Common.DTO.Feedback;
using Common.DTO.Query;
using Common.DTO.User;
using Common.Enum;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;

namespace Repository.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IGenericDAO<User> _userDAO;
        private readonly IGenericDAO<TutorDetail> _tutorDetailDAO;

        public UserRepository(IGenericDAO<User> userDAO,
                              IGenericDAO<TutorDetail> tutorDetailDAO)
        {
            _userDAO = userDAO;
            _tutorDetailDAO = tutorDetailDAO;
        }

        public async Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail)
        {
            return await _tutorDetailDAO.AddAsync(tutorDetail);
        }

        public async Task<User> AddNewParent(User parent)
        {
            return await _userDAO.AddAsync(parent);
        }

        public async Task<User> AddNewTutor(User tutor)
        {
            return await _userDAO.AddAsync(tutor);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userDAO.GetAll().AsEnumerable();
        }

        public User? GetUserByEmail(string email)
        {
            return _userDAO.GetByCondition(u => u.Email == email).FirstOrDefault();
        }

        public User? GetUserByPhone(string phone)
        {
            return _userDAO.GetByCondition(u => u.Phonenumber == phone).FirstOrDefault();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _userDAO.GetByIdAsync(id);
        }

        public async Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail)
        {
            return await _tutorDetailDAO.UpdateAsync(tutorDetail);
        }

        public async Task<User> UpdateUser(User user)
        {
            return await _userDAO.UpdateAsync(user);
        }

        public PagedList<User> GetPagedUserList(UserParameters parameters)
        {
            return PagedList<User>.ToPagedList(_userDAO.GetAll().Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables), parameters.PageNumber, parameters.PageSize);
        }

        public IEnumerable<User>? GetUserByStatus(UserStatusEnum status)
        {
            return _userDAO.GetByCondition(u => u.Status == status);
        }

        public PagedList<User> GetPagedPendingUserList(UserParameters parameters)
        {
            return PagedList<User>.ToPagedList(_userDAO.GetAll().Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).Where(u => u.Status == UserStatusEnum.Pending), parameters.PageNumber, parameters.PageSize); ;
        }

        public PagedList<User> GetPagedActiveUserList(UserParameters parameters)
        {
            return PagedList<User>.ToPagedList(_userDAO.GetAll().Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).Where(u => u.Status == UserStatusEnum.Active), parameters.PageNumber, parameters.PageSize);
        }

        public IEnumerable<User> GetTutorTeachOnline(TutorParameters parameters)
        {
            var onlineTutors = _userDAO.GetAll().Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).Where(u => u.TutorDetail.TeachingOnline == true);

            if (!string.IsNullOrEmpty(parameters.Name))
            {
                onlineTutors = onlineTutors.Where(p => p.Fullname.ToLower().Contains(parameters.Name.ToLower()));
            }

            if (parameters.ClassId != null)
            {
                onlineTutors = onlineTutors.Where(p => p.UserClasses.Select(p => p.ClassId).Distinct().ToList().Contains((int)parameters.ClassId));
            }

            if (parameters.CourseId != null)
            {
                onlineTutors = onlineTutors.Where(p => p.UserCourses.Select(p => p.CourseId).Distinct().ToList().Contains((int)parameters.CourseId));
            }

            return PagedList<User>.ToPagedList(onlineTutors, parameters.PageNumber, parameters.PageSize);
        }

        public IEnumerable<User> GetTutorTeachOffline(TutorParameters parameters)
        {
            var offlineTutors = _userDAO.GetAll().Include(d => d.TutorDetail).Where(u => u.TutorDetail.TeachingOffline == true).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course)
                                            .Include(d => d.TimeTables).Where(p => p.TimeTables != null && p.TimeTables.Any() && p.TimeTables.Where(p => p.LearningType == LearningType.Offline).First().Status == TimeTableConst.FreeStatus);

            if (!string.IsNullOrEmpty(parameters.Name))
            {
                offlineTutors = offlineTutors.Where(p => p.Fullname.ToLower().Contains(parameters.Name.ToLower()));
            }

            if (parameters.ClassId != null)
            {
                offlineTutors = offlineTutors.Where(p => p.UserClasses.Select(p => p.ClassId).Distinct().ToList().Contains((int)parameters.ClassId));
            }

            if (parameters.CourseId != null)
            {
                offlineTutors = offlineTutors.Where(p => p.UserCourses.Select(p => p.CourseId).Distinct().ToList().Contains((int)parameters.CourseId));
            }

            return PagedList<User>.ToPagedList(offlineTutors, parameters.PageNumber, parameters.PageSize);
        }

        public User? GetUserByEmailInclude(string email)
        {
            return _userDAO.GetAll().Where(d => d.Email == email).Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).Include(d => d.FromFeedbacks).Include(d => d.ToFeedbacks).FirstOrDefault();
        }

        public IEnumerable<User> GetTopTutorByFeedBack(IEnumerable<Feedback> feedbacks)
        {
            var tutors = _userDAO.GetAll().Where(p => p.RoleId == (int)RoleEnum.Tutor).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).ToList();

            var tutorScores = (from t in tutors
                               let ratingCount = feedbacks.Count(r => r.ToId == t.UserId)
                               let averageRating = feedbacks.Any(r => r.ToId == t.UserId)
                                                    ? feedbacks.Where(r => r.ToId == t.UserId).Average(r => r.Rating)
                                                    : 0
                               select new TutorScoreDTO()
                               {
                                   TutorId = t.UserId,
                                   RatingCount = ratingCount,
                                   AverageRating = averageRating
                               });

            foreach (var t in tutorScores)
            {
                t.Score = (t.RatingCount * 0.6) + (t.AverageRating * 0.4);
            }

            var topScores = tutorScores.OrderByDescending(p => p.Score).Select(p => p.TutorId).Take(6);

            return tutors.Where(p => topScores.Contains(p.UserId)).ToList();
        }

        public async Task<TutorDetail?> GetTutorDetailByTutorId(int id)
        {
            return await _tutorDetailDAO.GetByCondition(p => p.UserId == id).FirstOrDefaultAsync();
        }

        public PagedList<User> GetPagedTutorList(UserParameters parameters)
        {
            return PagedList<User>.ToPagedList(_userDAO.GetAll().Include(d => d.TutorDetail).Include(d => d.UserClasses).ThenInclude(d => d.Class).Include(d => d.UserCourses).ThenInclude(d => d.Course).Include(d => d.TimeTables).Where(d => d.RoleId == (int)RoleEnum.Tutor && d.Status == UserStatusEnum.Active), parameters.PageNumber, parameters.PageSize);
        }
    }
}
