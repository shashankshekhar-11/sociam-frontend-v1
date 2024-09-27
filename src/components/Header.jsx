import "./styles/Header.css";
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/slices/authSlice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        dispatch(logout());
        navigate("/login", {replace: true})
    }

    return (
        <div className="header flex-sb">

            <div className="header-logo flex-align-center">

                <div className="header-logo-img">
                    <img src="https://res.cloudinary.com/dea6nwzhg/image/upload/v1713531309/Sociam_assets/sociamLogo_vksazj.png" alt="pp-logo" />
                </div>
                <h1 className="text-xl logo-text">Sociam</h1>

            </div>

            <button className="btn primary-btn flex-sb logout-btn" onClick={logoutHandler}><LogoutOutlinedIcon/>Logout</button>
        </div>
    )
}
