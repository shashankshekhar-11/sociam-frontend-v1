import "./styles/ProfileComponent.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openEditProfileModal } from "../state/slices/modalSlice";
import { handleFriendshipToggle } from "../utils/friendshipHandler";

export default function ProfileComponent({ userInfo }) {
  const dispatch = useDispatch();
  const { userData, authToken } = useSelector((state) => state.auth);

  // Get the postList from Redux
  const { postList } = useSelector((state) => state.posts);

  // Calculate the post count for the user
  const postCount = postList?.filter((post) => post.user._id === userInfo._id).length || 0;

  // Function to check if the current user is already friends with userInfo
  const checkIfAlreadyFriends = () => {
    // Assuming userData.friendships is an array of friendship objects populated with from_user and to_user
    return userData?.friendships?.some((friendship) => {
      return (
        friendship.from_user._id === userInfo._id ||
        friendship.to_user._id === userInfo._id
      );
    });
  };

  // Function to handle friendship toggle
  const friendshipToggle = () => {
    handleFriendshipToggle(
      { friendUserId: userInfo._id },
      authToken,
      dispatch
    );
  };

  return (
    <div>
      <div className="profile-head-div">
        <div className="profile-bg-div">
          <div className="profile-logo-img">
            <img
              src="https://res.cloudinary.com/dea6nwzhg/image/upload/v1713531307/Sociam_assets/sociamNamedTaglineBlack_zf3fun.png"
              alt="pp-logo"
            />
          </div>
        </div>

        <div className="profile-img">
          <img
            src={
              userInfo.avatar ||
              "https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"
            }
            alt={userInfo.name}
          />
          {/* some error here */}
        </div>
      </div>

      <div className="edit-profile-btn-div">
        {userInfo._id === userData._id ? (
          <button
            className="suggest-follow-btn edit-profile-btn"
            onClick={() => dispatch(openEditProfileModal())}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="suggest-follow-btn edit-profile-btn"
            onClick={friendshipToggle}
          >
            {checkIfAlreadyFriends() ? "Unfriend" : "Add Friend"}
          </button>
        )}
      </div>

      <div className="profile-name-div">
        <p className="profile-name">{userInfo.name}</p>
        <p className="profile-username">
          @{userInfo.email.split("@")[0]}
        </p>
      </div>

      <div className="profile-bio-div">
        <p className="profile-bio">{userInfo.bio}</p>
        <a
          className="portfolio-url"
          target="_blank"
          rel="noopener noreferrer"
          href={userInfo.portfolioUrl}
        >
          {userInfo.portfolioUrl}
        </a>
      </div>

      <div className="profile-stats-div" style={{marginTop:'-10px'}}>
          <div className="profile-stat">
            <p className="profile-stat-num">{postCount || 0}</p>
            <p className="profile-stat-type">Posts</p>
          </div>

          <div className="profile-stat">
            <p className="profile-stat-num">
              {userInfo?.friendships?.length || 0}
            </p>
            <p className="profile-stat-type">Friends</p>
          </div>
        </div>

    </div>
  );
}
