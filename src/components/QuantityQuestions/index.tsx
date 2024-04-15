import { Card } from "antd";
import { typeQuestions } from "../../utils/typeQuestions";

interface IProps {
  quantity: number;
  typeQuestion: string;
}
const QuantityQuestions = (props: IProps) => {
  const { quantity, typeQuestion } = props;
  return (
    <>
      <Card
        bordered={true}
        // class theo typeQuestion để css
        className={
          typeQuestion === typeQuestions.BASIC
            ? "card-quantity-question-basic"
            : typeQuestion === typeQuestions.ADVANCED
            ? "card-quantity-question-advanced"
            : "card-quantity-question-specialized"
        }
      >
        <h1 className="quantity-question header-1">{quantity}</h1>
        <span className="type-question">{typeQuestion}</span>
      </Card>
    </>
  );
};

export default QuantityQuestions;
