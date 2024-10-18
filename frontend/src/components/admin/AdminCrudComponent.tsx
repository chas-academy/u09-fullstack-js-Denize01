import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const AdminCrudComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch all users (Read)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Något gick fel med API-anropet");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async () => {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, roles: role, password }),
    });
    if (response.ok) {
      fetchUsers();
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccessMessage("Ny användare skapad!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  // Update user role
  const updateUserRole = async (id: string, newRole: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-neutral-900 via-purple-500 to-indigo-900">
      {/* Admin Dashboard Header */}
      <div className="text-center bg-opacity-20 bg-white p-4 rounded-lg shadow-md mb-8 mt-16">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      </div>

      {/* Main content */}
      <div className="bg-white bg-opacity-20 border-4 border-gray-400 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-6xl mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skapa användare */}
          <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Skapa ny användare
            </h3>
            {successMessage && (
              <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                {successMessage}
              </div>
            )}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Användarnamn"
              className="border p-2 mb-2 w-full rounded-md"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
              className="border p-2 mb-2 w-full rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lösenord"
              className="border p-2 mb-2 w-full rounded-md"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 mb-2 w-full rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={createUser}
              className="w-full bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition duration-300"
            >
              Skapa användare
            </button>
          </div>

          {/* Hämta användare (med scroll) */}
          <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Användarlista
            </h3>
            {loading ? (
              <p className="text-gray-600">Laddar användare...</p>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <ul>
                  {users.map((user) => (
                    <li
                      key={user._id}
                      className="border p-4 mb-2 rounded-md shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-lg font-bold">{user.username}</h4>
                        <p className="text-sm text-gray-600">
                          E-post: {user.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          Roll: {user.role}
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() =>
                            updateUserRole(
                              user._id,
                              user.role === "user" ? "admin" : "user"
                            )
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Ändra till {user.role === "user" ? "Admin" : "User"}
                        </button>

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Ta bort
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tom div för framtida funktioner */}
          <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Framtida funktioner
            </h3>
            <p className="text-gray-600">Kommer snart...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCrudComponent;
