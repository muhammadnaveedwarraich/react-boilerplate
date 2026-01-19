import React from "react";

const Stepper = ({ steps, activeStep = 0, setActiveStep }) => {
  const isCompleted = (index) => index < activeStep;
  const isActive = (index) => index === activeStep;

  return (
    <div className="w-full flex items-center justify-center mx-auto">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const active = isActive(index);
          const completed = isCompleted(index);

          const wrapperStyle =
            active || completed
              ? "text-primary border-primary"
              : "text-white border-white bg-white/10 backdrop-blur-sm";

          const circleStyle = completed
            ? "bg-primary text-white"
            : active
            ? "border border-primary text-primary"
            : "border border-white text-white bg-transparent backdrop-blur";

          const barStyle = completed ? "bg-primary" : "bg-white/20";

          return (
            <div
              key={index}
              className="group flex w-full items-center cursor-pointer"
              onClick={() => setActiveStep(index)}
            >
              <div className="flex flex-col items-center relative z-10">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full transition ${circleStyle}`}
                >
                  {step.icon}
                </span>
                <span
                  className={`mt-2 text-xs font-medium transition ${wrapperStyle}`}
                >
                  {step.heading}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[0.8px] mx-2 transition -pt-2 ${barStyle}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
