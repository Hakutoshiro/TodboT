import Todo from './Todo'
import axios from 'axios';

axios.defaults.withCredentials=true; 
function App() {
  return (
    <>
      <Todo/>
    </>
)}

export default App
