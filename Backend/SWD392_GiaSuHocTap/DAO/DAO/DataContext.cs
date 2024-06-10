using DAO.Model;
using Microsoft.EntityFrameworkCore;

namespace DAO.DAO
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        #region Entities
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestTime> RequestTimes { get; set; }
        public DbSet<TimeTable> TimeTables { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<UserClass> UserClasses { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<TutorDetail> TutorDetails { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region entities
            modelBuilder.Entity<Role>()
                .Property(x => x.RoleName)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(x => x.Status)
                .HasConversion<string>();
            #endregion

            #region 1_1 relationship
            modelBuilder.Entity<User>()
                .HasOne(t => t.TutorDetail)
                .WithOne(u => u.User);
            #endregion

            #region M_M relationship
            modelBuilder.Entity<UserClass>()
                .HasKey(uc => new { uc.ClassId, uc.UsertId });
            modelBuilder.Entity<UserClass>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserClasses)
                .HasForeignKey(uc => uc.UsertId);
            modelBuilder.Entity<UserClass>()
                .HasOne(uc => uc.Class)
                .WithMany(uc => uc.UserClasses)
                .HasForeignKey(uc => uc.ClassId);

            modelBuilder.Entity<UserNotification>()
                .HasKey(uc => new { uc.UsertId, uc.NotificationId });
            modelBuilder.Entity<UserNotification>()
                .HasOne(uc => uc.Notification)
                .WithMany(uc => uc.UserNotification)
                .HasForeignKey(uc => uc.NotificationId);
            modelBuilder.Entity<UserNotification>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserNotifications)
                .HasForeignKey(uc => uc.UsertId);

            modelBuilder.Entity<UserCourse>()
                .HasKey(uc => new { uc.UserId, uc.CourseId });
            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(uc => uc.UserCourses)
                .HasForeignKey(uc => uc.CourseId);
            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.User)
                .WithMany(uc => uc.UserCourses)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<RequestTime>()
                .HasKey(rt => new { rt.RequestId, rt.TimeTableId });
            modelBuilder.Entity<RequestTime>()
                .HasOne(rt => rt.Request)
                .WithMany(rt => rt.RequestTimes)
                .HasForeignKey(rt => rt.RequestId);
            modelBuilder.Entity<RequestTime>()
                .HasOne(rt => rt.TimeTable)
                .WithMany(rt => rt.RequestTimes)
                .HasForeignKey(rt => rt.TimeTableId);
            #endregion
        }

    }

}
