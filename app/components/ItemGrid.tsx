import { Grid } from "@mui/material";
import React from "react";
import ItemCard from "./ItemCard";
import { motion } from "framer-motion";

function ItemGrid(props: any) {
  const CardAnimation = {
    initial: { scale: 1 },
    animate: { scale: 1.02 },
  };
  return (
    <Grid
      container
      spacing={1}
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      {props.cards.map((card: any) => {
        return (
          <Grid
            key={card.post_id}
            item
            xs={12}
            lg={3}
            md={3}
            xl={2}
            sx={{ paddingBottom: 1 }}
          >
            <motion.div
              variants={CardAnimation}
              initial="initial"
              whileHover="animate"
              onClick={() => props.handleCardClick(card)}
            >
              <ItemCard
                {...card}
                isDeletable={props.isDeletable}
                setFormSubmitted={props.setFormSubmitted}
                excludeButtonClick={true}
              />
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemGrid;
