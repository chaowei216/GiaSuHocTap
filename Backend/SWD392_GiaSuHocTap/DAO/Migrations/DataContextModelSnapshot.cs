﻿// <auto-generated />
using System;
using DAO.DAO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DAO.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("DAO.Model.Class", b =>
                {
                    b.Property<int>("ClassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ClassId"));

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ClassId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("DAO.Model.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CourseId"));

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.HasKey("CourseId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("DAO.Model.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("FeedbackId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FromId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("ToId")
                        .HasColumnType("int");

                    b.HasKey("FeedbackId");

                    b.HasIndex("FromId");

                    b.HasIndex("ToId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("DAO.Model.News", b =>
                {
                    b.Property<int>("NewsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("NewsId"));

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("NewsId");

                    b.HasIndex("UserId");

                    b.ToTable("News");
                });

            modelBuilder.Entity("DAO.Model.Notification", b =>
                {
                    b.Property<int>("NotificationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("NotificationId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NotificationType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("NotificationId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("DAO.Model.RefreshToken", b =>
                {
                    b.Property<int>("RefreshId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RefreshId"));

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateExpired")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsRevoked")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("JwtId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("RefreshId");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("DAO.Model.Report", b =>
                {
                    b.Property<int>("ReportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ReportId"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FromId")
                        .HasColumnType("int");

                    b.Property<string>("ReportTitle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ToId")
                        .HasColumnType("int");

                    b.HasKey("ReportId");

                    b.HasIndex("FromId");

                    b.HasIndex("ToId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("DAO.Model.Request", b =>
                {
                    b.Property<int>("RequestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RequestId"));

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CretaeDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FromId")
                        .HasColumnType("int");

                    b.Property<string>("LinkMeet")
                        .HasColumnType("longtext");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<string>("RequestType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("RequestId");

                    b.HasIndex("ClassId");

                    b.HasIndex("CourseId");

                    b.HasIndex("FromId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("DAO.Model.RequestTime", b =>
                {
                    b.Property<int>("RequestId")
                        .HasColumnType("int");

                    b.Property<int>("TimeTableId")
                        .HasColumnType("int");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("RequestId", "TimeTableId");

                    b.HasIndex("TimeTableId");

                    b.ToTable("RequestTimes");
                });

            modelBuilder.Entity("DAO.Model.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(24)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("DAO.Model.TimeTable", b =>
                {
                    b.Property<int>("TimeTableId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("TimeTableId"));

                    b.Property<string>("DayOfWeek")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LearningType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Period")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TimeTableId");

                    b.HasIndex("UserId");

                    b.ToTable("TimeTables");
                });

            modelBuilder.Entity("DAO.Model.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("TransactionId"));

                    b.Property<double>("Amout")
                        .HasColumnType("double");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("TransactionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("TransactionInfo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("DAO.Model.TutorDetail", b =>
                {
                    b.Property<int>("TutorDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("TutorDetailId"));

                    b.Property<string>("CertificateImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Job")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Major")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("NumberOfRent")
                        .HasColumnType("int");

                    b.Property<int>("RentHour")
                        .HasColumnType("int");

                    b.Property<bool>("TeachingOffline")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("TeachingOnline")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TutorDetailId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("TutorDetails");
                });

            modelBuilder.Entity("DAO.Model.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CoinBalance")
                        .HasColumnType("int");

                    b.Property<string>("DateOfBirth")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("IdentityImage")
                        .HasColumnType("longtext");

                    b.Property<string>("IdentityNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("NumberOfReport")
                        .HasColumnType("int");

                    b.Property<string>("Otp")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("OtpExpiredTime")
                        .HasColumnType("datetime(6)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<string>("Phonenumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ResetPassToken")
                        .HasColumnType("longtext");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(24)");

                    b.Property<string>("UserImage")
                        .HasColumnType("longtext");

                    b.Property<string>("YoutubeLink")
                        .HasColumnType("longtext");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DAO.Model.UserClass", b =>
                {
                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ClassId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserClasses");
                });

            modelBuilder.Entity("DAO.Model.UserCourse", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("UserCourses");
                });

            modelBuilder.Entity("DAO.Model.UserNotification", b =>
                {
                    b.Property<int>("UsertId")
                        .HasColumnType("int");

                    b.Property<int>("NotificationId")
                        .HasColumnType("int");

                    b.HasKey("UsertId", "NotificationId");

                    b.HasIndex("NotificationId");

                    b.ToTable("UserNotifications");
                });

            modelBuilder.Entity("DAO.Model.Feedback", b =>
                {
                    b.HasOne("DAO.Model.User", "From")
                        .WithMany()
                        .HasForeignKey("FromId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "To")
                        .WithMany()
                        .HasForeignKey("ToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("From");

                    b.Navigation("To");
                });

            modelBuilder.Entity("DAO.Model.News", b =>
                {
                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("News")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.RefreshToken", b =>
                {
                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.Report", b =>
                {
                    b.HasOne("DAO.Model.User", "From")
                        .WithMany()
                        .HasForeignKey("FromId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "To")
                        .WithMany()
                        .HasForeignKey("ToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("From");

                    b.Navigation("To");
                });

            modelBuilder.Entity("DAO.Model.Request", b =>
                {
                    b.HasOne("DAO.Model.Class", "Class")
                        .WithMany("Requests")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.Course", "Course")
                        .WithMany("Requests")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "From")
                        .WithMany()
                        .HasForeignKey("FromId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Course");

                    b.Navigation("From");
                });

            modelBuilder.Entity("DAO.Model.RequestTime", b =>
                {
                    b.HasOne("DAO.Model.Request", "Request")
                        .WithMany("RequestTimes")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.TimeTable", "TimeTable")
                        .WithMany("RequestTimes")
                        .HasForeignKey("TimeTableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");

                    b.Navigation("TimeTable");
                });

            modelBuilder.Entity("DAO.Model.TimeTable", b =>
                {
                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("TimeTables")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.Transaction", b =>
                {
                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("Transactions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.TutorDetail", b =>
                {
                    b.HasOne("DAO.Model.User", "User")
                        .WithOne("TutorDetail")
                        .HasForeignKey("DAO.Model.TutorDetail", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.User", b =>
                {
                    b.HasOne("DAO.Model.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("DAO.Model.UserClass", b =>
                {
                    b.HasOne("DAO.Model.Class", "Class")
                        .WithMany("UserClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("UserClasses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.UserCourse", b =>
                {
                    b.HasOne("DAO.Model.Course", "Course")
                        .WithMany("UserCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("UserCourses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.UserNotification", b =>
                {
                    b.HasOne("DAO.Model.Notification", "Notification")
                        .WithMany("UserNotification")
                        .HasForeignKey("NotificationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAO.Model.User", "User")
                        .WithMany("UserNotifications")
                        .HasForeignKey("UsertId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Notification");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAO.Model.Class", b =>
                {
                    b.Navigation("Requests");

                    b.Navigation("UserClasses");
                });

            modelBuilder.Entity("DAO.Model.Course", b =>
                {
                    b.Navigation("Requests");

                    b.Navigation("UserCourses");
                });

            modelBuilder.Entity("DAO.Model.Notification", b =>
                {
                    b.Navigation("UserNotification");
                });

            modelBuilder.Entity("DAO.Model.Request", b =>
                {
                    b.Navigation("RequestTimes");
                });

            modelBuilder.Entity("DAO.Model.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("DAO.Model.TimeTable", b =>
                {
                    b.Navigation("RequestTimes");
                });

            modelBuilder.Entity("DAO.Model.User", b =>
                {
                    b.Navigation("News");

                    b.Navigation("RefreshTokens");

                    b.Navigation("TimeTables");

                    b.Navigation("Transactions");

                    b.Navigation("TutorDetail")
                        .IsRequired();

                    b.Navigation("UserClasses");

                    b.Navigation("UserCourses");

                    b.Navigation("UserNotifications");
                });
#pragma warning restore 612, 618
        }
    }
}
