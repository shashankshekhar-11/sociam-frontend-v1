import React  from 'react';
import "./styles/Styles.css";
import { SideNav, CreatePost, Header, SuggestionBar, PostCard, EditPostModal } from '../components/index';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../utils/postHandler';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../utils/userHandler';

const HomePage=()=>{

  const dispatch = useDispatch();
  const [sortType, setSortType] = useState("Recent");
  const { postList } = useSelector((store) => store.posts);
  const { userData } = useSelector((store) => store.auth);
  const { isEditPostModalOpen } = useSelector((store) => store.modal);

  const relevantPosts = postList?.filter((post) => {
    const temp = userData?.following?.find((follower) => follower?.username === post?.username);
    if (temp || post?.username === userData?.username)
      return post;
  });

  const sortHandler = (type) => {
    setSortType(type);
  }

  useEffect(() => {
    dispatch(getAllUsers());
    if (postList.length === 0) {
      dispatch(getAllPosts());
    }
  }, []);

  return (
    <div>
      {isEditPostModalOpen && <EditPostModal />}
      <Header />
      <div className="page-content">

        <SideNav />

        <div className="main-content">

          <h2 className='home-heading'>Home</h2>

          <CreatePost />

          <div className="home-feed-sort-div">

            <div className={`home-feed-sort-div-component ${sortType === "Recent" ? "sort-active" : null}`} onClick={() => sortHandler("Recent")}>
              <p>Recent First</p>
            </div>

            <div  className={`home-feed-sort-div-component ${sortType === "Older" ? "sort-active" : null}`} onClick={() => sortHandler("Older")}>
              <p>Older First</p>
            </div>
          </div>

          <div className={sortType === "Recent" ? "newest-first-class margin-bottom-class" : "older-first-class margin-bottom-class"}>
            {relevantPosts?.map((post) => <PostCard post={post} key={post._id} />)}
          </div>
        </div>

        <SuggestionBar />

      </div>

    </div>
  )
}

export default HomePage;