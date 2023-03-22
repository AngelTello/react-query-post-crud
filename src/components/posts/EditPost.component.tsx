import { useRef, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { Modal, Form, Input, Switch, Result, Spin, Button } from "antd";
import type { FormInstance } from "antd/es/form";

import { getPostsById, editPost } from "../../api/postsApi";

const EditPost = (props: any) => {
  const { config, onSaveSuccess = () => null, onCancel = () => null } = props;

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts", config.id],
    queryFn: () => getPostsById(config.id),
    enabled: config.id > 0,
  });

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const { TextArea } = Input;
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(false);

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      onSaveSuccess(data);
    },
  });

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSave = (formValues: any) => {
    const editPost = formValues;

    console.log("...handleSave", editPost);

    editPostMutation.mutate(editPost);

    form.resetFields();
  };

  const handleFieldsChange = () => {
    setButtonSubmitDisabled(
      form.getFieldsError().some((field) => field.errors.length > 0)
    );
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
            <Button type="primary" key="retry">
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
          <Form.Item
            name="sourceUrl"
            label="URL Source (Website)"
          >
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