import Login from './components/Login/Login';
import Protected from './components/Protected/Protected';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/protected" element={ <Protected />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
