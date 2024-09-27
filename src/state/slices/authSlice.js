import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../../utils/handleAuth";
import { editUser } from "../../utils/userHandler";
import { bookmarkHandler } from "../../utils/postHandler";

const initialState = {
    authToken: localStorage.getItem("authToken") && localStorage.getItem("authToken") !== "undefined" ? JSON.parse(localStorage.getItem("authToken")) : "",
    userData: localStorage.getItem("userData") && localStorage.getItem("userData") !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null,
    authStatus: "idle",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authToken = "";
            state.userData = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
        },
        updateUser: (state, action) => {
            // console.log("Updating the user with the data:", action.payload);
            state.userData = {
                ...state.userData,  // Preserve existing user data
                ...action.payload,  // Merge new data
            };
            // Update localStorage if needed
            localStorage.setItem("userData", JSON.stringify(state.userData));
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup User
            .addCase(signupUser.pending, (state) => {
                state.authStatus = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.authToken = action.payload.encodedToken;
                state.userData = action.payload.createdUser;
                state.authStatus = 'success';
                localStorage.setItem("authToken", JSON.stringify(action.payload.encodedToken));
                localStorage.setItem("userData", JSON.stringify(action.payload.createdUser));
            })
            .addCase(signupUser.rejected, (state) => {
                state.authStatus = "failed";
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.authStatus = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authToken = action.payload.encodedToken;
                state.userData = action.payload.foundUser;
                state.authStatus = 'success';
                localStorage.setItem("authToken", JSON.stringify(action.payload.encodedToken));
                localStorage.setItem("userData", JSON.stringify(action.payload.foundUser));
            })
            .addCase(loginUser.rejected, (state) => {
                // console.log("Error Occurred");
                state.authStatus = 'failed';
            })
            // Edit User
            .addCase(editUser.pending, (state) => {
                state.authStatus = 'loading';
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.userData = {
                    ...state.userData,
                    ...action.payload.user,
                };
                state.authStatus = "success";
                localStorage.setItem("userData", JSON.stringify(state.userData));
            })
            .addCase(editUser.rejected, (state) => {
                state.authStatus = "failed";
            })
            // Bookmark Handler
            .addCase(bookmarkHandler.pending, (state) => {
                state.authStatus = "loading";
            })
            .addCase(bookmarkHandler.fulfilled, (state, action) => {
                const { post_id: postId, deleted } = action.payload.data;
            
                // Update the user's bookmarks based on the `deleted` flag
                state.userData = {
                    ...state.userData,
                    bookmarks: deleted
                        ? state.userData.bookmarks.filter(id => id !== postId) // Remove the post ID from bookmarks
                        : [...state.userData.bookmarks, postId], // Add the post ID to bookmarks
                };
            
                // Update localStorage to reflect the new state
                localStorage.setItem("userData", JSON.stringify(state.userData));
            
                state.authStatus = "success";
            })                
            .addCase(bookmarkHandler.rejected, (state) => {
                state.authStatus = "failed";
            });
    },
});

export const { logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
