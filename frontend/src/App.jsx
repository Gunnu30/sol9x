import { Component } from "react";
import { BrowserRouter ,Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import StudentEdit from "./components/StudentEdit";
import ProtectedRoute from "./routes/ProtectedRoute";
import DefaultRoute from "./routes/DefaultRoute";
import AdminDashboard from "./components/AdminDashboard";
import AdminStudentsEdit from './components/AdminStudentsEdit'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<DefaultRoute><Login /></DefaultRoute>} />
          <Route exact path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route exact path="/student/edit" element={<ProtectedRoute><StudentEdit/></ProtectedRoute>} />
          <Route exact path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
          <Route exact path='/admin/student/edit/:id' element={<ProtectedRoute><AdminStudentsEdit/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
