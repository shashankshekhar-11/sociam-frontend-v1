import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import toastStyle from "./toastStyle";

const editUser = createAsyncThunk("user/editUser",
    async (userData, {getState, rejectWithValue}) => {
        try {
            const { authToken } = getState().auth;
            const res = await axios.post('http://localhost:8000/api/v1/users/edit', userData, {
                headers: { Authorization: `Bearer ${authToken}` } // Corrected to `Bearer ${authToken}`
            });
            toast.success("Profile updated successfully!", { style: toastStyle });
            return res.data.user; // Return updated user data
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    }
);

const getAllUsers = createAsyncThunk("users/getAllUsers",
async ()=>{
    try{
        const res = await axios.get('http://localhost:8000/api/v1/users/getallusers');
        // console.log(res.data);
        return res.data;
    } catch(err){
        console.log(err);
    }
});

const getUser = async(userId) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/v1/users/getallusers/${userId}`);
        return res.data
    } catch(err){
        console.log(err);
    }
}

export {
    editUser,
    getAllUsers,
    getUser,
}