import { createBrowserRouter, Navigate } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import AppLayout from './components/AppLayout';
import ViewFile from './components/ViewFile';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const requireAuthLoader = () => {
  return isAuthenticated();
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'upload', element: <UploadFile /> },
      { path: 'filelist', element: <FileList /> },
      { path: 'view-file', element: <ViewFile /> },
    ],
  },
]);