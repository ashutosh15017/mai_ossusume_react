import { Dialog } from "@mui/material";
import { useState } from "react";
import ItemCard from "./ItemCard";
import Grow from "@mui/material/Grow";
import { useMediaQuery } from "@mui/material";
import ItemGrid from "./ItemGrid";

function ItemSelector(props: {
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

  const isLargeScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.up("lg")
  );
  const [itemCardData, setItemCardData] = useState({});
  const handleImageChange = (itemId:any, newImageData:any) => {
    setItemCardData((prevData) => ({
      ...prevData,
      [itemId]: newImageData,
    }));
  };
  return (
    <>
      {isModalOpen ? (
        isLargeScreen ? (
          <>
            <ItemGrid
              cards={cards}
              handleCardClick={handleCardClick}
              isDeletable={isDeletable}
              setFormSubmitted={setFormSubmitted}
              handleImageChange={handleImageChange}
              itemCardData={itemCardData}
            />
            <Dialog
              open={isModalOpen}
              onClose={handleCloseModal}
              TransitionComponent={Grow}
              scroll="body"
              classes={{ paper: "dialogContainer" }}
            >
              {selectedCard && (
                <div className="dialogContent">
                  <ItemCard
                    {...selectedCard}
                    isLargeCard={true}
                    handleCloseModal={handleCloseModal}
                    sx={{ flex: 1 }}
                  />
                </div>
              )}
            </Dialog>
          </>
        ) : (
          <>
            <ItemCard
              {...selectedCard}
              isLargeCard={true}
              sx={{ flex: 1 }}
              handleCloseModal={handleCloseModal}
            />
          </>
        )
      ) : (
        <ItemGrid
          cards={cards}
          handleCardClick={handleCardClick}
          isDeletable={isDeletable}
          setFormSubmitted={setFormSubmitted}
          handleImageChange={handleImageChange}
          itemCardData={itemCardData}
        />
      )}
    </>
  );
}

export default ItemSelector;
