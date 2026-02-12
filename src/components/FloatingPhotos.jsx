import React from "react";
import img1 from "../assets/1.jpeg";
import img4 from "../assets/4.jpeg";

export default function FloatingPhotos() {
  return (
    <>
      {/* Left floating polaroid */}
      <div className="polaroid polaroidLeft" aria-hidden="true">
        <img src={img4} alt="" />
        <div className="polaroidCaption">us 🤍</div>
      </div>

      {/* Right floating polaroid */}
      <div className="polaroid polaroidRight" aria-hidden="true">
        <img src={img1} alt="" />
        <div className="polaroidCaption">my favorite</div>
      </div>
    </>
  );
}
