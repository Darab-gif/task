import React, { useState, useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";

const sdk = new MkdSDK();

const DashBoard = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Call the paginate API to get the first page of videos
    sdk.setTable("videos");
    sdk
      .callRestAPI({ page: currentPage, limit: 10 }, "PAGINATE")
      .then((data) => {
        setVideos(data.data);
        console.log(videos);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    // Increment the page number when the Next button is clicked
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    // Decrement the page number when the Prev button is clicked
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div>
        {videos.map((video) => (
          <div key={video.id} className="border-2 border-[#ddd] flex flex-row">
            <div>
              <p>{video.user_id}</p>
              <img src={video.photo} className="h-[50px] w-[50px]" />
              <h3>{video.title}</h3>
            </div>
            <div>
              <p>{video.like}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default DashBoard;
