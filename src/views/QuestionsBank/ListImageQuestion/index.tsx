/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "antd";
import ImageQuestion from "../ImageQuestion";

const ListImageQuestion = (props: any) => {
  const { listQuestion, dispatch, setIsModalOpen } = props;

  return (
    <div className="list-image-question-wrapper">
      {listQuestion?.map((item: any, index: number) => {
        return (
          <ImageQuestion
            key={`item${index}`}
            data={item}
            setIsModalOpen={setIsModalOpen}
            dispatch={dispatch}
          />
        );
      })}
      <Skeleton loading={true} />
    </div>
  );
};

export default ListImageQuestion;
