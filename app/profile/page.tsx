"use client";

import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { CircularProgress } from "@mui/material";
import ProfilePage from "../components/ProfilePage";
import { useRouter } from "next/navigation";
import "../styles/globals.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userObject")!);
    if (!storedUser) {
      router.replace("/");
    }
    setUser(storedUser);
    setIsLoading(false);
  }, [router]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        user && (
          <>
            <TopNav user={user}/>
            <ProfilePage user={user} />
          </>
        )
      )}
    </>
  );
}

export default Profile;
