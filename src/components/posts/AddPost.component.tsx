import { useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Modal, Form, Input, Switch } from "antd";
import type { FormInstance } from "antd/es/form";
import { usePost } from "../../hooks/usePost";

const AddPost = (props: any) => {
  const {
    isOpen = false,
    onSaveSuccess = () => null,
    onSaveError = () => null,
    onCancel = () => null,
  } = props;

  const { createPost } = usePost();

  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const { TextArea } = Input;
  const [buttonSubmitDisabled, setButtonSubmitDisabled] = useState(true);

  const createPostMutation = useMutation({
    mutationFn: createPost,
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

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSave = (formValues: any) => {
    const newPost = formValues;

    createPostMutation.mutate({
      ...newPost,
      authorId: 1,
    });
  };

  const handleFieldsChange = () => {
    setButtonSubmitDisabled(
      form.getFieldsError().some((field) => field.errors.length > 0)
    );
  };

  return (
    <Modal
      open={isOpen}
      title="Add Post"
      centered
      onOk={form.submit}
      okText="Save new item"
      onCancel={handleCancel}
      okButtonProps={{ disabled: buttonSubmitDisabled }}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 700 }}
        ref={formRef}
        name="form-post-ref"
        onFinish={handleSave}
        initialValues={{ isPublished: false }}
        onFieldsChange={handleFieldsChange}
      >
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
    </Modal>
  );
};

export default AddPost;
