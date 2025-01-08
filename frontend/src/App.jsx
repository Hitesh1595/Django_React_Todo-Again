import { useState, useEffect } from "react";

function App() {
  const [listItem, setlistItems] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => {
        setlistItems(data);
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        getTodos()
        // console.log(`Todo with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const setTodo = () => {
    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Tell the server you're sending JSON
      },
      body: JSON.stringify(formData), // Convert the data to JSON
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        console.log("Successfully created task:", data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const handleSubmit = () => {
    if (formData.title) {
      setTodo();
      // for instant seting the data
      setlistItems([...listItem, formData]);
      setFormData({ title: "", description: "", completed: false });
    } else {
      window.alert("please fill the value first");
    }
  };

  const listItems = listItem.map((item, index) => (
    <li key={item.id}>
      <p>
        {item.title},{item.description}
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-md"
          onClick={() => {
            deleteTodo(item.id)
          }}
        >
          Delete
        </button>
      </p>
      <br />
    </li>
  ));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="flex space-x-4 ...">
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="mt-1 block w-half px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="mt-1 block w-half px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="completed"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Completed
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Todo
      </button>
      <br />
      <br />

      <p>Todo Data List</p>
      <br />
      <ul>{listItems}</ul>
    </>
  );
}

export default App;
