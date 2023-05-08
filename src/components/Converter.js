import React, { useRef } from "react";
import { useCSVReader } from "react-papaparse";

const Converter = () => {
  const { CSVReader } = useCSVReader();
  const handleOnFileLoad = (result) => {
    //Full array
    let finalArr = [];
    for (let i = 0; i < result.data.length; i++) {
      let newObj;
      if (i > 0) {
        const choicesArr = (obj) => {
          const { answers, choices } = obj;
          let choicesArr = [];
          for (let key in choices) {
            choicesArr.push({ [key]: choices[key] });
          }
          const finalObj = {
            answers: answers,
            choices: choicesArr,
          };
          return finalObj;
        };
        newObj = new Object();
        newObj.difficultyLevel = result?.data[i][3];
        newObj.questionName = result?.data[i][0];
        newObj.topicName = result?.data[i][2];
        newObj.subTopic = result?.data[i][4];
        newObj.optionObject = result?.data[i][1]
          ? choicesArr(JSON.parse(result?.data[i][1]))
          : undefined;
      }
      finalArr.push(newObj);
    }

    //For get the unique value and remove the false value
    const uniqueArr = new Set(finalArr.filter((data) => data?.questionName));
    console.log(uniqueArr);
  };
  return (
    <div>
      <label>Select file</label>
      <br />
      <CSVReader onUploadAccepted={handleOnFileLoad}>
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => {
          return (
            <div>
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
            </div>
          );
        }}
      </CSVReader>
      <br />
    </div>
  );
};

export default Converter;
