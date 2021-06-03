const Result = (props) => {
  return (
    <div className="container result">
      <h3 className={props.resultClassName}>{props.result}</h3>
    </div>
  );
}

export default Result;