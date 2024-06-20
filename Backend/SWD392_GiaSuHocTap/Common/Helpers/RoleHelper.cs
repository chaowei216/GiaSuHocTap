using Common.Enum;

namespace Common.Helpers
{
    public static class RoleHelper
    {
        public static string GetRoleName(RoleEnum role)
        {
            switch (role)
            {
                case (RoleEnum)1:
                    return "Admin";
                case (RoleEnum)2:
                    return "Moderator";
                case (RoleEnum)3:
                    return "Tutor";
                case (RoleEnum)4:
                    return "Parents";
                default:
                    return role.ToString();
            }
        }
    }
}
