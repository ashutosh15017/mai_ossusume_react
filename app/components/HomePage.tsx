import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import ItemGrid from "./ItemGrid";

function HomePage(props: any) {
  //displayed posts
  const emptyList: any[] = [];
  const [cards, setCards] = useState(emptyList);
  const [all, setAll] = useState(emptyList);
  const [followingIdList, setFollowingIdList] = useState<any>([]);

  //firestore reference
  const usersCollectionReference = collection(db, "users/");
  const userDocRef = doc(usersCollectionReference, props.user.user_id);
  const followingCollectionReference = collection(userDocRef, "following/");
  const postsCollectionRef = collectionGroup(db, "posts");

  const DAY_30_FETCH = 30 * 24 * 60 * 60 * 1000;

  const getPostsFromFollowed = async (searchResults: any) => {
    const allFollowing = searchResults.docs.map(
      (doc: { data: () => any; id: any }) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    const userIds = allFollowing.map((user: any) => user.following_user_id);
    setFollowingIdList(userIds);

    if (userIds.length > 0) {
      const Fquery = query(
        postsCollectionRef,
        where("user_id", "in", userIds),
        where("time_stamp", ">=", Date.now() - DAY_30_FETCH)
      );
      
      const querySnapshot = await getDocs(Fquery);
      console.log("fetching posts from following users");

      const allPosts: any = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        allPosts.push(post);
      });

      setCards(allPosts);
      setAll(allPosts);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      if (props.user) {
        await getDocs(followingCollectionReference).then((result) => {
          getPostsFromFollowed(result);
        });
      } else {
        alert("user not logged in");
      }
    };
    getPosts();
  }, []);

  const handleChange = (type: React.SetStateAction<string>) => {
    setCards(
      type === "all" ? all : all.filter((card: any) => card.type === type)
    );
  };
  return (
    <>
      <div className="w-full">
        <Dropdown onSelectChange={handleChange} />
      </div>
      <ItemGrid cards={cards} isDeletable={false} />
    </>
  );
}

export default HomePage;
