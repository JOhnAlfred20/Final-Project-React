import { Link } from "react-router-dom";

const BrandItem = ({ _id, image, name }) => {
  return (
    <div className="col-md-4 col-lg-3 ">
      <Link to={`/brandProducts/${_id}`}>
        <div className="item cart-customize rounded-2xl shadow">
          <img
            src={image}
            className="w-100 rounded-5"
            alt={name}
            style={{ height: "250px" }}
          />
          <h4 className="text-success text-center  py-4">{name}</h4>
        </div>
      </Link>
    </div>
  );
};

export default BrandItem;
