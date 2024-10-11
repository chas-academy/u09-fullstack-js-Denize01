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
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  // Fetch all users (Read)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Sätt loading till true när vi börjar hämta användare
    try {
      const response = await fetch("http://localhost:3000/api/users"); // Exakt URL till din backend
      if (!response.ok) {
        throw new Error("Något gick fel med API-anropet");
      }
      const data = await response.json(); // Extrahera JSON-data
      setUsers(data); // Uppdatera state med användarna
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Oavsett om det gick bra eller fel, sätt loading till false
    }
  };

  // Create a new user
  const createUser = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, roles: role }),
    });
    if (response.ok) {
      fetchUsers(); // Uppdatera listan efter skapande
      setUsername(""); // Reset form
      setEmail(""); // Reset email
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
      fetchUsers(); // Uppdatera listan efter uppdatering
    }
  };

  // Delete user (hard delete)
  const deleteUser = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchUsers(); // Uppdatera listan efter borttagning
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Användarhantering
      </h2>

      {/* Create User Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Skapa ny användare
        </h3>
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
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
        >
          Skapa användare
        </button>
      </div>

      {/* User List */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Användarlista
      </h3>
      {loading ? (
        <p className="text-gray-600">Laddar användare...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className="border p-4 mb-2 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-bold">{user.username}</h4>
                <p className="text-sm text-gray-600">E-post: {user.email}</p>
                <p className="text-sm text-gray-600">Roll: {user.role}</p>
              </div>
              <div className="flex">
                <button
                  onClick={() =>
                    updateUserRole(
                      user._id,
                      user.role === "user" ? "admin" : "user"
                    )
                  } // Byt mellan user/admin
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
      )}
    </div>
  );
};

export default AdminCrudComponent;
