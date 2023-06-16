import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Grid,
  Avatar,
  Tooltip,
} from "@mui/material";
import React from "react";
import ItemRating from "./ItemRating";
import Box from "@mui/material/Box";
import PlaceIcon from "@mui/icons-material/Place";

function LargeCard(props: {
  title: string;
  description: string;
  rating: number;
  type: string;
  imageUrl?: string;
  isDeletable: boolean;
  time_stamp: any;
  user_image: any;
  user_name: string;
  location: string;
  place_id: string;
}) {
  const {
    title,
    description,
    rating,
    type,
    imageUrl,
    time_stamp,
    user_image,
    user_name,
    location,
    place_id,
  } = props;

  const handleOpenInGoogleMaps = () => {
    const encodedLocationName = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocationName}`;
    window.open(url);
  };
  return (
    <>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "50%",
            objectFit: "cover",
            maxHeight: 400,
          }}
          image={imageUrl}
          alt="item card"
          placeholder="blur"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {location ? (
            <button onClick={handleOpenInGoogleMaps}>
              <Typography gutterBottom variant="h4" component="div">
                {title}
                <PlaceIcon
                  sx={{ minHeight: 30, minWidth: 30, marginBottom: 0.5 }}
                />
              </Typography>
            </button>
            ) : (
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Chip
                sx={{
                  fontSize: "14px",
                  color: "primary",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
                label={type === "all" ? "NO TYPE" : type.toUpperCase()}
              />
              <Chip
                sx={{
                  fontSize: "14px",
                  color: "primary",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
                label={new Date(time_stamp).toLocaleDateString()}
              />
              <Tooltip title={user_name} placement="top">
                <Avatar
                  src={!user_image ? "/image_not_found.jpg" : user_image}
                  alt="User Avatar"
                  sx={{
                    width: 50,
                    height: 50,
                    marginLeft: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <Box
            sx={{
              height: "200px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              padding: "8px",
              overflow: "auto",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              fontSize={18}
            >
              {description}
            </Typography>
          </Box>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ marginTop: "15px", paddingRight: "10px" }}
          >
            <Grid item>
              <ItemRating
                rating={rating}
                isReadOnly={true}
                getRating={undefined}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default LargeCard;
