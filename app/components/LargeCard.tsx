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
import React, { useEffect, useRef } from "react";
import ItemRating from "./ItemRating";
import Box from "@mui/material/Box";
import PlaceIcon from "@mui/icons-material/Place";
import StyledIconButton from "../styles/StyledButton";
import ClearIcon from "@mui/icons-material/Clear";

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
  handleCloseModal: any;
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
    handleCloseModal,
  } = props;

  const handleOpenInGoogleMaps = () => {
    const encodedLocationName = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocationName}`;
    window.open(url);
  };

  const cardRef = useRef<any>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, []);

  return (
    <>
      <div ref={cardRef} tabIndex={0} autoFocus>
        <Card
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: 1,
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
          <StyledIconButton onClick={handleCloseModal}>
            <ClearIcon />
          </StyledIconButton>
          <CardContent sx={{ flexGrow: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "10px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flexBasis: "100%" }}>
                {location ? (
                  <button onClick={handleOpenInGoogleMaps}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        textAlign: "left",
                      }}
                    >
                      {title}
                      <PlaceIcon
                        sx={{ minHeight: 30, minWidth: 30, marginBottom: 0.5 }}
                      />
                    </Typography>
                  </button>
                ) : (
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      wordBreak: "break-word",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      textAlign: "left",
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <Chip
                    sx={{
                      fontSize: "14px",
                      color: "primary",
                      marginBottom: "10px",
                    }}
                    label={type === "all" ? "NO TYPE" : type.toUpperCase()}
                  />
                </div>
                <div>
                  <Chip
                    sx={{
                      fontSize: "14px",
                      color: "primary",
                      marginBottom: "10px",
                    }}
                    label={new Date(time_stamp).toLocaleDateString()}
                  />
                </div>
              </div>
              <div>
                <Tooltip title={user_name} placement="top">
                  <Avatar
                    src={!user_image ? "/image_not_found.jpg" : user_image}
                    alt="User Avatar"
                    sx={{
                      width: 50,
                      height: 50,
                      marginBottom: "10px",
                      cursor: "pointer",
                      marginLeft: 1,
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
                sx={{
                  flex: "0 1 auto",
                  wordBreak: "break-word",
                }}
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
      </div>
    </>
  );
}

export default LargeCard;
