import React from 'react';

const Login=()=>{

    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form">
                    <div className="form-header">
                        <h3>Login Form</h3>                    
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-input" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="password" />
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Login</button>
                    </div>
                    <div className="form-footer">
                             Don't have an account? <a href="/register">Sign Up</a>
                    </div>
                </form>
                <div className="google-login">
                    <button className="google-btn">Google login <i className="fab fa-google"></i>
                    </button>
                </div>
      
            </div>
        </>
    )
}
export default Login;