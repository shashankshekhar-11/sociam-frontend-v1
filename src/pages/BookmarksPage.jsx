import React from 'react';
import "./styles/Styles.css";
import { SideNav, Header, SuggestionBar, PostCard, EditPostModal } from '../components/index';
import { useSelector } from "react-redux";


const BookmarksPage = () => {

  const { postList } = useSelector((store) => store.posts);
  const { userData } = useSelector((store) => store.auth);
  const { isEditPostModalOpen } = useSelector((store) => store.modal);
  console.log(userData);
  const findPostfromId = (id) => {
    const post = postList.find((post) => post._id === id);
    if(post === undefined) { 
      return undefined
     } 
     else return post;
  };

  return (
    <div>
      {isEditPostModalOpen && <EditPostModal />}
      <Header />
      <div className="page-content">

        <SideNav />

        <div className="main-content">

          <div className='bookmark-heading-div'>

            <h2 className='home-heading bookmark-heading'>Bookmarks</h2>

            {(userData?.bookmarks?.length !== 0) ? <p className='bookmark-sub-heading'>Here are the posts that you bookmarked:</p> : null}

          </div>

          <div className='margin-bottom-class'>
            {(userData?.bookmarks?.length === 0) ?

              <div className='empty-bookmark-list-div'>
                <h1>Save Posts for later</h1>
                <p>Don't let the good ones fly away!</p>
                <p> Bookmark Posts to easily find them again in the future.</p>
              </div> :
              <div>
                {userData?.bookmarks?.map((id) => {
                  const post = findPostfromId(id); // Find the post once
                  return post ? <PostCard post={post} key={id} /> : null; // Render the post if found
                })}
              </div>
            }
          </div>
        </div>
          <SuggestionBar />
      </div>

    </div>
  )
}

export default BookmarksPage;
