// REACT AND FRIENDS
import React, { useState, useLayoutEffect } from "react";

// MATERIAL UI
import Card from "@material-ui/core/Card";

// EXTERNAL IMPORTS
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

// INTERNAL IMPORTS
import Stave from "./Stave";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  flashcard: {
    borderRadius: "0.25rem",
    height: "12rem",
    padding: "1rem",
    fontSize: "1.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  backOfCard: {
    border: "1px solid #000000",
  },
  largeStave: {
    alignSelf: "flex-start",
  },
});

function Flashcard({ flashcard, className }) {
  const classes = useStyles();
  const { front, back } = flashcard;
  const [isFront, setIsFront] = useState(true);

  useLayoutEffect(() => {
    setIsFront(true);
  }, [flashcard]);

  const flipCard = () => {
    setIsFront(!isFront);
  };

  const prepareLayout = (side) => {
    // front and back will be an array of objects
    // each object has the keys "type" and "content"
    // we want the content to be rendered based on the type

    return side.map((section) => {
      if (section.type === "text") {
        return <div key={uuidv4()}>{section.content}</div>;
      }
      if (section.type === "stave") {
        return (
          <Stave
            id={uuidv4()}
            key={Math.random()}
            clef={section.content.clef}
            timeSignature={section.content.timeSignature}
            keySignature={section.content.keySignature}
            notes={section.content.notes}
          />
        );
      }
    });
  };

  return (
    <Card
      className={clsx(className, classes.flashcard, {
        [classes.backOfCard]: !isFront,
      })}
      variant="outlined"
      onClick={flipCard}
    >
      {isFront ? prepareLayout(front) : prepareLayout(back)}
    </Card>
  );
}

export default Flashcard;
