﻿using Common.DTO.Feedback;
using Common.DTO.Report;
using Common.DTO.TimeTable;
using Common.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class TutorDTO
    {
        public int UserId { get; set; }
        public string Fullname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phonenumber { get; set; } = null!;
        public string DateOfBirth { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string District { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public bool IsVerified { get; set; }
        public int CoinBalance { get; set; }
        public string? IdentityNumber { get; set; }
        public List<string>? IdentityImage { get; set; }
        public string? UserImage { get; set; } = null!;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatusEnum Status { get; set; }
        public int NumberOfReport { get; set; }
        public string? YoutubeLink { get; set; }
        public string RoleName { get; set; } = null!;
        public TutorDetailDTO TutorDetail { get; set; } = null!;
        public ICollection<UserClassDTO> UserClasses { get; set; } = null!;
        public ICollection<UserCourseDTO> UserCourses { get; set; } = null!;
        public ICollection<TimetableDTO> TimeTables { get; set; } = null!;
        public ICollection<FeedbackDTO> FromFeedbacks { get; set; } = null!;
        public ICollection<FeedbackDTO> ToFeedbacks { get; set; } = null!;
        public ICollection<ReportDTO> FromReports { get; set; } = null!;
        public ICollection<ReportDTO> ToReports { get; set; } = null!;

    }
}
