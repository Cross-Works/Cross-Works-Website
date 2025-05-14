import React from "react";
import Spinner from "../Spinner";

/**
 * A component that serves as a fallback UI, displaying a header, a footer, and a spinner.
 * It is typically used to indicate a loading state or to display while content is being fetched.
 * 
 * @returns {JSX.Element} The rendered Fallback component.
 */
const Fallback: React.FC = () => {
  return (
    <>
      <div
        style={{
          height: "auto",
        }}
      >
        <Spinner />
      </div>
    </>
  );
};

export default Fallback;



