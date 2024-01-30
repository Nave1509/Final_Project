import { Link } from "react-router-dom";

export function AboutMenu() {
  return (
    <div id="aboutMenu">
      <Link
        id="backToStore"
        className="btn btn-outline-success align-items-center d-flex"
        to="/"
      >
        <i className="bi bi-arrow-left"></i>
        <span>Store</span>
      </Link>
    </div>
  );
}
