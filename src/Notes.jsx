import React, { useState } from "react";
import axios  from "axios";
import { FaInfoCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import CreateModal from "./components/CreateModal";

function Notes() {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try{
      let response = await axios.get("http://localhost:8080/note",{
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      setNotes(response.data)
    }catch(error){
      navigate('/');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="content min-h-screen bg-gradient-to-br from-blue-500 to-gray-400">
      <Navbar />
      <div className="container mx-auto">
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
        >
          New Note
        </button>

        <CreateModal isOpen={isModalOpen} onClose={closeModal} onRefresh={fetchData} />

        <div className="flex items-center justify-center ">
          <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
}

export default Notes;
