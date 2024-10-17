import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/Register';
import EmployeeList from './Components/EmployeeList';
import IDCardPreview from './Components/IDCardPreview';

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Register/>}/>
     <Route path='list' element={<EmployeeList/>}/>
     <Route path='Id' element={<IDCardPreview/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
