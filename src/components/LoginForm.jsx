import "./styles/LoginForm.css";
import { Link } from "react-router-dom";//react-router-dom for react routes and pages
import { useEffect } from "react";
import { useFormik } from "formik";//for form handling in React
import * as Yup from "yup";//Yup is a JavaScript schema builder for value parsing and validation
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/handleAuth";

export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authToken } = useSelector((state) => state.auth);

    const testCredentials = {
        email: "shashank@gmail.com",
        password: "s12345"
    }

    const loginWithTest = () => {
        dispatch(loginUser(testCredentials));
    }
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().nullable().email().required("Email cannot be empty").min(5, "Email must be valid"),
            password: Yup.string().required("Password cannot be empty")
        }),
        onSubmit: (values, actions) => {
            const { email, password } = values;
            dispatch(loginUser({ email, password }))
            actions.resetForm();
        },
    },
    );

    useEffect(() => {
        // console.log('authToken', authToken);
        if (authToken) {
            console.log('Navigating to /home');
            navigate("/home", { replace: true });
        }
    }, [authToken, navigate])


    return (

        <div>
            <div className="login-header signup-header">
                <p className="login-main-text">Login</p>
                <span className="login-sec-text">Good to see you again</span>
            </div>

            <div className="form-div-parent">

                <form onSubmit={formik.handleSubmit}>

                    <div className={"form-div email-div"}>
                        <label htmlFor="email">Email</label>

                        <div className={(formik.touched.email && formik.errors.email) && "form-error"}>
                            <input type="text" placeholder="Enter Email" name="email" {...formik.getFieldProps("email")} />
                        </div>

                        {
                            (formik.touched.email && formik.errors.email) && <p className="error-message">{formik.errors.email}</p>
                        }

                    </div>

                    <div className={"form-div email-div password-div"} >

                        <div style={{ marginTop:'-1rem',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password">Password</label>
                            <a className="action-txt" href="/forgot-password">Forgot Password?</a>
                        </div>

                        <div className={(formik.touched.password && formik.errors.password) && "form-error"}>
                            <input type="password" placeholder="Enter Password" name="password" {...formik.getFieldProps("password")} />
                        </div>

                        {
                            (formik.touched.password && formik.errors.password) && <p className="error-message">{formik.errors.password}</p>
                        }

                    </div>

                    <p className="action-txt" onClick={loginWithTest}>Login using guest credentials</p>


                    <div className="form-action-div">

                        <Link to="/signup" className="action-txt">Create account</Link>

                        <button className="submit-btn primary-btn" type="submit">Login</button>

                    </div>

                </form>
            </div>
        </div>
    )
}