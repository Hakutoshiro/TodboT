import Todo from './Todo'
import axios from 'axios';

axios.defaults.withCredentials=true; 
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
function App() {
  return (
    <>
      <Todo/>
    </>
)}

export default App
