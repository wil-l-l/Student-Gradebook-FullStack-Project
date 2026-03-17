const SignUpPage = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action=""
    >
      <input type="text" placeholder="First Name" />
      <br />
      <input type="text" placeholder="Last Name" />
      <br />
      <input type="text" placeholder="Middle Name" />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default SignUpPage;
