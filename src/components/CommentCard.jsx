import "./styles/PostCard.css";
import React from 'react';
import { getTimeDifference } from "../utils/utilFunctions";

export default function CommentCard({ comment }) {
    // Assume comment contains user information as `comment.user`
    const { user, content, createdAt } = comment;
    return (
        <div className='postcard-div'>

            <div className="comment-header">
                <div className="suggested-user-img">
                    {/* Use `user.avatar` directly if available */}
                    <img 
                        src={user?.avatar || "https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"} 
                        alt={user?.name} 
                    />
                </div>

                <p className="postcard-info-name">@{user?.name}</p>
            </div>

            <div className="postcard-content">
                {/* Display the content of the comment */}
                <p>{content}</p>
            </div>

            {/* Optionally show the time difference */}
            <div className="postcard-timestamp">
                <small>{getTimeDifference(createdAt)}</small>
            </div>

        </div>
    );
}
