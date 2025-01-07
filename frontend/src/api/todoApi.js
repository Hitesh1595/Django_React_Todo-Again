const API_URL = 'http://localhost:8000/api';

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos/`);
  return response.json();
};

export const createTodo = async (text) => {
  const response = await fetch(`${API_URL}/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, completed: false }),
  });
  return response.json();
};

export const updateTodo = async (id, data) => {
  const response = await fetch(`${API_URL}/todos/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/todos/${id}/`, {
    method: 'DELETE',
  });
};