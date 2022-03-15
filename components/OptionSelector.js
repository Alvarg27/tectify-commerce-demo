import React, { useState } from "react";
import { useEffect } from "react";
import { attributes } from "swell-js";
import { set } from "swell-js/dist/utils";
import styles from "../styles/OptionSelector.module.css";
import OptionSelectorCard from "./OptionSelectorCard";

export default function OptionSelector({
  option,
  updateOptions,
  selectedOptions,
  template,
}) {
  useEffect(() => {
    updateOptions(option.name, option.values[0].name);
  }, []);
  return (
    <div className={styles.optionSelector}>
      <div className={styles.row}>
        <label>
          <b>{option.name}</b>
        </label>
        <label style={{ marginLeft: "10px" }}>
          {selectedOptions[option.name]}
        </label>
      </div>
      <div className={styles.valuesContainer}>
        {option.values.map((value) => (
          <OptionSelectorCard
            key={value.id}
            value={value}
            updateOptions={updateOptions}
            selectedOptions={selectedOptions}
            template={template}
            option={option}
          />
        ))}
      </div>
    </div>
  );
}
