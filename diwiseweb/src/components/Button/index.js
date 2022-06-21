import "./button.css";

function Button(props) {
  return (
    <>
      <button className="mainButton">{props.buttonText}</button>
    </>
  );
}
export default Button;
