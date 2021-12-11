import { useState, useEffect } from "react";
import { fetchPosts } from "components/api/helper";
import PostDetail from "components/PostDetail/PostDetail";
import { useQuery } from "react-query";
import { Spinner, Alert } from "reactstrap";

const ErrorState = ({ error }) => (
  <Alert variant={"info"}>{error.toString()}</Alert>
);

const maxPostPage = 10;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [Data, setData] = useState([]);
  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });

  useEffect(() => {
    if (data?.data) setData(data.data);
    if (isError)
      setData([
        {
          title: "Error Orccured",
        },
      ]);
  }, [data, isError]);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {isError && <ErrorState error={error} />}
      <ul>
        {Data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
