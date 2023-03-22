import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spin, Result, Button } from "antd";
import { getPostsById } from "../../api/postsApi";
import { Wrapper } from "./PostDetail.styles";

const PostDetail = () => {
  const { postId } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostsById(+postId!),
  });

  return (
    <div className="posts-container">
      <h2>PostDetail {postId}</h2>
      {isLoading && <Spin />}
      {isError && (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Button type="primary" key="retry">
              Try Again
            </Button>
          }
        />
      )}
      {data && (
        <Wrapper>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
          <p>Posted by {data.author.name}</p>
          <p>
            <Link to="/posts">...Return to Posts</Link>
          </p>
        </Wrapper>
      )}
    </div>
  );
};

export default PostDetail;
