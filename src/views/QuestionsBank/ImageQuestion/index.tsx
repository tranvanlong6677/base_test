/* eslint-disable @typescript-eslint/no-explicit-any */
const ImageQuestion = (props: any) => {
  const { data, setIsModalOpen, dispatch, isApproved } = props;
  return (
    <>
      <div
        className="image-wrapper"
        onClick={() => {
          setIsModalOpen(true);
          dispatch({ data: data });
          console.log(data);
        }}
      >
        {data.image_url ? (
          <>
            <div
              className={
                data?.question_difficulty === "cb"
                  ? "label label-cb"
                  : data?.question_difficulty === "c"
                  ? "label label-c"
                  : "label label-nc"
              }
            >
              <span className="question_difficulty">
                {data?.question_difficulty === "cb"
                  ? "Cơ bản"
                  : data?.question_difficulty === "c"
                  ? "Chuyên"
                  : "Nâng cao"}
                {` - `}
              </span>

              <span className="question_level">
                {data?.question_level === "NB"
                  ? "Nhận biết"
                  : data?.question_level === "VDC"
                  ? "Vận dụng cao"
                  : "Vận dụng"}
              </span>
            </div>
            <img src={data?.image_url} alt="" className="img-question" />
            <div className="label-id">
              {data?.id} {" - "}
              {isApproved ? "Đã được duyệt" : "Chưa được duyệt"}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ImageQuestion;
