const PageHeader = ({ title, description }) => {
  return (
    <div className="pageHeaderDiv fs-5 textInfo text-center mt-4">
      <h5 className="mb-3">{title}</h5>
      <p>{description}</p>
    </div>
  );
};
export default PageHeader;
