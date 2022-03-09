import React, { useState } from "react";
import { useEffect } from "react";
import { attributes } from "swell-js";
import { set } from "swell-js/dist/utils";
import styles from "../styles/OptionSelector.module.css";

export default function OptionSelector({
  option,
  updateOptions,
  selectedOptions,
  updateOptionsID,
}) {
  const [colorLabel, setColorLabel] = useState();
  const [cardHover, setCardHover] = useState(false);

  const handleClick = (value) => {
    updateOptions(option.name, value.name);
  };

  const handleMouseOver = (value) => {
    setColorLabel(value.name);
  };

  const handleMouseOut = (value) => {
    if (!selectedOptions[option.name]) {
      setColorLabel("");
    }
  };

  const cardColor = (value) => {
    if (value.name === "Negro") {
      return "black";
    } else if (value.name === "Blanco") {
      return "white";
    }
  };
  const cardType = (value) => {
    if (option.name === "Color") {
      return (
        <div key={value.id} className={styles.valueCard}>
          <div
            onMouseOver={() => handleMouseOver(value)}
            onMouseOut={() => handleMouseOut(value)}
            onClick={() => handleClick(value)}
            style={{
              background: cardColor(value),
            }}
            className={
              selectedOptions[option.name] === value.name
                ? styles.colorCardContainerSelected
                : styles.colorCardContainer
            }
          ></div>
        </div>
      );
    } else {
      return (
        <div key={value.id} className={styles.valueCard}>
          <div
            onClick={() => handleClick(value)}
            className={
              selectedOptions[option.name] === value.name
                ? styles.cardContainerSelected
                : styles.cardContainer
            }
          >
            <p>{value.name}</p>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (option.name === "Color") {
      setColorLabel(selectedOptions[option.name]);
    }
  }, [selectedOptions]);

  useEffect(() => {
    updateOptions(option.name, option.values[0].name);
  }, []);

  return (
    <div className={styles.optionSelector}>
      <div className={styles.row}>
        <label>
          <b>{option.name}</b>
        </label>
        <label style={{ marginLeft: "10px" }}>{colorLabel}</label>
      </div>
      <div className={styles.valuesContainer}>
        {option.values.map((value) => cardType(value))}
      </div>
    </div>
  );
}
