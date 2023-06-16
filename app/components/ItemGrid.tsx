import { Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import Grow from "@mui/material/Grow";
import { motion } from "framer-motion";

function ItemGrid(props: {
  cards: any;
  isDeletable: boolean;
  setFormSubmitted?: any;
}) {
  const { cards, isDeletable, setFormSubmitted } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  const CardAnimation = {
    initial: { scale: 1 },
    animate: { scale: 1.02 },
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          paddingLeft: { xs: 3, sm: 3, md: 3, xl: 2 },
          paddingRight: { xs: 3, sm: 3, md: 3, xl: 2 },
        }}
      >
        {cards.map((card: any) => {
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
                onClick={() => handleCardClick(card)}
              >
                <ItemCard
                  {...card}
                  isDeletable={isDeletable}
                  setFormSubmitted={setFormSubmitted}
                  excludeButtonClick={true}
                />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          TransitionComponent={Grow}
          scroll="body"
          maxWidth="xl"
          classes={{ paper: "dialogContainer" }}
        >
          {selectedCard && (
            <div className="dialogContent">
              <ItemCard {...selectedCard} isLargeCard={true} sx={{ flex: 1 }} />
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}

export default ItemGrid;
