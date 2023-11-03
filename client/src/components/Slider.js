import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

const Slider = () => {
  const [postImageURLs, setPostImageURLs] = useState([]);
  const [randomImageURLs, setRandomImageURLs] = useState([]);

  useEffect(() => {
    // Fetch post data with image URLs from your API or other source
    // Replace with your actual fetch logic to get post data
    const fetchPostData = async () => {
      try {
        // Assuming the API response contains an array of post objects
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/getPosts`
        );
        const postData = await response.json();
        // console.log("postData:", postData);

        // Extract image URLs from post data and create postImageURLs array
        const imageURLs = postData.data.map((post) => post.foodPicture);
        setPostImageURLs(imageURLs);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    // Call the fetchPostData function to fetch post data and image URLs
    fetchPostData();
  }, []);

  useEffect(() => {
    // Shuffle the postImageURLs array to get a random order of images
    const shuffledImageURLs = postImageURLs.sort(() => Math.random() - 0.5);
    // Take the first 10 images (or less if postImageURLs has fewer than 10)
    const selectedRandomImageURLs = shuffledImageURLs.slice(0, 10);
    setRandomImageURLs(selectedRandomImageURLs);
  }, [postImageURLs]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      showDots={true}
      autoPlay={true}
      containerClass="carousel-container"
      swipeable={true}
      rewind={true}
      rewindWithAnimation={true}
    >
      {randomImageURLs.map((imageUrl, index) => (
        <Div key={index}>
          <Img src={imageUrl} alt={`food-picture-${index}`} />
        </Div>
      ))}
    </Carousel>
  );
};

export default Slider;

const Div = styled.div`
  width: 230px;
  margin: auto;
`;

const Img = styled.img`
  width: 100%;
  height: 290px;
  border-radius: 5px;
  object-fit: cover;
`;
