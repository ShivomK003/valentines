import React from "react";
import img5 from "../assets/5.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";

export default function MessagePlaceholder({ answer }) {
  if (!answer) return null;

  if (answer === "yes") {
    return (
      <div className="memoryLayout">
        {/* Section 1 */}
        <div className="memoryRow">
          <div className="memoryText">
            <h2>YAYYYY 😜🥰</h2>
            <p>
              Happy Valentines Tanishi. I know today may not be the happiest of days since I'm leaving for Sydney again
              but I wanted to give you this message anyways.
            </p>
            <p>I cant say this enough but I'll miss you. A lot. I really want us to work out this time.</p>
          </div>

          <div className="memoryImage">
            <img src={img5} alt="Us" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="memoryRow reverse">
          <div className="memoryText">
            <p>
              You have always been my favorite part of the day, every day. I love our conversations, your laugh, your
              smile, and the way we look at each other even through the screen.
            </p>
          </div>

          <div className="memoryImage">
            <img src={img2} alt="Us" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="memoryRow">
          <div className="memoryText">
            <p>
              I know it won’t always be easy and we'll face challenges, but I want to and feel ready to face those with
              you bb.
            </p>
            <p>I love you so much Shona. See you very soon pookie. 🥹</p>
          </div>

          <div className="memoryImage">
            <img src={img3} alt="Us" />
          </div>
        </div>
      </div>
    );
  }

  return <div className="messageBox">Nice try 😌</div>;
}
