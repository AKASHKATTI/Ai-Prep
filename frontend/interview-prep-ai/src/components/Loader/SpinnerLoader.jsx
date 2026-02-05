import React, { useState } from 'react'
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const SpinnerLoader = () => {
     let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
    return (
        <div style={{ textAlign: "center" }}>
            <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
    )
}

export default SpinnerLoader;