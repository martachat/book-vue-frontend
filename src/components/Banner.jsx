import React, { useState, useEffect } from "react";
import "./Banner.css"

const quotesData = [
    {
      quote: "Every man's memory is his private literature.",
      author: "Aldous Huxley",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Aldous_Huxley_psychical_researcher.png/440px-Aldous_Huxley_psychical_researcher.png",
    },
    {
      quote: "Literature is strewn with the wreckage of men who have minded beyond reason the opinions of others.",
      author: "Virginia Woolf",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg/440px-George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg", // Replace with actual image URL
    },
    {
      quote: "To produce a mighty book, you must choose a mighty theme.",
      author: "Herman Melville",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Herman_Melville.jpg/440px-Herman_Melville.jpg"
    },
    {
        quote: "Literature and butterflies are the two sweetest passions known to man.",
        author: "Vladimir Nabokov",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Vladimir_Nabokov_1973.jpg"
    },
    {
        quote: "A writer never has a vacation. For a writer life consists of either writing or thinking about writing.",
        author: "Eugene Ionesco",
        image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTA4YmAB6ZMxHPqLe64uT9I_NkZBtHy5q68qzfGwUk_6Okh_aq03xwjjTD_XOQa-dxWV9QWIC-nOjAzCPA"
    },
    {
        quote: "The purpose of a writer is to keep civilization from destroying itself.",
        author: "Albert Camus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg/520px-Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg"
    },
    {
        quote: "If I read a book and it makes my whole body so cold no fire can ever warm me, I know that is poetry.",
        author: "Emily Dickinson",
        image: "https://poets.org/sites/default/files/images/biographies/155_EmilyDickinsonSmall.jpg"
    }
  ];

const Banner = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(quotesData[quoteIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotesData.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentQuote(quotesData[quoteIndex]);
  }, [quoteIndex]);

  return (
    <div className="banner">
      <img src={currentQuote.image} alt={currentQuote.author} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
      <p>{currentQuote.quote}</p>
      <p>{currentQuote.author}</p>
    </div>
  );
};

export default Banner