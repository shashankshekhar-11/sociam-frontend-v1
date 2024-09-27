import React, { useEffect } from 'react';
import "./styles/Styles.css";
import { SideNav, Header, SuggestionBar, PostCard, EditPostModal, CommentCard, CommentInput } from '../components/index';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsOfPost } from "../utils/commentHandler";

export default function SinglePostPage() {
    const dispatch = useDispatch();
    const { postList } = useSelector((store) => store.posts);
    const { comments } = useSelector((state) => state.comments);
    const { isEditPostModalOpen } = useSelector((store) => store.modal);
    const { id } = useParams();

    // Find the post with the specific ID
    const requiredPost = postList.find((post) => post._id === id);

    // Fetch comments when the post ID changes
    useEffect(() => {
        if (id) {
            dispatch(getCommentsOfPost(id));
        }
    }, [id, dispatch]);

    return (
        <div>
            {isEditPostModalOpen && <EditPostModal />}
            <Header />
            <div className="page-content">
                <SideNav />
                <div className="main-content">

                    {/* Display the post */}
                    {requiredPost && <PostCard post={requiredPost} />}

                    {/* Input for adding a new comment */}
                    {requiredPost && <CommentInput post={requiredPost} />}

                    {/* Display all comments for the post */}
                    <div className='newest-first-class margin-bottom-class'>
                        {comments && comments?.length > 0 ? (
                            comments?.map((comment) => (
                                <CommentCard 
                                    key={comment._id} 
                                    comment={comment} // Pass the whole comment object
                                />
                            ))
                        ) : undefined}
                    </div>

                </div>

                <SuggestionBar />
            </div>
        </div>
    );
}
