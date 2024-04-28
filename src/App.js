import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailView from './pages/DetailView'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'


const App = () => {

    let routes = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/read",
            element: <ReadPosts/>,
        },
        {
            path: "/new",
            element: <CreatePost />,
        },
        {
            path: "/edit/:id",
            element: <EditPost />,
        },
        {
            path: "/detailview/:id",
            element: <DetailView />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <div className="App">
            <div className="header">
                <Navbar />
            </div>
            {routes}
        </div>
    );
}

export default App;