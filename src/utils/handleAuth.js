import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import toastStyle from "./toastStyle";

const signupUser = createAsyncThunk("auth/signupUser",
    async (signupData, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/users/create', signupData);
            toast.success("Signed Up Successfully", { style: toastStyle });
            
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data)
        }
    })


const loginUser = createAsyncThunk("auth/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {
            const {data} = await axios.post('http://localhost:8000/api/v1/users/create-session', loginData);
            toast.success("You're successfully logged in.", { style: toastStyle });  
            // console.log(data);          
            return data;
        } catch (err) { 
            console.log(err);
            return rejectWithValue(err.response.data)
        }
    })

export { signupUser, loginUser };