import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import './list.css';
import { FaEye } from 'react-icons/fa'; 

function ListPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    function fetchPosts() {
        axios.get('http://127.0.0.1:8000/api/listproject/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    function deletePost(postId) {
        axios.delete('http://127.0.0.1:8000/api/deletetask/' + postId)
            .then(response => {
                alert(response.data.message);
                // Refresh the posts after deletion
                fetchPosts();
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center my-4">
                        <h1 className="text-center" style={{color:"white"}}>Projects</h1>
                        <Link to={"/create"} className="btn btn-info">Create New Project</Link>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-bordered bg-light">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Project Name</th>
                                        <th>Create Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map(post => (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td>{post.projecttitle}</td>
                                            <td>{post.createddate}</td>
                                            <td>
                                                <Link to={"/viewrequest/" + post.id} className="btn btn-info"><FaEye />&nbsp;View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPosts;
