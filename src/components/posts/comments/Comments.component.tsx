import { Table } from "antd";
import { columns } from "./Comments.columns.consts";

const Comments = ({ data }: any) => {
  return (
    <>
        <br />
        Comments:
        <Table dataSource={data} columns={columns} rowKey="id" />
    </>
  );
};

export default Comments;
