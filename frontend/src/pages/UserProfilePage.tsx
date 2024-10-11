import React, { useEffect, useState } from "react";

const UserProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>("");

  //Hämta användarnamnet från localStorage när sidan laddas

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <div>
      <h1>Welcome {username ? username : "User"}!</h1>
      <p>This is your user profile page.</p>
    </div>
  );
};

export default UserProfilePage;
