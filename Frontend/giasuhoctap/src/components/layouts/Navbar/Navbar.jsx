import style from "./style.module.css"
import avatar from "/img/avatar.png"
import logoEdu from "/img/logoEdu.png"
export default function Navbar() {
    const handleLogout = () => {
        console.log("log out");
    }
    return (
        <div className={style.main}>
            <img src={logoEdu} alt="avatar logo" width={120} />
            <div>
                <div>
                    {/* <img src={uniGateLogoImg} alt="uniGate logo" className={style.logo} /> */}
                    <span>uniGate</span>
                </div>

                {/* {token && ( */}
                <div className={style.userContainer}>
                    <img
                        src={avatar}
                        alt="User avatar"
                        className={`${style.logo} ${style.avatar}`}
                        //onClick={() => navigate("/profile")}
                        style={{ cursor: "pointer" }}
                    />
                    <div className={style.dropdownMenu}>
                        <button
                            //onClick={() => navigate("/profile")}
                            style={{ cursor: "pointer" }}
                        >
                            View Profile
                        </button>
                        <button style={{ cursor: "pointer" }} onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                </div>
                {/* )} */}
            </div>
        </div>
    )
}
