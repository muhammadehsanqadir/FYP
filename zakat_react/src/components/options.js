import React from "react";
import "./options.css";


const Options = (props) => {
  const options = [
    { 
    text: "What is Zakaat?", 
    handler:() => {props.actionProvider.handleZakat()} , 
    id: 1,
    },
    { text: "How can I pay using TZD?", handler: () => {props.actionProvider.handleTZD()}, id: 2 },
    { text: "Want to calculate Zakat", handler: () => {props.actionProvider.handleCalculate()}, id: 3 },
    { text: "Helpline", handler: () => {props.actionProvider.handleHelp()}, id: 4 },
    { text: "Office Location", handler: () => {props.actionProvider.handleLocation()}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default Options;