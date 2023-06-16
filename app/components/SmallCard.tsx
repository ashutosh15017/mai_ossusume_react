import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

import StyledIconButton from "../styles/StyledButton";
import ItemRating from "./ItemRating";
import ClearIcon from "@mui/icons-material/Clear";

function SmallCard(props: {
  title: string;
  description: string;
  rating: number;
  type: string;
  imageUrl?: string;
  isDeletable: boolean;
  imageTransparency?: any;
  handleDeletePost?: any;
  time_stamp: any;
}) {
  const {
    title,
    description,
    rating,
    type,
    isDeletable,
    imageUrl,
    imageTransparency,
    handleDeletePost,
    time_stamp,
  } = props;

  return (
    <>
      <CardActionArea>
        <Card
          sx={{
            height: 400,
            maxWidth: 500,
            margin: "1px",
            padding: "1px",
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt="item card"
            placeholder="blur"
            sx={{
              height: "50%",
              objectFit: "cover",
              maxHeight: 400,
              opacity: imageTransparency,
            }}
          />
          {isDeletable && (
            <StyledIconButton onClick={handleDeletePost}>
              <ClearIcon />
            </StyledIconButton>
          )}
          <CardContent
            sx={{ display: "flex", flexDirection: "column", height: "40%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Chip
                  sx={{
                    fontSize: "14px",
                    color: "primary",
                    mb: 1,
                    mr: 1,
                  }}
                  label={type === "all" ? "NO TYPE" : type.toUpperCase()}
                />
               
                {/* Another chip can go here  */}
              </div>
            </div>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {description}
            </Typography>
          </CardContent>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ marginTop: "auto", paddingRight: "10px" }}
          >
            <Grid item>
              <ItemRating
                rating={rating}
                isReadOnly={true}
                getRating={undefined}
              />
            </Grid>
          </Grid>
        </Card>
      </CardActionArea>
    </>
  );
}

export default SmallCard;
