import React from 'react';
import "./styles/EditPostModal.css";
import { useDispatch, useSelector } from 'react-redux';
import { closeEditPostModal } from '../state/slices/modalSlice';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { editPost } from '../utils/postHandler';

export default function EditPostModal() {

    const dispatch = useDispatch();

    const { postToBeEdited } = useSelector((store) => store.modal);

    const formik = useFormik({
        initialValues: {
            postContent: postToBeEdited.post.content
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            postContent: Yup.string().required("Post cannot be empty"),
        }),
        onSubmit: (values, actions) => {
            const { postContent } = values;
            dispatch(editPost({ ...postToBeEdited.post, content: postContent }));
            dispatch(closeEditPostModal())
            actions.resetForm();
        },
    });


    return (
        <div>
            <div className="modal-bg">
                <div className="modal-centered">

                    <div className="edit-post-modal">

                        <div className="modal-header edit-profile-modal-header edit-post-modal-header">
                            <p>Edit Post</p>

                            <span className="material-icons-outlined edit-post-modal-close-btn" onClick={() => dispatch(closeEditPostModal())}>
                                close
                            </span>
                        </div>

                        <div className="edit-profile-div-parent edit-post-modal-parent">

                            <form onSubmit={formik.handleSubmit}>

                                <textarea className='createpost-textarea' name='postContent' placeholder="What's happening?" {...formik.getFieldProps("postContent")}></textarea>

                                <button className='post-btn edit-post-submit-btn' type='submit'>Post</button>

                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
