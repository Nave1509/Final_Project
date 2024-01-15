const ChecKbox = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-check">
      <input
        {...rest}
        id={name}
        name={name}
        className={["form-check-input", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
        {rest.required && <span className="text-danger ms1">*</span>}
      </label>
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};
export default ChecKbox;
