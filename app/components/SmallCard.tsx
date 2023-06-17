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
import RemoveIcon from "@mui/icons-material/Remove";

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
            maxWidth: 600,
            display: "flex",
            margin: "1px",
            padding: "1px",
            flexDirection: "column",
            position: "relative",
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
            <StyledIconButton onClick={handleDeletePost} sx={{ margin: 1 }}>
              <RemoveIcon />
            </StyledIconButton>
          )}

          <CardContent
            sx={{ display: "flex", flexDirection: "column", height: "40%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  marginRight: "8px",
                  flex: "0 1 auto",
                  wordBreak: "break-word",
                  minWidth: 0,
                }}
              >
                {title.length > 30 ? `${title.substring(0, 30)}..` : title}
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
                    fontSize: "12px",
                    color: "primary",
                    mb: 1,
                  }}
                  label={type === "all" ? "GENERAL" : type.toUpperCase()}
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
                flex: "0 1 auto",
                wordBreak: "break-word",
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
