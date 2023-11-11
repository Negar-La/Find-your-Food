import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerHeight = 200; // Adjust this value as needed

    setIsVisible(scrollY > triggerHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollButton onClick={scrollToTop} isVisible={isVisible}>
      <FaArrowUp />
    </ScrollButton>
  );
};

const ScrollButton = styled.div`
  position: fixed;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  background-color: #4a2e67;
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  @media (max-width: 499px) {
    /* Styles for mobile view */
    bottom: 50px;
    right: 20px;
  }

  @media (min-width: 500px) {
    /* Styles for desktop view */
    bottom: 90px;
    right: 40px;
  }
`;

export default ScrollToTop;
