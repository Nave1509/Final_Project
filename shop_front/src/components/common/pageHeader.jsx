const PageHeader = ({ title, description }) => {
  return (
    <div className="col-12 col-sm-6 mt-4 mx-auto text-center">
      <h1 className="my-2">{title}</h1>

      {description && <p> {description}</p>}
    </div>
  );
};
export default PageHeader;
