import React from 'react';
import "./styles/Styles.css";
import { SideNav, Header, SuggestionBar, ProfileComponent, PostCard, EditProfileModal } from '../components/index';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getAllPosts } from '../utils/postHandler';
import { useParams } from "react-router-dom";
import { getUser } from '../utils/userHandler';

const UsersProfile = () => {

    const [shownUser, setShownUser] = useState();
    const { userData, authToken } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const { userList } = useSelector((store) => store.users)
    const { postList } = useSelector((store) => store.posts);
    const { isEditProfileModalOpen } = useSelector((store) => store.modal);
    const { username } = useParams();

    const checkIfAlreadyFollowed = (currentUsername) => {
        return userData?.following.find((user) => user.username === currentUsername)
    }

    const findUserId = (username) => {
        const foundUser = userList?.find((user) => user.username === username);
        return foundUser._id;
    }

    const getUsersPosts = (username) => {
        return postList?.filter((item) => item.username === username);
      };    

      useEffect(() => {
        (async () => {
          const { user } = await getUser(findUserId(username));
          setShownUser(user);
        })();
      }, [username, userList]);


    return (

        <div>

            {isEditProfileModalOpen && <EditProfileModal />}

            <Header />
            <div className="page-content">

                <SideNav />

                <div className="main-content">

                    {shownUser && <ProfileComponent userInfo={shownUser} />}
                 
                 <div className='line-div other-user-line-div' ></div>

                    
                    {getUsersPosts(username)?.map((post) => <PostCard post={post} key={post._id} />)}
                    

                </div>

                <SuggestionBar />

            </div>

        </div>
    )
}

export default UsersProfile;
