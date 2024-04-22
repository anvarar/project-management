import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewRequest() {
  const { postId } = useParams();
  const [task, setTask] = useState(null);
  let navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/view/${postId}`)
      .then(response => {
        console.log(response.data);
        setTask(response.data);
      })
      .catch(error => {
        console.error("Error fetching task:", error);
      });
  }, [postId]); 
  
  function handleDelete() {
    // Delete the post using axios
    axios.delete(`http://127.0.0.1:8000/api/deletetask/${postId}`)
    .then(response => {
        alert(response.data.message);
        navigate('/home');
    })
    .catch(error => {
        console.error("Error deleting post:", error);
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header"><h3 style={{ textAlign: "center" }}>Request Details</h3></div>
              <div className="card-body">
                {task && (
                  <div className="card-body">
                    <h3>Project Name: {task.project.projecttitle}</h3>
                    <p>Created Date: {task.project.createddate}</p>
                    {task.todos.map(todo => (
                      <div key={todo.id}>
                        <p>Description: {todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>createddate:{todo.createddate}</p>
                        <p>updateddate:{todo.updateddate}</p>
                        <div className="ed">
                          <Link className="btn btn-success" to={`/edit/${todo.id}`}>Edit&nbsp;</Link>
                          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div> 
                      </div>
                    ))}
                  </div>
                )}
                {!task && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRequest;
