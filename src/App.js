import './App.css';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Loginpage from './pages/loginpage/Loginpage';
import Registerpage from './pages/registerpage/Registerpage';
import Adminpage from './pages/adminpage/Adminpage';
import Userpage from './pages/userpage/Userpage';
import ProtectedInstructor from './ProctedIntructo';
import ProtectedAdmin from './ProtectedAdmin';

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route>
  <Route path="/" element={<Loginpage/>} exact />
  <Route path="/register" element={<Registerpage/>} exact />
  <Route path="/admin" element={<ProtectedAdmin Component={Adminpage}/>} exact />
  <Route path="/user" element={<ProtectedInstructor Component={Userpage}/>} exact />
  </Route>
</Routes>
</BrowserRouter>    
  );
}

export default App;
