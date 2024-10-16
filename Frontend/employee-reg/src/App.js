import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/Register';
import EmployeeList from './Components/EmployeeList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Register/>}/>
     <Route path='list' element={<EmployeeList/>}/>
     {/* <Route path='userprofile' element={<UserProfile/>}/> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
