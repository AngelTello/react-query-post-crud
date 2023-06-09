import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spin, Result, Button } from "antd";
import { Wrapper, MyYesButton, MyNoButton } from "./PostDetail.styles";
import { CheckSquareOutlined, BorderOutlined } from "@ant-design/icons";
import { getCommentsByPostId } from "../../api/postsApi";
import Comments from "./comments/Comments.component";
import { useFetchPost } from "../../hooks/useFetchPost";

const PostDetail = () => {
  const [canDataBeLoaded, setCanDataBeLoaded] = useState<boolean>(false);
  const { postId } = useParams();

  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ["post", postId],
  //   queryFn: () => getPostsById(+postId!),
  // });
  const { isLoading, isError, data } = useFetchPost(+postId!);

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
  } = useQuery({
    queryKey: ["post", postId, "comments"],
    queryFn: () => getCommentsByPostId(+postId!),
    enabled: canDataBeLoaded,
  });

  return (
    <div className="posts-container">
      <h2>PostDetail {postId}</h2>
      {canDataBeLoaded && (
        <MyYesButton
          type="primary"
          icon={<CheckSquareOutlined />}
          onClick={() => setCanDataBeLoaded(false)}
          disabled
        >
          Comments loaded
        </MyYesButton>
      )}
      {!canDataBeLoaded && (
        <MyNoButton
          type="primary"
          icon={<BorderOutlined />}
          onClick={() => setCanDataBeLoaded(true)}
        >
          Comments NOT loaded yet
        </MyNoButton>
      )}
      <br />
      <br />
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
        </Wrapper>
      )}

      {isLoadingComments && <Spin />}
      {isErrorComments && (
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
      {dataComments && <Comments data={dataComments} />}

      <p>
        <Link to="/posts">...Return to Posts</Link>
      </p>
    </div>
  );
};

export default PostDetail;
