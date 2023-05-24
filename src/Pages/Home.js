import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postsArray, postsLoading } from "../Reducers/postsSlice";
import { SingleCard } from "../Components/SingleCard";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(postsLoading);
  const allPosts = useSelector(postsArray);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log("isLoading:", isLoading);
  console.log("allPosts:", allPosts);

  return (
    <>
      <Container>
        <Row className="">
          <Col className="d-flex flex-wrap gap-3 mt-3 mb-5" lg={12}>
            {allPosts &&
              allPosts.map((item) => (
                <SingleCard
                  key={item._id}
                  title={item.title}
                  img={item.img}
                  content={item.content}
                  author={item.author}
                  rate={item.rate}
                />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
