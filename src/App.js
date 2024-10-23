import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import Todo from "./Components/Todo";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
 

  
  
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/todos'
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
