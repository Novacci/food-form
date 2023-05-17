import './Card.scss';

const Card = (props: any) => {
  return (
    <div className="container-position">
      <div className="form-container">{props.children}</div>
    </div>
  );
};

export default Card;
