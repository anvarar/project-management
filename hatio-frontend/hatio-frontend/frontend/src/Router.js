import { createBrowserRouter } from "react-router-dom"; 
import Signup from "./auth/Signup";
import Login from "./auth/login";
import CreatePost from "./components/create";
import ListPosts from "./components/list";
import EditPost from "./components/edit";

import ViewRequest from "./components/viewrequest";
const router=createBrowserRouter([
    {path:'/register',element:<Signup/>},
    {path:'',element:<Login/>} ,
    
    {path:'/create',element:<CreatePost/>},
    {path:'/home',element:<ListPosts/>},
    {path:'/edit/:postId',element:<EditPost/>} ,
    {path:'/viewrequest/:postId',element:<ViewRequest/>},

])

export default router;