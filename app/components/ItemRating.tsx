import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";


function ItemRating(props: {
  rating : number,
  isReadOnly : boolean
  getRating : any
}) {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  const [value, setValue] = React.useState<number | null>(5);
  const {rating, isReadOnly: isRead} = props;

  return (
    <>
      <StyledRating
        name="customized-color"
        defaultValue={rating}
        value={isRead?rating:value}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        readOnly={isRead}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.getRating(newValue);
        }}
      />
    </>
  );
}

export default ItemRating;
