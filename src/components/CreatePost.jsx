import React from 'react';
import "./styles/CreatePost.css";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewPost } from '../utils/postHandler';

export default function CreatePost() {

  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      postContent: ""
    },
    validationSchema: Yup.object({
      postContent: Yup.string().required("post Cannot be empty"),
    }),
    onSubmit: (values, actions) => {
      const { postContent } = values;
      dispatch(addNewPost({ content: postContent, user: userData}));
      actions.resetForm();
    },
  });

  return (
    <div>
      <div className='createpost-div'>
        <div className="suggested-user-img">
          <img src={userData?.avatar?userData.avatar:"https://res.cloudinary.com/dea6nwzhg/image/upload/v1713645376/Sociam_assets/placeholder_user_rwq4nf.png"} alt={userData?.name} />
        </div>

        <div className='createpost-area-div'>

          <form onSubmit={formik.handleSubmit}>

            <textarea className='createpost-textarea' name='postContent' placeholder="What's in your mind?" {...formik.getFieldProps("postContent")}></textarea>

            <button className='post-btn' type='submit'>Post</button>
          </form>
        </div>

      </div>
      <div className='line-div'></div>
    </div>
  )
}
