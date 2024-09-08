import ScrollToTop from "react-scroll-to-top";
import { paymentFooterData, storesFooterData } from "./footerData";

const Footer = () => {
  return (
    <footer className="text-center footer bg-emerald-600">
      {/* Scroll to Top Button */}
      <ScrollToTop smooth top={500} color="#0aad0a" />

      {/* App Promotion Section */}
      <div className="container p-4 my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 mb-4">
            <h3 className="fw-bold">Download FreshCart App</h3>
            <p className="text-muted">
              We will send you a link. Open it on your phone to download the app.
            </p>
          </div>
          <div className="col-md-8 mb-2">
            <input
              className="form-control"
              placeholder="Enter your email..."
              type="email"
            />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-success btn-lg">
              Download For Windows
            </button>
          </div>
        </div>
      </div>

      {/* Payment Partners and Store Partners Section */}
      <div className="container">
        <hr />

        <div className="row mb-4">
          <div className="col-md-6 d-flex align-items-center justify-content-center flex-column flex-md-row">
            <h6 className="pe-md-4 mb-3 mb-md-0">Payment Partners</h6>
            {paymentFooterData.map(({ id, image, alt }) => (
              <img
                src={image}
                className="pt-4 pt-md-0 me-md-3"
                alt={alt}
                style={{ width: "4rem" }}
                key={id}
              />
            ))}
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center flex-column flex-md-row">
            <h6 className="text-muted mb-3 mb-md-0 pe-md-3">All Platforms</h6>
            {storesFooterData.map(({ id, image, alt }) => (
              <img
                src={image}
                className="w-25 me-2"
                alt={alt}
                key={id}
              />
            ))}
          </div>
        </div>

        <hr />
      </div>

      {/* Copyright Section */}
      <div className="copy-right">
        <p className="m-0 text-center py-4 text-muted">
          By <span className="text-red-800">John Alfred</span> All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
