"use client";
import { IconButton } from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Dropdown from "./Dropdown";
import PostForm from "./PostForm";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

import ItemSelector from "./ItemSelector";

function ProfilePage(props: any) {
  const [selectedType, setSelectedType] = useState("all");
  const [buttonClicked, setButtonClicked] = useState(false);

  const emptyList: any[] = [];
  //cards => handle filter
  const [cards, setCards] = useState(emptyList);

  // list of all posts
  const [allPosts, setAllPosts] = useState(emptyList);

  const [formSubmitted, setFormSubmitted] = useState(true);

  //firestore reference
  const usersCollectionReference = collection(db, "users/");
  const userDocRef = doc(usersCollectionReference, props.user.user_id);
  const postsColelctionReference = collection(userDocRef, "posts/");

  // dropdown filter to filter by category
  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    setCards(
      type === "all"
        ? allPosts
        : allPosts.filter((card: any) => card.type === type)
    );
  };

  // get posts from users/<user_id>/posts/
  const getPosts = async () => {
    if (props.user && formSubmitted) {
      setFormSubmitted(false);
      const data: any = await getDocs(postsColelctionReference);
      console.log("fetching posts");
      const allPosts = data.docs.map((doc: { data: () => any; id: any }) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCards(allPosts);
      setAllPosts(allPosts);
    }
  };

  //const debouncedGetPosts = debounce(getPosts, 300);
  useEffect(() => {
    getPosts();
  }, [formSubmitted]);

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-11/12 ml-1">
          <Dropdown onSelectChange={handleFilterChange} />
        </div>
        <div className="basis-1/12">
          <IconButton
            onClick={() => {
              setButtonClicked(!buttonClicked);
            }}
            sx={{
              mt: 3,
              minHeight: 50,
              minWidth: 50,
              ml: { xs: 0, sm: 0, md: 3, xl: 2 },
              transition: "transform 0.3s",
              transform: buttonClicked ? "rotate(45deg)" : "none",
            }}
          >
            <AddCircleSharpIcon sx={{ minHeight: 40, minWidth: 40 }} />
          </IconButton>
        </div>
      </div>
      {!buttonClicked ? (
        <ItemSelector
          cards={cards}
          isDeletable={true}
          setFormSubmitted={setFormSubmitted}
        />
      ) : (
        <PostForm
          type={selectedType}
          buttonClicked={buttonClicked}
          setButtonClicked={setButtonClicked}
          setFormSubmitted={setFormSubmitted}
        />
      )}
    </>
  );
}

export default ProfilePage;
