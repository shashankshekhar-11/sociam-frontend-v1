import React  from 'react';
import "./styles/Styles.css";
import { SideNav, Header, SuggestionBar, PostCard, EditPostModal } from '../components/index';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../utils/postHandler';
import { useEffect } from 'react';

const ExplorePage=()=>{

  const dispatch = useDispatch();
  const { postList } = useSelector((store) => store.posts);
  const { isEditPostModalOpen } = useSelector((store) => store.modal);
  const trendingPostList = [...postList].sort(
    (a, b) => b?.likes?.likeCount - a?.likes?.likeCount
  );

  useEffect(() => {
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

          <div className='bookmark-heading-div'>

            <h2 className='home-heading bookmark-heading'>Explore</h2>
            <p className='bookmark-sub-heading'>This is explore. Check out posts that are trending even from the people you don't follow</p>
          </div>

          <div className='margin-bottom-class'>

            {trendingPostList?.map((post) => <PostCard post={post} key={post._id} />)}
          </div>

        </div>

        <SuggestionBar />

      </div>

    </div>
  )
}

export default ExplorePage;