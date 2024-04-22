import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import './create.css';

function CreatePost() {
    const [projecttitle, setProjecttitle] = useState('');
    const [createddate, setCreateddate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [updateddate, setUpdateddate] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
     
    var navigate = useNavigate(); 

    function addPost() {
        var user = {
            projecttitle: projecttitle, 
            createddate: createddate,
            description: description,
            status: status,
            updateddate: updateddate 
        };
    
        axios.post('http://127.0.0.1:8000/api/addproject/', user)
            .then(response => {
                setErrorMessage('');
                navigate('/home');
            })
            .catch(error => {
                if (error.response.data) {
                    setErrorMessage(Object.values(error.response.data).join(' '));
                } else {
                    setErrorMessage('Failed to connect to API');
                }
            });
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
                        <div className="card">
                            <div className="card-body p-4">
                                <h5 className="text-center">Create Post</h5>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <div className="form-group">
                                    <label>Project Title:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={projecttitle} 
                                        onChange={(event) => setProjecttitle(event.target.value)}  
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Created Date</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={createddate} 
                                        onChange={(event) => setCreateddate(event.target.value)}  
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(event) => setDescription(event.target.value)}  
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={status} 
                                        onChange={(event) => setStatus(event.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Updated Date</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={updateddate} 
                                        onChange={(event) => setUpdateddate(event.target.value)}  
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success float-right" onClick={addPost}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
}

export default CreatePost;
