"use client";

import TopNav from "./components/TopNav";
import HomePage from "./components/HomePage";
import { Button, CircularProgress } from "@mui/material";
import { signInWithGoogle } from "./firebase-config";
import { useEffect, useState } from "react";
import "./styles/globals.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userObject")!);
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <>
          {user ? (
            <>
              <TopNav user={user} />
              <HomePage user={user} />
            </>
          ) : (
            <div className="flex justify-center items-center h-screen ">
              <Button onClick={signInWithGoogle}>Sign in</Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
