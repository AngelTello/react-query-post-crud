import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Modal, Form, Input, Switch, Result, Spin, Button } from "antd";
import type { FormInstance } from "antd/es/form";
import { useFetchPost } from "../../hooks/useFetchPost";
import { useUpdatePost } from "../../hooks/useUpdatePost";

const EditPost = (props: any) => {
  const {
    config,
    onSaveSuccess = () => null,
    onSaveError = () => null,
    onCancel = () => null,
  } = props;

  const queryClient = useQueryClient();
  const { isLoading, isError, data, refetch } = useFetchPost(config.id);
  const { mutate } = useUpdatePost();

  // const { isLoading, isError, data, refetch } = useQuery({
  //   queryKey: ["posts", config.id],
  //   queryFn: () => getPostsById(config.id),
  // });

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const { TextArea } = Input;
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(false);

  /*
  const editPostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      form.resetFields();

      queryClient.invalidateQueries(["posts"]);
      onSaveSuccess(data);
    },
    onError: (data) => {
      onSaveError(data);
    },
    onSettled: () => {
      console.log(
        "We are done here! ...I don't care if the record got added or not u can just see this message as the last step in the add the record function"
      );
    },
  });
  */

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSave = (formValues: any) => {
    const editPost = formValues;

    console.log("...handleSave", editPost);

    mutate(editPost, {
      onSuccess: (data) => {
        form.resetFields();

        queryClient.invalidateQueries(["posts"]);

        onSaveSuccess(data);
      },
      onError: (data) => {
        onSaveError(data);
      },
      onSettled: () => {
        console.log(
          "We are done here! ...I don't care if the record got added or not u can just see this message as the last step in the add the record function"
        );
      },
    });
  };

  const handleFieldsChange = () => {
    setButtonSubmitDisabled(
      form.getFieldsError().some((field) => field.errors.length > 0)
    );
  };

  const handleManualPostRefetch = () => {
    // manually refetch
    refetch();
  };

  return (
    <Modal
      open={config.isOpen}
      title="Edit Post"
      centered
      onOk={form.submit}
      okText="Save changes"
      onCancel={handleCancel}
      okButtonProps={{ disabled: buttonSubmitDisabled }}
    >
      {isLoading && <Spin />}
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
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 700 }}
          ref={formRef}
          name="form-post-ref"
          onFinish={handleSave}
          initialValues={data}
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item name="id" label="Id" style={{ display: "none" }}>
            <Input type="text" />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Body" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="sourceUrl" label="URL Source (Website)">
            <Input />
          </Form.Item>
          <Form.Item
            name="isPublished"
            label="Is Published?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="authorId" label="Author" style={{ display: "none" }}>
            <Input type="text" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditPost;
