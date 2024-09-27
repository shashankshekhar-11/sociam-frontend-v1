import React, { useState } from 'react';
import "./styles/EditProfileModal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { closeEditProfileModal } from '../state/slices/modalSlice';
import { toast } from "react-hot-toast";
import toastStyle from '../utils/toastStyle';
import { editUser } from '../utils/userHandler';

export default function EditProfileModal() {
    const { userData } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    // State to track upload and avatar URL
    const [avatarUrl, setAvatarUrl] = useState(userData?.avatar || '');
    const [isImageUploading, setIsImageUploading] = useState(false); // State for buffering

    const { fullName, email, password } = userData;

    // Image upload handler
    const uploadImage = async (image) => {
        setIsImageUploading(true); // Set uploading state to true
        if (Math.round(image.size / 1024000) > 2) {
            toast.error("Image size cannot exceed 2MB!", { style: toastStyle });
            setIsImageUploading(false); // Set back to false on error
            return;
        }

        try {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await response.json();

            if (result.secure_url) {
                setAvatarUrl(result.secure_url);
                toast.success("Image uploaded successfully!", { style: toastStyle });
            } else {
                toast.error("Image upload failed!", { style: toastStyle });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later", { style: toastStyle });
        } finally {
            setIsImageUploading(false); // Set back to false after completion
        }
    };

    // Formik form handling
    const formik = useFormik({
        initialValues: {
            fullName: fullName ?? "",
            email: email ?? "",
            password: password ?? "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full Name cannot be empty"),
            email: Yup.string().email("Invalid email format").required("Email cannot be empty"),
            password: Yup.string().required("Password cannot be empty")
        }),
        onSubmit: (values) => {
            // Only submit if avatarUrl is set properly
            if (avatarUrl && avatarUrl.startsWith('https://res.cloudinary.com')) {
                const updatedValues = { ...values, avatar: avatarUrl };
                dispatch(editUser(updatedValues));
                dispatch(closeEditProfileModal());
            } else {
                toast.error("Please wait until the image is uploaded.", { style: toastStyle });
            }
        },
    });

    return (
        <div>
            <div className="modal-bg">
                <div className="modal-centered">
                    <div className="modal">
                        <div className="modal-header edit-profile-modal-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Edit Profile</span>
                            <small>
                                <i style={{ fontSize: '10px', fontFamily: 'Arial, sans-serif' }}>
                                    Changes will apply from next login
                                </i>
                            </small>
                        </div>

                        <div className="edit-profile-div-parent">
                            <div className='edit-profile-img-div'>
                                <div className="edit-profile-logo-img">
                                    <img src={avatarUrl} alt="pp-logo" />
                                </div>

                                {/* Image input */}
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) uploadImage(file);
                                    }}
                                />

                                {/* Loader */}
                                {isImageUploading && <p>Uploading image...</p>}
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                {/* Full Name */}
                                <div className="edit-profile-div email-div">
                                    <label htmlFor="fullName">Full Name</label>
                                    <div className={(formik.touched.fullName && formik.errors.fullName) && "form-error"}>
                                        <input type="text" placeholder="Enter Full Name" name="fullName" {...formik.getFieldProps("fullName")} />
                                    </div>
                                    {
                                        (formik.touched.fullName && formik.errors.fullName) && <p className="error-message">{formik.errors.fullName}</p>
                                    }
                                </div>

                                {/* Email */}
                                <div className="edit-profile-div email-div">
                                    <label htmlFor="email">Email Address</label>
                                    <div className={(formik.touched.email && formik.errors.email) && "form-error"}>
                                        <input type="email" placeholder="Enter Email Address" name="email" {...formik.getFieldProps("email")} />
                                    </div>
                                    {
                                        (formik.touched.email && formik.errors.email) && <p className="error-message">{formik.errors.email}</p>
                                    }
                                </div>

                                {/* Password */}
                                <div className="edit-profile-div email-div">
                                    <label htmlFor="password">Password</label>
                                    <div className={(formik.touched.password && formik.errors.password) && "form-error"}>
                                        <input type="password" placeholder="Enter Password" name="password" {...formik.getFieldProps("password")} />
                                    </div>
                                    {
                                        (formik.touched.password && formik.errors.password) && <p className="error-message">{formik.errors.password}</p>
                                    }
                                </div>

                                <div className="modal-actions">
                                    <div className="actions-container">
                                        {/* Disable submit button during upload */}
                                        <button
                                            className="action-txt edit-profile-submit-btn"
                                            type="submit"
                                            disabled={isImageUploading} // Prevent form submission during image upload
                                        >
                                            {isImageUploading ? "Uploading..." : "Save"}
                                        </button>
                                        <p className="action-txt close-modal-txt" onClick={() => dispatch(closeEditProfileModal())}>Cancel</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
