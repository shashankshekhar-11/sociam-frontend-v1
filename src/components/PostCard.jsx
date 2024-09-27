import "./styles/PostCard.css";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTimeDifference } from "../utils/utilFunctions";
import { deletePost, likeOrDislikePost, bookmarkHandler } from "../utils/postHandler";
import { checkUserInteraction, checkIfBookmarked } from "../utils/utilFunctions";
import { openEditPostModal } from "../state/slices/modalSlice";
import { useNavigate, Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'; // Filled comment icon
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditIcon from '@mui/icons-material/Edit'; // Filled pencil icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((store) => store.auth);

    // Get the updated state of the post from Redux store
    const postData = useSelector((store) =>
        store.posts.postList.find((p) => p._id === post._id)
    ) || post; // Fallback to prop if not found

    const likeCount = postData?.likes?.length || 0;
    const likedByList = postData?.likes || [];
    
    const isLikedByUser = checkUserInteraction(likedByList, userData?._id);
    const isBookmarkedByUser = checkIfBookmarked(userData?.bookmarks, postData);

    const likeHandler = () => {
        dispatch(likeOrDislikePost({ _id: postData?._id }));
    };

    const handleBookmark = () => {
        dispatch(bookmarkHandler({ _id: postData?._id }));
    };

    return (
        <div className='postcard-div'>
            <div className="postcard-header">
                <div className="suggested-user-img">
                    <img 
                        src={postData?.user?.avatar ? postData.user.avatar : "https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"} 
                        alt={postData?.user?.name} 
                    />
                </div>
                <div>
                    {/* person's profile */}
                    <Link to={postData?.user?.email === userData?.email ? `/profile` : `/profile/${userData?._id}`} className="postcard-info-div">
                        <p className="postcard-info-name">{postData?.user?.name}</p>
                        <p className="postcard-info-username">@{postData?.user?.email.split('@')[0]}</p>
                    </Link>
                    <p className="postcard-info-timestamp">{getTimeDifference(postData?.createdAt)}</p>
                </div>
            </div>

            <div className="postcard-content">
                <p>{postData?.content}</p>
            </div>

            <div className="postcard-action-div">
                {/* Like icon */}
                <div className="postcard-action" onClick={likeHandler}>
                    {isLikedByUser ? (
                        <FavoriteOutlinedIcon className="liked" />
                    ) : (
                        <FavoriteBorderOutlinedIcon />
                    )}
                    <p className={isLikedByUser ? "liked" : ""}>{likeCount}</p>
                </div>

                {/* Comment icon */}
                <div className="postcard-action" onClick={() => navigate(`/post/${postData?._id}`)}>
                    {postData?.comments?.length > 0 ? (
                        <ChatBubbleIcon className="commented" />
                    ) : (
                        <ChatBubbleOutlineOutlinedIcon />
                    )}
                    <p>{postData?.comments?.length}</p>
                </div>

                {/* Bookmark icon */}
                <div className="postcard-action" onClick={handleBookmark}>
                    {isBookmarkedByUser ? (
                        <BookmarkOutlinedIcon className="bookmarked" />
                    ) : (
                        <BookmarkBorderOutlinedIcon />
                    )}
                </div>

                {/* Edit (pencil) icon */}
                {postData?.user?.email === userData?.email && (
                    <div className="postcard-action" onClick={() => dispatch(openEditPostModal({ post: postData }))}>
                        <EditIcon className="editable" />
                    </div>
                )}

                {/* Delete icon */}
                {postData?.user?.email === userData?.email && (
                    <div className="postcard-action">
                        <DeleteOutlinedIcon onClick={() => dispatch(deletePost(postData))} />
                    </div>
                )}
            </div>
        </div>
    )
}
