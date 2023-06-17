"use client";
import {
  Grid,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  CardActions,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "../styles/globals.css";
import debounce from "lodash/debounce";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function UserListPage(props: any) {
  const [userList, setUserList] = useState<any>([]);
  const [followingList, setFollowingList] = useState<any>([]);
  const usersCollectionReference = collection(db, "users/");
  const userDocRef = doc(usersCollectionReference, props.user.user_id);
  const followingCollectionReference = collection(userDocRef, "following/");
  const [isUpdateFollow, setIsUpdateFollow] = useState<boolean>(false);

  const debouncedGetUsers = debounce(async (searchQuery) => {
    if (searchQuery == "") {
      setUserList([]);
      return;
    }
    const formattedSearchQuery =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();

    const usersCollectionReference = collection(db, "users/");
    const usersQuery = query(
      usersCollectionReference,
      where("name", ">=", formattedSearchQuery)
    );

    const searchResults = await getDocs(usersQuery);
    const userList: any = [];
    searchResults.forEach((doc) => {
      const user = doc.data();
      userList.push(user);
    });

    setUserList(userList);
    console.log("user search list: ", userList);
  }, 1000);

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    debouncedGetUsers(value);
  };

  const onFollow = async (id: any, name: string, profile_pic: string) => {
    const followObject = createFollowObject(id, name, profile_pic);
    const docRef = await addDoc(followingCollectionReference, followObject);
    const followObjectDocId = {
      object_id: docRef.id,
    };
    await updateDoc(docRef, followObjectDocId).then(() => {
      setIsUpdateFollow(true);
    });
  };

  const createFollowObject = (id: any, name: string, profile_pic: string) => {
    const follow = {
      following_user_id: id,
      time_stamp: Date.now(),
      user_name: name,
      image_url: profile_pic,
    };
    return follow;
  };

  useEffect(() => {
    const getFollowing = async () => {
      const searchResults = await getDocs(followingCollectionReference);
      const allFollowing = searchResults.docs.map(
        (doc: { data: () => any; id: any }) => ({
          ...doc.data(),
          id: doc.id,
        })
      );
    //   console.log("following list:", allFollowing);
      setFollowingList(allFollowing);
      setIsUpdateFollow(false);
    };
    getFollowing();
  }, [isUpdateFollow]);

  const isFollowing = (user: any) => {
    return followingList.some((fuser: any) => {
      return fuser.following_user_id == user.user_id;
    });
  };

  const getDocId = (user_id: any) => {
    const foundUser = followingList.find(
      (fuser: any) => fuser.following_user_id === user_id
    );
    if (foundUser) {
      return foundUser.object_id;
    }
    return "";
  };

  const onUnFollow = (id: string) => {
    const docId: string = getDocId(id);
    const docRef = doc(db, `users/${props.user.user_id}/following`, docId);
    deleteDoc(docRef)
      .then(() => {
        setIsUpdateFollow(true);
      })
      .catch((error) => {
        console.error("Error removing follower: ", error);
      });
  };

  return (
    <>
      <form>
        <Box display="flex" justifyContent={"center"} marginTop={1}>
          <Grid container padding={2}>
            <Grid item xs={12} marginTop={5}>
              <Typography
                paddingLeft={1}
                gutterBottom
                variant="h5"
                component="div"
              >
                Search User
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                autoFocus
                fullWidth
                required
                inputProps={{
                  maxLength: 100,
                }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} marginTop={2}>
              <List>
                {userList.length === 0 && (
                  <ListItem key={0}>No users found</ListItem>
                )}
                {userList
                  .filter((user: any) => {
                    return user.user_id != props.user.user_id;
                  })
                  .map((user: any) => (
                    <Card sx={{ width: "100%", padding: 2 }} key={user.user_id}>
                      <ListItem key={user.user_id}>
                        <ListItemAvatar>
                          <Avatar src={user.profile_pic} alt={user.name} />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} />
                        <CardActions sx={{ marginLeft: "auto" }}>
                          {isFollowing(user) ? (
                            <IconButton
                              onClick={() => onUnFollow(user.user_id)}
                            >
                              <RemoveCircleIcon
                                sx={{ minHeight: 30, minWidth: 30 }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              style={{ color: "#ff726f" }}
                              onClick={() =>
                                onFollow(
                                  user.user_id,
                                  user.name,
                                  user.profile_pic
                                )
                              }
                            >
                              <AddCircleRounded
                                sx={{ minHeight: 30, minWidth: 30 }}
                              />
                            </IconButton>
                          )}
                        </CardActions>
                      </ListItem>
                    </Card>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default UserListPage;
