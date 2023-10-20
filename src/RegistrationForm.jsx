import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [formError, setFormError] = useState("");
  let [formErrorList, setFormErrorList] = useState("");

  const navigate = useNavigate();
  const handleRegis = async (e) => {
    e.preventDefault();
    setFormError(undefined);
    setFormErrorList(undefined);

    axios
      .post("http://localhost:8080/registration", { name, email, password })
      .then((response) => {
        navigate("/login",{state:{
          msg: "Registration Successful, Please Login"
        }});
      })
      .catch((e) => {
        if (Array.isArray(e.response.data.error)) {
          setFormErrorList(e.response.data.error);
        } else {
          setFormError(e.response.data.error);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-gray-400">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Registration</h2>

        {/*error bukan list*/}
        {formError && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {formError}
          </div>
        )}

        {/*error bentuk list*/}
        {formErrorList && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            <ul>
              {formErrorList.map((item, index) => (
                <li key={index}>
                  {item.msg} {item.path}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleRegis}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
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
            Register Account
          </button>
          <div className="text-center mt-3.5">
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
