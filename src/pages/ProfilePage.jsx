import React, { useState, useEffect } from 'react';
import "./styles/Styles.css";
import { SideNav, Header, SuggestionBar, ProfileComponent, PostCard, EditProfileModal, FriendCard } from '../components/index';
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from '../utils/postHandler';

const ProfilePage = () => {
  const [isPostFeed, setIsPostFeed] = useState(true);
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { postList } = useSelector((store) => store.posts);
  const { isEditProfileModalOpen } = useSelector((store) => store.modal);

  // Filter posts created by the current user
  const relevantPosts = postList?.filter((post) => post.user._id === userData._id);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(getAllPosts());
    }
  }, [dispatch, postList.length]);

  // Handler for displaying friends
  const profileFriendHandler = () => {
    setIsPostFeed(false);
  };

  // Handler for displaying posts
  const profileFeedHandler = () => {
    setIsPostFeed(true);
  };

  return (
    <div>
      {isEditProfileModalOpen && <EditProfileModal />}
      <Header />
      <div className="page-content">
        <SideNav />

        <div className="main-content">
          <ProfileComponent userInfo={userData} />

          <div className="home-feed-sort-div" style={{marginTop:"5px"}}>
            <div
              className={`home-feed-sort-div-component ${isPostFeed ? "sort-active" : ""}`}
              onClick={profileFeedHandler}
            >
              <p>Posts</p>
            </div>
            <div
              className={`home-feed-sort-div-component ${!isPostFeed ? "sort-active" : ""}`}
              onClick={profileFriendHandler}
            >
              <p>Friends</p>
            </div>
          </div>

          {/* Content based on selected tab */}
          <div className="margin-bottom-class">
            {isPostFeed ? (
              relevantPosts?.map((post) => <PostCard post={post} key={post._id} />)
            ) : (
              userData.friendships?.map((friendship) => (
                // Pass correct friend ID to FriendCard
                <FriendCard
                  key={friendship._id}
                  friendId={
                    friendship.from_user === userData._id
                      ? friendship.to_user
                      : friendship.from_user
                  }
                />
              ))
            )}
          </div>
        </div>

        <SuggestionBar />
      </div>
    </div>
  );
};

export default ProfilePage;
