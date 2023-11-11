import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Slider from "../Slider";
import LoadingIcon from "../LoadingIcon";
import ErrorPage from "./ErrorPage";
import Pagination from "../Pagination";
import ScrollToTop from "../ScrollToTop";

const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState("loading");

  //add to favorite and remove from favorite list
  //isToggled is an object including all post.id(s) which are either true (added to favorite list) or false (removed from favorite list).
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPosts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  // see Product grid, this is slicing array of products depending on value of x and y. which is manipulated below
  const [x, setX] = useState(0);
  const [y, setY] = useState(12);

  // change page function. i
  const changePages = (pageNum) => {
    if (pageNum === 1) {
      // if page is 1 , set initial slice values
      setX(0);
      setY(12);
    } else {
      const startX = 12 * (pageNum - 1);
      const endX = 12 * pageNum;

      // Ensure that the endX value does not exceed the length of the posts array
      const validEndX = Math.min(endX, posts.length);

      setX(startX);
      setY(validEndX);
    }
  };
  // everytime page changes, perform changePages function
  useEffect(() => {
    changePages(currentPage);
  }, [currentPage]);

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <All>
      <Title>
        {" "}
        All you need is <Purple>Love</Purple> and <Purple>Home Cooked</Purple>{" "}
        food!
      </Title>
      <CarouselWrapper>
        <Slider />
      </CarouselWrapper>
      <Wrapper>
        <ProductGrid>
          {!posts ? (
            <LoadingWrapper>
              <LoadingIcon />
            </LoadingWrapper>
          ) : (
            posts
              .reverse()
              .slice(x, y)
              .map((post) => {
                // console.log(post);
                return (
                  <ItemContainer
                    to={`/posts/${post.id}`}
                    key={post.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Text>
                      {" "}
                      {post.foodPicture ? (
                        <Image src={post.foodPicture} />
                      ) : (
                        <NoImage>No Image provided</NoImage>
                      )}{" "}
                    </Text>
                    <Text>
                      <Tag>{post.foodName}</Tag>{" "}
                    </Text>
                    <Text>
                      <Tag>Price:</Tag> {post.price}$
                    </Text>
                    {post.posted ? (
                      <Posted>Posted {moment(post.posted).fromNow()}</Posted>
                    ) : (
                      ""
                    )}
                  </ItemContainer>
                );
              })
          )}
        </ProductGrid>
      </Wrapper>
      {posts && (
        <Container>
          <Pagination
            currentPage={currentPage}
            posts={posts}
            setCurrentPage={setCurrentPage}
            limit={12}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Container>
      )}
      <ScrollToTop />
    </All>
  );
};

const All = styled.div`
  background: linear-gradient(-45deg, #f5d5cc, #f9d2e1, #d3eff8, #d3f8ef);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Wrapper = styled.div`
  margin: 50px 50px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 250px 250px 250px;
  @media (max-width: 500px) {
    grid-template-columns: 250px;
  }
  @media (min-width: 500.02px) and (max-width: 800px) {
    grid-template-columns: 250px 250px;
  }
  @media (min-width: 800.02px) and (max-width: 1100px) {
    grid-template-columns: 250px 250px 250px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  margin: 0 auto;
  max-width: 950px;
`;

const Text = styled.p`
  width: 190px;
  color: black;
  font-size: 18px;
  display: flex;
  justify-content: center;
`;
const Tag = styled.span`
  font-weight: bold;
  margin-right: 5px;
  text-align: center;
`;

const Posted = styled.span`
  text-align: center;
  margin-bottom: 7px;
`;

const Title = styled.h2`
  padding: 25px;
  font-size: 25px;
  text-align: center;
`;

const Purple = styled.span`
  color: purple;
  font-weight: bold;
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 10px 15px;
  margin: 0 0px 30px 20px;
  width: 220px;
  height: 360px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.2s ease-in-out;
  color: var(--text-color);
  background-color: white;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
`;

const NoImage = styled.p`
  height: 200px;
  display: flex;
  align-items: center;
`;
const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  @media (max-width: 500px) {
    left: 50%;
  }
`;

export default HomePage;
