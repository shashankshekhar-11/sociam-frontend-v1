import axios from "axios";
import { updateUser } from "../state/slices/authSlice";
import { updateUserList } from "../state/slices/userSlice";

export const handleFriendshipToggle = async (userMetaData, authToken, dispatch) => {
  try {
    const { friendUserId } = userMetaData;
    const res = await axios.post(
      `http://localhost:8000/api/v1/users/toggle-friendship/${friendUserId}`,
      {},
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const { data } = res;

    // Update the authenticated user's data if needed
    if (data.updatedFriendships) {
      dispatch(updateUser({ friendships: data.updatedFriendships }));
    }

    // Update the user list if you need to reflect changes in the UI
    if (data.data.areFriends !== undefined) {
      dispatch(updateUserList({ userId: friendUserId, areFriends: data.data.areFriends }));
    }

    return res; // Return the full response to the caller
  } catch (err) {
    console.error("Error in handleFriendshipToggle:", err.response ? err.response.data : err.message);
    throw err;
  }
};
