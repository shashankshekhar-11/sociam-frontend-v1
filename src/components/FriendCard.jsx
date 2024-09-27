import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./styles/FriendCard.css";
import { handleFriendshipToggle } from '../utils/friendshipHandler';

export default function FriendCard({ friendId }) {
  const { userList, userStatus } = useSelector((store) => store.users);
  const { authToken, userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Find the user details based on the ID
  const friendUser = userList.find(user => user._id === friendId);

  // Derive the initial `areFriends` state from the `userData.friendships`
  const initialAreFriends = userData.friendships?.some(
    (friendship) => friendship.from_user === friendId || friendship.to_user === friendId
  );

  const [areFriends, setAreFriends] = useState(initialAreFriends);

  // Handle friendship toggle
  const toggleFriendship = async () => {
    try {
      const response = await handleFriendshipToggle({ friendUserId: friendId }, authToken, dispatch);
      setAreFriends(response?.data?.areFriends);
    } catch (error) {
      console.error("Error toggling friendship:", error);
    }
  };

  // Return nothing if friend is not found or user data is still loading
  if (!friendUser || userStatus !== "success") return null;

  return (
    <div className="friendcard-div">
      <div className="friendcard-header">
        <div className="friend-user-img">
          <img
            src={
              friendUser.avatar ||
              "https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"
            }
            alt={friendUser.name}
          />
        </div>
        <div className="friendcard-info-button">
          <Link to={`/profile/${friendUser._id}`} className="friendcard-info-div">
            <p className="friendcard-info-name">{friendUser.name}</p>
            <p className="friendcard-info-username">@{friendUser.email.split('@')[0]}</p>
          </Link>
          <button
            className={`suggest-follow-btn ${areFriends ? 'unfriend-btn' : 'friend-btn'}`}
            onClick={toggleFriendship}
          >
            {areFriends ? 'Unfriend' : 'Friend +'}
          </button>
        </div>
      </div>
    </div>
  );
}
