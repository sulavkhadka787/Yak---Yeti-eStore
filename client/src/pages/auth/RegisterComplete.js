import React from 'react';

const RegisterComplete=()=>{
    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form">
                    <div className="form-header">
                        <h3>Complete Registration</h3>                    
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-input" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="Confirm Password" />
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Register</button>
                    </div>
                   
                </form>
                
      
            </div>
        </>
    )
}
export default RegisterComplete;