import { useState } from "react";
import axios from "axios";
import { FaInfoCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("Authorization");

  axios
    .get("http://localhost:8080/note")
    .then((response) => {
      // mengeset data notes yang dimiliki user
      setNotes(response.data);
    })
    .catch((e) => {
      // jika tidak terotorisasi maka ke halaman login
      if (e.response.status == 401) {
        navigate("/");
      }
    });

  return (
    <div className="content">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-gray-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {notes.map((item, key) => {
            return (
              <div className="bg-white rounded-lg shadow-md" key={key}>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.content.substring(0, 50) + "..."}
                  </p>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-blue-600 hover:underline">
                      <FaInfoCircle />
                    </a>
                    <div>
                      <button className="mr-2 text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <FaPencilAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
