"use client";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import UserListPage from "../components/UserListPage";
import { useRouter } from "next/navigation";


function users() {
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
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        user && (
          <>
            <TopNav user={user} />
            <UserListPage user={user} />
          </>
        )
      )}
    </>
  );
}

export default users;
