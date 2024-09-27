import React  from 'react';
import SignupForm from '../components/SignupForm';
import "./styles/Styles.css";

const SignupPage=()=>{
  return (
    <>
      <div className='login-page-content-div'>
        <div className='auth-page-brand-div'>
          <div className="auth-logo-img">
            <img src="https://res.cloudinary.com/dea6nwzhg/image/upload/v1713531307/Sociam_assets/sociamNamedWhite_gk7req.png" alt="pp-logo" />
          </div>
          <p className='auth-page-brand-text'>Unleash Your Social Potential</p>
        </div>
        <SignupForm />
      </div>
    </>
  )
}

export default SignupPage;