import React from 'react';

const Register=()=>{

    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form">

                    <div className="form-header">
                        <h3>Register Email</h3>                    
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-input" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Submit</button>
                    </div>
                </form>
                
      
            </div>
        </>
    )
}
export default Register;