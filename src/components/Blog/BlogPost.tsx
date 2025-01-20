import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for the carousel

const BlogPost = () => {
  return (
    <div>
      <div className="flex gap-4 mb-4">
        {["facebook", "pinterest", "twitter", "instagram", "youtube"].map(
          (icon) => (
            <a key={icon} href="#" className="text-xl">
              <i className={`fab fa-${icon}`}></i>
            </a>
          )
        )}
      </div>
      <div className="carousel-container">
        {/* <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Prev Articles</p>
            <p className="font-bold">
              Best LearnPress WordPress Theme Collection For 2023
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Next Articles</p>
            <p className="font-bold">
              Another LearnPress WordPress Theme Collection For 2023
            </p>
          </div>
        </Carousel> */}
      </div>
    </div>
  );
};

export default BlogPost;
