import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signup.css';
import axios from "axios";
function Signup() 
{
    var [username,setUsername]=useState('');
    var [password,setPassword1]=useState('');
    var [errorMessage,setErrorMessage]=useState('');
    var navigate = useNavigate();
    
    
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/api/login/',{
           username:username,
           password:password
        }).then(response=>{
            setErrorMessage('')
            console.log(response.data.token)
           
              navigate('/home');
          
          
        }).catch(error=>{
            if(error.response.data){
                setErrorMessage(Object.values(error.response.data).join(' '))
               
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    return(
        <> 
       
  
<div className="container-fluid">
  <div className="row d-flex justify-content-center  h-80">
    <div className="col-12 col-md-9 col-lg-7 col-xl-6 offset-xl-3">
      <div className="card ">
        <div className="card-body p-4">
          <h5 className="text-uppercase text-center mb-4">Login an account</h5>
          <form>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-outline mb-2">
              <input type="text" id="form3Example1cg" className="form-control form-control-md" value={username}  onInput={(event)=>setUsername(event.target.value)}/>
              <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
            </div>

            

            <div className="form-outline mb-2">
              <input type="password" id="form3Example4cg" className="form-control form-control-md" value={password}  onInput={(event)=>setPassword1(event.target.value)} />
              <label className="form-label" htmlFor="form3Example4cg">Password</label>
            </div>

            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={attemptLogin}>Login</button>
            </div>

            <p className="text-center text-muted mt-5 mb-0">not Have already an account? <Link to="/register">register</Link></p>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>

 
        </>
    )
}
export default Signup;