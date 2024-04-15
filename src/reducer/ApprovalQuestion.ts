/* eslint-disable @typescript-eslint/no-explicit-any */
export const approvalQuestionReducer = (state: any, action: any) => {
  const { data } = action;
  return { ...state, dataModalReviewQuestion: data };
};
