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
  const [searchTerm, setSearchTerm] = useState("");
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

  // Funktion för att filtrera användare baserat på söksträngen
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funktion för att hantera sökning
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
              className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Skapa användare
            </button>
          </div>

          {/* Hämta användare (med scroll) */}
          <div className="bg-opacity-20 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Användarlista
            </h3>

            {/* Sökfält */}
            <input
              type="text"
              placeholder="Sök användare..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 mb-4 w-full rounded-md"
            />

            {loading ? (
              <p className="text-gray-600">Laddar användare...</p>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <ul>
                  {filteredUsers.map((user) => (
                    <li
                      key={user._id}
                      className="border text-white p-4 mb-2 rounded-md shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-lg font-bold">{user.username}</h4>
                        <p className="text-sm text-white">
                          E-post: {user.email}
                        </p>
                        <p className="text-sm text-white">Roll: {user.role}</p>
                      </div>
                      <div className="flex">
                        {/* Edit Icon (Pencil) */}
                        <button
                          onClick={() =>
                            updateUserRole(
                              user._id,
                              user.role === "user" ? "admin" : "user"
                            )
                          }
                          className="text-white hover:text-gray-300 transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M16.862 3.387a2.25 2.25 0 113.182 3.182l-1.044 1.045-3.182-3.182 1.044-1.045zM4.5 19.5v-3.182L14.318 6.5l3.182 3.182L7.682 19.5H4.5z" />
                          </svg>
                        </button>

                        {/* Trashcan Icon */}
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-white hover:text-gray-300 transition duration-300 ml-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.25 4.5A.75.75 0 016 3.75h12a.75.75 0 010 1.5h-.75v14.25A2.25 2.25 0 0115 21.75H9a2.25 2.25 0 01-2.25-2.25V4.5H6a.75.75 0 01-.75-.75zm3 3A.75.75 0 018.25 9v9a.75.75 0 001.5 0V9a.75.75 0 00-1.5 0zm4.5.75a.75.75 0 00-.75-.75.75.75 0 00-.75.75v9a.75.75 0 001.5 0v-9zm2.25-.75a.75.75 0 00-.75.75v9a.75.75 0 001.5 0V9a.75.75 0 00-.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>
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
