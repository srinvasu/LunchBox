import "bootstrap-icons/font/bootstrap-icons.css";
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  loading
}) => {
  return (
    <div className="row">
      <div className="col text-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group p-2">
            {/*<small>
              <label className="text-muted">Your Name</label>
            </small> */}

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control "
              placeholder="your name"
            />
          </div>
          <div className="form-group p-2">
            {/* <small>
              <label className="text-muted">Phone</label>
            </small>*/}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="form-control"
              placeholder="phone"
              pattern="[0-9]{10}" // Pattern for Indian phone number
            />
          </div>
          {/* {<small className="form-text text-muted">
            Format: 1234567890 (10 digits)
          </small>} */}

          <div className="form-group p-2">
            {/*<small>
              <label className="text-muted">Address</label>
            </small> */}

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control "
              placeholder="Address Description"
              rows="4"
            />
          </div>

          <div className="form-group p-2">
          <button
        disabled={!name || !phone || !address }
        className="btn btn-dark col-12"
      >
        {loading ? <i className="bi bi-arrow-clockwise py-1" /> : "submit"}
      </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
