// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "./navbar";

// function EditPost() {
//     const {postId} = useParams();
//     const [projecttitle, setProjecttitle] = useState('');
//     const [createddate, setCreateddate] = useState('');
//     const [description, setDescription] = useState('');
//     const [status, setStatus] = useState('');
//     const [updateddate, setUpdateddate] = useState('');
    
//     let navigate = useNavigate();
//     useEffect(()=>{
//         axios.get('http://127.0.0.1:8000/api/view/'+postId).then(response=>{
//             console.log(response.data.project.projecttitle);
//             setProjecttitle(response.data.project.projecttitle);
//             setCreateddate(response.data.project.createddate);
//             setDescription(response.data.todos.description);
//             console.log(response.data.todos.description);
//             setStatus(response.data.todos.status);
//             setUpdateddate(response.data.todos.updateddate);
           
//         })
//     },[postId]);
//     // function updateProject(){
//     //     axios.post('http://127.0.0.1:8000/api/updatetask/'+postId,{
//     //        projecttitle:projecttitle,
//     //        createddate:createddate,
//     //        description:description,
//     //        status:status,
//     //        updateddate:updateddate
//     //     }).then(response=>{
//     //         alert(response.data.message)
//     //     })
//     //     navigate('/list');
//     // }
//     return <div>
//         <Navbar/>
//         <div className="container">

//             <div className="row">
//                 <div className="col-8 offset-2">
//                 <div className="card ">
//         <div className="card-body p-4">
//                     <h5 className="text-center">edit Post</h5>
                    
//                     <div className="form-group">
//                         <label>Project title:</label>
//                         <input 
//                         type="text" 
//                         className="form-control" 
//                         value={projecttitle} 
//                         onChange={(event)=>{setProjecttitle(event.target.value)}} 
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>createddate</label>
//                         <input 
//                         type="text" 
//                         className="form-control" 
//                         value={createddate} 
//                         onChange={(event)=>{setCreateddate(event.target.value)}}  
//                         />
//                     </div>
                    
//                     <div className="form-group">
//                         <label>Description:</label>
//                         <textarea 
//                         className="form-control" 
//                         value={description} 
//                         onChange={(event)=>{setDescription(event.target.value)}}  
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Status</label>
//                         <input 
//                         type="text" 
//                         className="form-control" 
//                         value={status} 
//                         onChange={(event)=>{setStatus(event.target.value)}}  
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>updateddate</label>
//                         <input 
//                         type="date" 
//                         className="form-control" 
//                         value={updateddate} 
//                         onChange={(event)=>{setUpdateddate(event.target.value)}}  

//                         />
//                     </div>
                    
//                     <div className="form-group">
//                         <button className="btn btn-primary float-right">Submit</button>
//                     </div>     
//                 </div>
//             </div>
//         </div>
//         </div>
//         </div>
//         </div>
    
// }

// export default EditPost;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function EditPost() {
    const { postId } = useParams();
    const [projecttitle, setProjecttitle] = useState('');
    const [createddate, setCreateddate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [updateddate, setUpdateddate] = useState('');
    
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/view/${postId}`)
            .then(response => {
                const projectData = response.data.project;
                const todosData = response.data.todos[0]; // Assuming todos is an array
                setProjecttitle(projectData.projecttitle);
                setCreateddate(projectData.createddate);
                setDescription(todosData.description);
                setStatus(todosData.status);
                setUpdateddate(todosData.updateddate);
            })
            .catch(error => {
                console.error("Error fetching post data:", error);
            });
    }, [postId]);

    function handleSubmit(event) {
        event.preventDefault();
        // Update the post data using axios
        axios.post(`http://127.0.0.1:8000/api/updatetask/${postId}`, {
            project: {
                projecttitle,
                createddate
            },
            todo: {
                description,
                status,
                updateddate
            }
        })
        .then(response => {
            alert(response.data.message);
            navigate('/home');
        })
        .catch(error => {
            console.error("Error updating post:", error);
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                            <div className="card-body p-4">
                                <h5 className="text-center">Edit Post</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Project title:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={projecttitle} 
                                            onChange={(event) => setProjecttitle(event.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>start date:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={createddate} 
                                            onChange={(event) => setCreateddate(event.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={description} 
                                            onChange={(event) => setDescription(event.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>status:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={status} 
                                            onChange={(event) => setStatus(event.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>updateddate:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={updateddate} 
                                            onChange={(event) => setUpdateddate(event.target.value)} 
                                        />
                                    </div>
                                    {/* Other form fields */}
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
