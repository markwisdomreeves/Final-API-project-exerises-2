import React, { useState, useEffect} from "react";
import axios from "axios";



const SignUpLogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = () => {
        const userData = {
            email,
            password
        };

    
        axios.post("/api/auth/register_login", userData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });

    }

    useEffect(() => {
        console.log(onSubmit())
    }, [])


    
      return (
        <form onSubmit={onSubmit}>
            <div className="container">
                <div className="container">
                   <h1>Welcome to the Login Form</h1>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="form-control"
                        onChange={e => {
                            setEmail(e.target.value);
                            console.log(email);
                        }}
                    />
                    <div className="container">
                        <h4>
                           We will never share your email with others
                        </h4>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-control"
                        onChange={e => {
                            setPassword(e.target.value);
                            console.log(password);
                        }}
                    />
                    <div className="container">
                        <h4>
                           We will never share your email with others
                        </h4>
                    </div>
                </div>
            </div>

            <div className="container">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    )
}


export default SignUpLogInForm;