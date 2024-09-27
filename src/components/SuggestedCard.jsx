import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/SuggestionBar.css"; // Assuming you use the same CSS file
import { handleFriendshipToggle } from '../utils/friendshipHandler';
import { useSelector, useDispatch } from "react-redux";

const SuggestedCard = ({ user }) => {
  const dispatch = useDispatch();
  const { authToken, userData } = useSelector((state) => state.auth);

  // Initialize isFriend state based on userData
  const [isFriend, setIsFriend] = useState(
    userData.friendships.some(
      (friendship) => friendship.from_user === user._id || friendship.to_user === user._id
    )
  );

  // Toggle friendship status and update the button style
  const toggleFriendship = async () => {
    try {
      const response = await handleFriendshipToggle({ friendUserId: user._id }, authToken, dispatch);
      if (response.data.data.areFriends !== undefined) {
        setIsFriend(response.data.data.areFriends);
      }
    } catch (error) {
      console.error("Error toggling friendship:", error);
    }
  };

  return (
    <div className='suggestion-div'>
      <div className="suggested-user-div flex-align-center">
        <div className="suggested-user-img">
          <img
            src={
              user.avatar
                ? user.avatar
                : "https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"
            }
            alt={user.email}
          />
        </div>
        <Link to={`/profile/${user._id}`} className='suggested-user-info-div'>
          <p className='suggested-user-name'>{user.name}</p>
          <small className="suggested-user-username">@{user.email.split('@')[0]}</small>
        </Link>
      </div>
      <button
        className={`suggest-follow-btn ${isFriend ? 'unfriend-btn' : 'add-friend-btn'}`}
        onClick={toggleFriendship}
      >
        {isFriend ? 'Unfriend' : 'Friend +'}
      </button>
    </div>
  );
};

export default SuggestedCard;
