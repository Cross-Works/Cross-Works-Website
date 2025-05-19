import React, { type CSSProperties } from "react";
import spinnerImage from "../../images/Spinner.svg";

interface SpinnerProps {
  /** Optional CSS styles for the spinner container */
  style?: CSSProperties;
  /** Optional width for the spinner image */
  width?: number;
  /** Optional height for the spinner image */
  height?: number;
}

/**
 * A component that renders a loading spinner with an optional message.
 * 
 * @param {SpinnerProps} props - The properties for the spinner.
 * @param {CSSProperties} [props.style] - Optional CSS styles for the spinner container.
 * @param {number} [props.width] - Optional width for the spinner image.
 * @param {number} [props.height] - Optional height for the spinner image.
 * 
 * @returns {JSX.Element} The rendered Spinner component.
 */
const Spinner: React.FC<SpinnerProps> = ({ style, width, height }) => {
  return (
    <div
      style={
        style
          ? style
          : {
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: 'column',
              opacity: 1,
              zIndex: 50,
              color: 'white'
            }
      }
    >
      <div>
        <img
          src={spinnerImage}
          alt="Loading..."
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default Spinner;
