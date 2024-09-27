import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEditProfileModalOpen: false,
    isEditPostModalOpen: false,
    postToBeEdited:{}
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openEditProfileModal: (state) => {
            state.isEditProfileModalOpen = true;
        },
        closeEditProfileModal: (state) => {
            state.isEditProfileModalOpen = false;
        },
        openEditPostModal: (state,action) => {
            state.isEditPostModalOpen = true;
            state.postToBeEdited = action.payload
        },
        closeEditPostModal: (state) => {
            state.isEditPostModalOpen = false;
            state.postToBeEdited = {}
        },
    },
});

export const { openEditProfileModal, closeEditProfileModal, openEditPostModal, closeEditPostModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;