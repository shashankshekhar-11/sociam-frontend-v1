import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../utils/userHandler";

const initialState = {
  userList: [],
  userStatus: "idle",
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUserList: (state, action) => {
            const { userId, areFriends } = action.payload;
            state.userList = state.userList.map((user) => {
                if (user._id === userId) {
                    // Only update the areFriends status in the user list
                    return { ...user, areFriends };
                }
                return user;
            });
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) => {
            state.userStatus = "pending";
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.userList = action.payload?.users || [];
            state.userStatus = "success";
        })
        .addCase(getAllUsers.rejected, (state) => {
            state.userStatus = "failed";
        });
    }
});

export const { updateUserList } = userSlice.actions;
export const userReducer = userSlice.reducer;
