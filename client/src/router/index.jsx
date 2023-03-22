import { createBrowserRouter, Outlet } from "react-router-dom";
import Note from "../components/Note";
import NoteList from "../components/NoteList";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { foldersLoader } from "../utils/folderUtils";
import { notesLoader, noteLoader, addNewNote, updateNote } from "../utils/noteUtils";
import ProtectedRoute from "./ProtectedRoute";

//outlet is depend on path and load content from children
const AuthLayout = () => {
    //wrap outler by authprovider for any page can access to user, setuser from authprovider component
    return <AuthProvider> 
        <Outlet/>
    </AuthProvider>;
};

//loader: load data
//action: change data
export default createBrowserRouter([
    {
        element: <AuthLayout/>,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login/>,
                path: '/login'
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home/>,
                        path: '/',
                        loader: foldersLoader,
                        children: [
                            {
                                element: <NoteList/>,
                                path: 'folders/:folderID',
                                loader: notesLoader,
                                action: addNewNote,
                                children: [
                                    {
                                        element: <Note/>,
                                        path: `note/:noteID`,
                                        loader: noteLoader,
                                        action: updateNote,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);