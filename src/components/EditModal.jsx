import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditModal({ isOpen, onClose, onSave, note }) {
  let [formData, setFormData] = useState({});

  React.useEffect(() => {
    setFormData({
      title: note.title,
      content: note.content,
    });
  },[note.title, note.content]);

  const modalClass = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
    : "hidden";

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8080/note/" + note.id, formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      onClose();
      onSave();
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={modalClass}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-10/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          {/* Tombol untuk menutup modal */}
          <div className="flex justify-between bg-white-200">
            <h1>New Note</h1>
            <button onClick={onClose}>
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
                />
              </svg>
            </button>
          </div>

          <div>
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                  <div className="col-span-full mt-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                        <input
                          type="text"
                          name="title"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                          value={formData.title || ''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-5">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    name="content"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                    value={formData.content || ''}
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
