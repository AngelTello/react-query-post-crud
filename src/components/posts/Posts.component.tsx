import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Spin,
  Result,
  Button,
  notification,
  Space,
  message,
  Popconfirm,
} from "antd";
import _ from "lodash";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import {
  PlusOutlined,
  SmileOutlined,
  FrownOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddPost from "./AddPost.component";
import EditPost from "./EditPost.component";
import { usePost } from "../../hooks/usePost";

const Posts = () => {
  const { getPosts, deletePost } = usePost();

  const [deletePostId, setDeletePostId] = useState<null | number>(null);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [editPostModalConfig, setEditPostModalConfig] = useState({
    isOpen: false,
    id: -1,
  });

  const queryClient = useQueryClient();

  const { isLoading, isFetching, isError, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 5000,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      message.success("The post has been deleted.");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Link to={`${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      width: 400,
      render: (text: string) => (
        <div
          style={{
            width: 650,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "URL Address",
      dataIndex: "sourceUrl",
      key: "sourceUrl",
      render: (url: string) =>
        _.trim(url) !== "" ? (
          <a href={url} target="_blank" rel="noreferrer">
            Go to website
          </a>
        ) : (
          "empty"
        ),
    },
    {
      title: "Is Published",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (value: boolean) => <div>{value ? "Yes" : "No"}</div>,
    },
    {
      title: "Author",
      dataIndex: "authorId",
      key: "authorId",
      render: (authorId: number, record: any) => (
        <div>{record.author.name}</div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            size="middle"
            onClick={() => handleEditPostModalOpen(record.id)}
          />
          <Popconfirm
            placement="left"
            title="Are you sure to delete this post?"
            description={"This action will delete this post"}
            onConfirm={handleDeletePostConfirm}
            onCancel={handleDeletePostCancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="middle"
              danger
              onClick={() => handleDeletePost(record.id)}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddPostModalOpen = () => {
    console.log("AddPostModalOpen - Open");

    setIsAddPostModalOpen(true);
  };

  const handleAddPostModalCancel = () => {
    console.log("handleAddPostModalCancel - Cancel");

    setIsAddPostModalOpen(false);
  };

  const handleAddPostModalSuccess = ({ data }: any) => {
    console.log("handleAddPostModalSuccess - Success", data);

    openNewPostAddedNotification();
    setIsAddPostModalOpen(false);
  };

  const openNewPostAddedNotification = () => {
    api.open({
      message: "New Post added",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const handleAddPostModalError = ({ data }: any) => {
    console.log("handleAddPostModalSuccess - Error", data);

    openNewPostErrorNotification();
  };

  const openNewPostErrorNotification = () => {
    api.open({
      message: "New Post add attempt failed",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const handleEditPostModalOpen = (postId: number) => {
    console.log("EditPostModalOpen - Open");

    setEditPostModalConfig({
      isOpen: true,
      id: postId,
    });
  };

  const handleEditPostModalCancel = () => {
    console.log("handleEditPostModalCancel - Cancel");

    setEditPostModalConfig({
      isOpen: false,
      id: -1,
    });
  };

  const handleEditPostModalSuccess = ({ data }: any) => {
    console.log("handleEditPostModalSuccess - Success", data);

    openPostEditNotification();
    setEditPostModalConfig({
      isOpen: false,
      id: -1,
    });
  };

  const openPostEditNotification = () => {
    api.open({
      message: "Changes Saved",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const handleEditPostModalError = ({ data }: any) => {
    console.log("handleEditPostModalSuccess - Success", data);

    openNewPostEditErrorNotification();
  };

  const openNewPostEditErrorNotification = () => {
    api.open({
      message: "Edit Post attempt failed",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const handleDeletePost = (postId: number) => {
    setDeletePostId(postId);
  };

  const handleDeletePostConfirm = () => {
    deletePostMutation.mutate(deletePostId!);
  };

  const handleDeletePostCancel = () => {
    setDeletePostId(null);
  };

  const handleManualPostRefetch = () => {
    // manually refetch
    refetch();
  };

  return (
    <div className="posts-container">
      {contextHolder}
      <h2>Posts</h2>
      {isLoading || (isFetching && <Spin />)}
      {isError && (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Button
              type="primary"
              key="retry"
              onClick={handleManualPostRefetch}
            >
              Try Again
            </Button>
          }
        />
      )}
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          title={() => (
            <Button icon={<PlusOutlined />} onClick={handleAddPostModalOpen}>
              Add Post
            </Button>
          )}
        />
      )}
      <AddPost
        isOpen={isAddPostModalOpen}
        onSaveSuccess={handleAddPostModalSuccess}
        onSaveError={handleAddPostModalError}
        onCancel={handleAddPostModalCancel}
      />
      {editPostModalConfig.id > 0 && (
        <EditPost
          config={editPostModalConfig}
          onSaveSuccess={handleEditPostModalSuccess}
          onError={handleEditPostModalError}
          onCancel={handleEditPostModalCancel}
        />
      )}
    </div>
  );
};

export default Posts;
