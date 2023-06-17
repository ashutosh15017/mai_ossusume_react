import { Dialog, Fade, Slide, Zoom } from "@mui/material";
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
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const handleCardClick = (card: any, event: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setCardPosition({ x: centerX, y: centerY });
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  const isLargeScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.up("lg")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  const [itemCardData, setItemCardData] = useState({});
  const handleImageChange = (itemId: any, newImageData: any) => {
    setItemCardData((prevData) => ({
      ...prevData,
      [itemId]: newImageData,
    }));
  };
  return (
    <>
      {isModalOpen ? (
        isLargeScreen || isMediumScreen ? (
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
                    handleImageChange={handleImageChange}
                    itemCardData={itemCardData}
                  />
                </div>
              )}
            </Dialog>
          </>
        ) : (
          <>
            <Grow
              key={selectedCard.post_id}
              in={isModalOpen}
              unmountOnExit
              style={{
                transformOrigin: `${cardPosition.x}px ${cardPosition.y}px 0`,
              }}
              timeout={300}
            >
              <div>
                <ItemCard
                  {...selectedCard}
                  isLargeCard={true}
                  sx={{ flex: 1 }}
                  handleCloseModal={handleCloseModal}
                  handleImageChange={handleImageChange}
                  itemCardData={itemCardData}
                />
              </div>
            </Grow>
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
