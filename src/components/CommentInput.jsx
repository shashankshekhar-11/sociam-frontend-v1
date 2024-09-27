import React from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addNewCommentToPost, getCommentsOfPost } from '../utils/commentHandler';
import * as Yup from "yup";
import { useEffect } from 'react';

export default function CommentInput({ post }) {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            reply: ""
        },
        validationSchema: Yup.object({
            reply: Yup.string().required("Reply cannot be empty"),
        }),
        onSubmit: (values, actions) => {
            const { reply } = values;
            dispatch(addNewCommentToPost({ postId: post._id, comment: reply }));
            actions.resetForm();
        },
    });

    return (
        <div>
            <div className='createpost-div'>
                <div className="suggested-user-img">
                    <img src={userData?.profileImg} alt={userData?.username} />
                </div>

                <div className='createpost-area-div'>

                    <form onSubmit={formik.handleSubmit}>

                        <textarea className='createpost-textarea' name='reply' placeholder="Post your reply" {...formik.getFieldProps("reply")}></textarea>

                        <button className='post-btn' type='submit'>Reply</button>
                    </form>
                </div>

            </div>
            <div className='line-div'></div>
        </div>
    )
}
