import { Fragment } from "react";
import useFetchPagination from "../../hooks/use-fetch-pagination";
import Loading from "../Loading/Loading";
import BrandItem from "./BrandItem";
import BrandsPagination from "./BrandsPagination";

const BRANDS_URL = "/brands";

const Brands = () => {
  const [brands, loading, pageCount, setPage] = useFetchPagination(BRANDS_URL);

  return (
    <div className="row align-items-center g-5">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
            <div className="textBrands">
              <h3 className="text-success fw-bolder text-center text-6xl">Our Brands</h3>
              <p className="text-muted lead text-center text-4xl">
                You Can See Our <span className=" text-emerald-700">Brands </span> 
                
              </p>
            </div>
         
          {brands.map((brand) => {
            return <BrandItem key={brand._id} {...brand} />;
          })}
        </Fragment>
      )}
      <div>
        {brands.length >= 1 && (
          <BrandsPagination pageCount={pageCount} setPage={setPage} />
        )}{" "}
      </div>
    </div>
  );
};

export default Brands;
