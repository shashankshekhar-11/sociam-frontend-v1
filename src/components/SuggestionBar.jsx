import React, { useEffect } from 'react';
import "./styles/SuggestionBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../utils/userHandler';
import SuggestedCard from './SuggestedCard';

const SuggestionBar = () => {
  const { userList } = useSelector((state) => state.users);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Find suggested users excluding current user and current friends
  const findSuggestions = () => {
    if (!userData || !userData.friendships) return [];

    return userList.filter(user => 
      user._id !== userData._id &&
      userData.friendships.some(friendship =>
        friendship.from_user === user._id || friendship.to_user === user._id
      ) === false // Ensure not already a friend
    );
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="suggestion-bar">
      <h2 className='suggestion-heading'>Suggested Friends</h2>
      {findSuggestions().map((user) => (
        <SuggestedCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default SuggestionBar;
