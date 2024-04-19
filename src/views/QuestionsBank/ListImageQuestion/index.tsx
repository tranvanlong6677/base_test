/* eslint-disable @typescript-eslint/no-explicit-any */
import { Empty, Pagination, Skeleton } from "antd";
import ImageQuestion from "../ImageQuestion";
import { useEffect, useState } from "react";

const ListImageQuestion = (props: any) => {
  const {
    listQuestion,
    dispatch,
    isApproved,
    loading,
    isOpenDrawer,
    setIsOpenDrawer,
  } = props;
  const [isShowSkeleton, setIsShowSkeleton] = useState(loading);
  const [listQuestionDisplay, setListQuestionDisplay] = useState([]);
  useEffect(() => {
    setListQuestionDisplay(listQuestion.slice(0, 10));
  }, [listQuestion]);
  useEffect(() => {
    setIsShowSkeleton(loading);
  }, [loading]);
  return (
    <div className="list-image-question-wrapper">
      {listQuestion?.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          {!isShowSkeleton &&
            listQuestionDisplay?.map((item: any, index: number) => {
              return (
                <ImageQuestion
                  key={`item${index}`}
                  data={item}
                  dispatch={dispatch}
                  isApproved={isApproved}
                  isOpenDrawer={isOpenDrawer}
                  setIsOpenDrawer={setIsOpenDrawer}
                />
              );
            })}
          <Skeleton loading={isShowSkeleton} />
          {!isShowSkeleton && (
            <Pagination
              defaultCurrent={1}
              total={listQuestion?.length}
              hideOnSinglePage
              pageSize={10}
              defaultPageSize={10}
              responsive
              onChange={(page, pageSize) => {
                console.log(page, pageSize);
                setListQuestionDisplay(
                  listQuestion.slice((page - 1) * pageSize, page * pageSize)
                );
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth", // Cuộn mượt mà
                });
              }}
              pageSizeOptions={[]}
              showSizeChanger={false}
              style={{ margin: "20px 0" }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListImageQuestion;
