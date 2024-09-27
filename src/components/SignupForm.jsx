import "./styles/SignupForm.css";
import { Link, useNavigate } from "react-router-dom";//react-router-dom for react routes and pages
import { useFormik } from "formik";//for form handling in React
import * as Yup from "yup"; //Yup is a JavaScript schema builder for value parsing and validation
import { useEffect } from "react";
import { signupUser } from "../utils/handleAuth";
import { useDispatch, useSelector } from "react-redux";

export default function SignupForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authToken } = useSelector((store) => store.auth);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name cannot be empty"),
            lastName: Yup.string().required("Last Name cannot be empty"),
            email: Yup.string().nullable().email().required("Email cannot be empty").min(5, "Please enter a valid email address"),
            password: Yup.string().required("Password cannot be empty").min(6, "Password's length should be greater than 6"),
            confirmPassword: Yup.string().required("Kindly Re-Enter the Password").oneOf([Yup.ref("password"), null], "Passwords doesn't match")
        }),
        onSubmit: (values, actions) => {
            const { firstName, lastName, email, password, confirmPassword } = values;
            dispatch(signupUser({ name: `${firstName} ${lastName}`, email, password, confirmPassword }))
            actions.resetForm();
        },
    },
    );

    useEffect(() => {
        if (authToken) {
            navigate("/home", { replace: true })
        }
    }, [authToken, navigate])

    return (
        <div className="signup-container">
            <div className="signup-header">
                <p className="login-main-text">Signup</p>
                <p className="login-sec-text">Create Your Sociam Account</p>
            </div>

            <div className="signup-form-div">
                <form onSubmit={formik.handleSubmit}>
                    <div className="signup-name-div">
                        <div className="name-input-div">
                            <label htmlFor="first-name">First Name</label>
                            <div className={(formik.touched.firstName && formik.errors.firstName) && "form-error"}>
                                <input type="text" placeholder="Enter First Name" name="firstName"  {...formik.getFieldProps("firstName")} />
                            </div>

                            {
                                (formik.touched.firstName && formik.errors.firstName) && <p className="error-message">{formik.errors.firstName}</p>
                            }
                        </div>

                        <div className="name-input-div">
                            <label htmlFor="last-name">Last Name</label>

                            <div className={(formik.touched.lastName && formik.errors.lastName) && "form-error"}>
                                <input type="text" placeholder="Enter Last Name" name="lastName" {...formik.getFieldProps("lastName")} />
                            </div>

                            {
                                (formik.touched.lastName && formik.errors.lastName) && <p className="error-message">{formik.errors.lastName}</p>
                            }
                        </div>

                    </div>

                    <div className="form-input-div">
                        <label htmlFor="email">Email</label>

                        <div className={(formik.touched.email && formik.errors.email) && "form-error"}>
                            <input type="email" name="email" placeholder="Enter your email address" {...formik.getFieldProps("email")} />
                        </div>

                        {
                            (formik.touched.email && formik.errors.email) && <p className="error-message">{formik.errors.email}</p>
                        }
                    </div>

                    <div className="form-input-div">
                        <label htmlFor="password">Password</label>

                        <div className={(formik.touched.password && formik.errors.password) && "form-error"}>
                            <input type="password" name="password" placeholder="Enter your password" {...formik.getFieldProps("password")} />
                        </div>

                        {
                            (formik.touched.password && formik.errors.password) && <p className="error-message">{formik.errors.password}</p>
                        }

                    </div>

                    <div className="form-input-div">
                        <label htmlFor="password">Confirm Password</label>

                        <div className={(formik.touched.confirmPassword && formik.errors.confirmPassword) && "form-error"}>
                            <input type="password" name="confirmPassword" placeholder="Re-Enter your password" {...formik.getFieldProps("confirmPassword")} />
                        </div>

                        {
                            (formik.touched.confirmPassword && formik.errors.confirmPassword) && <p className="error-message">{formik.errors.confirmPassword}</p>
                        }

                    </div>


                    <div className="form-action-div">

                        <Link to="/login" className="action-txt">Login instead</Link>

                        <button className="submit-btn primary-btn" type="submit">Signup</button>

                    </div>

                </form>
            </div>
        </div>
    )

}