import PageHeader from "../common/pageHeader";

const About = () => {
  return (
    <>
      <div className="PageMainAbout d-flex flex-column align-items-center py-4 my-3">
        <h1 className="mt-3 aboutPageH1">
          About M&N Market<i className="bi bi-c-circle fs-6 align-top"></i>
        </h1>
        <h3 className="aboutPageH3">All food products in one place !!</h3>
        <p className="aboutPageText">
          As the oldest supermarket chain in Israel - whose first branch was
          launched already in 1958. We are proud to present the online store M&N
          Market, which continues to provide a shopping experience also online
          and to lead the market for food products, and premium products in
          particular.
        </p>
      </div>
    </>
  );
};
export default About;
