import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import axios from "axios";

const TwitterConnect = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get("/api/user").then((response) => {
        setUser(response.data);
      });
    }
  }, [session]);

  const handleConnect = async () => {
    const params = { key: "value" }; // Replace with actual expected structure
    const params = {
      tenant_id: user?.tenant_id,
      twitterToken: "...",
      // etc.
    };

    try {
      const response = await axios.post("/api/twitter/connect", params);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error connecting to Twitter:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Connect to Twitter</h1>
      {session ? (
        <button onClick={handleConnect}>Connect</button>
      ) : (
        <p>Please sign in to connect to Twitter.</p>
      )}
    </div>
  );
};

export default TwitterConnect;
