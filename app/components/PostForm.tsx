import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ItemRating from "./ItemRating";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UploadFile } from "@mui/icons-material";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";
import StyledIconButton from "../styles/StyledButton";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";
import AddressInput from "./AddressInput";

function PostForm(props: {
  type: string;
  buttonClicked: any;
  setButtonClicked: any;
  setFormSubmitted: any;
}) {
  const { type, buttonClicked, setButtonClicked, setFormSubmitted } = props;
  const [value, setValue] = useState<number | null>(5);
  const [location, setLocation] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const userObject: any = JSON.parse(localStorage.getItem("userObject")!);
  const usersCollectionReference = collection(db, "users/");
  const userDocRef = doc(usersCollectionReference, userObject.user_id);
  const postsColelctionReference = collection(userDocRef, "posts/");
  const [showLoading, setShowLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const addPostDB = async (post: any) => {
    setShowLoading(true);

    //add to path users/<user_id>/posts/<post_id>
    const docRef = await addDoc(postsColelctionReference, post);

    // and post and image link to the post
    const postAndImageLinks = {
      post_id: docRef.id,
      image_link:
        `images/${userObject.user_id}/` +
        `${docRef.id}/` +
        `${selectedImage.name}`,
    };
    await updateDoc(docRef, postAndImageLinks);

    //upload image to firebase using : images/<user_id>/<post_id>/<image_name>
    uploadImageFirebase(postAndImageLinks.image_link);
  };

  const uploadImageFirebase = (imageLink: string) => {
    if (selectedImage == null) return;
    const imageRef = ref(storage, imageLink);
    uploadBytes(imageRef, selectedImage).then(() => {
      setFormSubmitted(true);
      setShowLoading(false);
      setButtonClicked(!buttonClicked);
      console.log("image uploaded");
    });
  };

  const onSubmit = (data: any) => {
    if (selectedImage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const post = createRequestObject(data);
      addPostDB(post);
    } else {
      alert("please select image");
    }
  };

  const createRequestObject = (data: any) => {
    data.type = type;
    data.user_id = userObject.user_id;
    data.user_image = userObject.profile_pic;
    data.rating = value;
    data.user_name = userObject.name;
    data.time_stamp = Date.now();
    if (location) {
      data.location = location.label;
      data.place_id = location.value.place_id;
    }
    return data;
  };

  const handleUploadImage = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const getRating = (rating: number) => {
    setValue(rating);
  };

  const maxLength = 500;
  const description = watch("description");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent={"center"} marginTop={1}>
          <Card
            sx={{
              minHeight: 400,
              margin: "1px",
              padding: "10px",
            }}
          >
            <Grid container padding={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography
                    paddingLeft={1}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Submit Post:{" "}
                    <Chip
                      label={
                        type == "all"
                          ? "NO TYPE SELECTED"
                          : type.toLocaleUpperCase()
                      }
                    />
                  </Typography>
                </Box>
                {showLoading ? <LinearProgress /> : <Divider />}
              </Grid>
              <Grid item xs={12} marginTop={5}>
                <Typography
                  paddingLeft={1}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  Title*
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  required
                  inputProps={{
                    maxLength: 30,
                  }}
                  {...register("title")}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={12}>
                <Typography
                  paddingLeft={1}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  marginTop={1}
                >
                  Description*
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  required
                  rows={5}
                  multiline
                  sx={{
                    height: "calc(1.5em * 5 + 1.5em)",
                  }}
                  inputProps={{
                    maxLength: maxLength,
                  }}
                  {...register("description")}
                />
                {description && (
                  <Typography variant="body2">
                    {maxLength - description.length} characters left
                  </Typography>
                )}
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={12}>
                <Typography
                  paddingLeft={1}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  marginTop={1}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={2}>
                <AddressInput setLocation={setLocation} />
              </Grid>

              <Grid item xs={12} marginTop={2}>
                {selectedImage ? (
                  <>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginTop: "10px",
                      }}
                    >
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        height={250}
                        width={300}
                      />
                      <StyledIconButton onClick={handleRemoveImage}>
                        <ClearIcon />
                      </StyledIconButton>
                    </div>
                  </>
                ) : (
                  <Button
                    sx={{ marginTop: 2 }}
                    component="label"
                    variant="contained"
                    color="primary"
                    endIcon={<UploadFile />}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadImage}
                    />
                  </Button>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  paddingLeft={1}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  marginTop={2}
                >
                  Rating
                </Typography>
              </Grid>
              <Grid className="mt-3 ml-1" item xs={12}>
                <ItemRating
                  rating={5}
                  isReadOnly={false}
                  getRating={getRating}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button
                    className="pt-2 mt-10"
                    type="submit"
                    style={{
                      width: "100%",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </form>
    </>
  );
}

export default PostForm;
