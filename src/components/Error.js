import Button from "./Button";

const Error = () => {
  return (
    <div className="container">
      <h1 className="wrong">Oops</h1>
      <p>The server might be down. Try again later.</p>
      <Button content="Quit" />
    </div>
  );
};

export default Error;
