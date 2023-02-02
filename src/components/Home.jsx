import React from "react";
import ContentContainer from "./Content/ContentContainer";

const Home = () => {
  return (
    <div>
      <div className="main-container">
        <main className="content-container">
          <ContentContainer />
        </main>
      </div>
    </div>
  );
};

export default Home;