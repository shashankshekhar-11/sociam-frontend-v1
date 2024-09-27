import React from 'react';
import "./styles/SideNav.css";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const SideNav = () => {
    return (
        <div className="sidenav-menu">

            <NavLink to="/home" className="menu-item">
                <HomeOutlinedIcon />
                <p>Home</p>
            </NavLink>

            <NavLink to="/explore" className="menu-item">
                <ExploreOutlinedIcon />
                <p>Explore</p>
            </NavLink>

            <NavLink to="/bookmarks" className="menu-item">
                <BookmarkBorderOutlinedIcon />
                <p>Bookmarks</p>
            </NavLink>

            <NavLink to="/profile" className="menu-item">
                <PersonOutlineOutlinedIcon />
                <p>Profile</p>
            </NavLink>

        </div>
    )
}

export default SideNav;
