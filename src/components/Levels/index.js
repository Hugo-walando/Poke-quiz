import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, quizLevel }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizSteps = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(quizSteps);
  }, [levelNames]);

  return (
    <div className="levelsContainer">
      <div>
        <Stepper
          steps={levels}
          activeStep={quizLevel}
          activeColor={"#539B5C"}
          defaultTitleColor={"#E0E0E0"}
          activeTitleColor={"#539B5C"}
          completeColor={"#539B5C"}
          completeTitleColor={"#539B5C"}
          completeBarColor={"#539B5C"}
          size={40}
        />
      </div>
    </div>
  );
};

export default React.memo(Levels);
