import {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/login', {email, password})
      .then((response) => {
        localStorage.setItem('Authorization', response.data.token);
        navigate('/notes')
      }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-gray-400">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-3.5">
            <a href="">Registration</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm