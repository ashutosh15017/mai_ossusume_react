import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import SmallCard from "./SmallCard";
import LargeCard from "./LargeCard";

function ItemCard(props: {
  title: string;
  description: string;
  rating: number;
  type: string;
  image_link: string;
  user_id: number;
  post_id: string;
  isDeletable: boolean;
  setFormSubmitted?: any;
  isLargeCard?: boolean;
  excludeButtonClick?: boolean;
  time_stamp: any;
  user_image: any;
  user_name: string;
  location: string;
  place_id: string;
  handleCloseModal: any;
  handleImageChange: any;
  itemCardData: any;
}) {
  const [imageTransparency, setImageTransparency] = useState(1);
  const {
    title,
    description,
    rating,
    type,
    image_link,
    user_id,
    post_id,
    isDeletable,
    setFormSubmitted,
    isLargeCard,
    excludeButtonClick,
    time_stamp,
    user_image,
    user_name,
    location,
    place_id,
    handleCloseModal,
    handleImageChange,
    itemCardData,
  } = props;

  const imageState = itemCardData?.[image_link] || null;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!imageState) {
          const sessionImage = sessionStorage.getItem(image_link);
          if (sessionImage) {
            console.log("image being fetched from session");
            handleImageChange(image_link, sessionImage);
          } else {
            console.log("image being fetched from firebase");
            const imageRef = ref(storage, image_link);
            const url = await getDownloadURL(imageRef);
            sessionStorage.setItem(image_link, url);
            handleImageChange(image_link, url);
          }
        } 
      } catch (error) {
        console.error("Error fetching image from Firebase Storage:", error);
      }
    };

    fetchImage();
  }, [image_link]);

  function handleDeletePost(event: any): void {
    if (excludeButtonClick) {
      event.stopPropagation();
    }
    setImageTransparency(0.2);
    sessionStorage.removeItem(image_link);

    const docRef = doc(db, `users/${user_id}/posts`, post_id);
    deleteDoc(docRef)
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    const storageRef = ref(storage, image_link);
    deleteObject(storageRef)
      .then(() => {
        console.log("Image successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
      });
  }

  return (
    <>
      {!isLargeCard ? (
        <SmallCard
          title={title}
          description={description}
          rating={rating}
          type={type}
          imageUrl={!imageState ? "/image_not_found.jpg" : imageState}
          isDeletable={isDeletable}
          imageTransparency={imageTransparency}
          handleDeletePost={handleDeletePost}
          time_stamp={time_stamp}
        />
      ) : (
        <>
          <LargeCard
            title={title}
            description={description}
            rating={rating}
            type={type}
            isDeletable={false}
            imageUrl={!imageState ? "/image_not_found.jpg" : imageState}
            time_stamp={time_stamp}
            user_image={user_image}
            user_name={user_name}
            location={location}
            place_id={place_id}
            handleCloseModal={handleCloseModal}
          />
        </>
      )}
    </>
  );
}

export default ItemCard;
