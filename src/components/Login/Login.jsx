import { useFormik } from "formik";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import useAuth from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import { toast } from "react-hot-toast";
import useWishlist from "../../hooks/use-wishlist";
import useCart from "../../hooks/use-cart";

const Login = () => {
  const { saveUserData } = useAuth();
  const { getLoggedUserWishlist } = useWishlist();
  const { getLoggedUserCart } = useCart();

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be less than 15 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: function (values) {
      sendLoginData(values);
    },
  });

  async function sendLoginData(obj) {
    setLoader(true);
    try {
      const { data } = await axios.post("/auth/signin", obj);
      setLoader(false);
      if (data.message === "success") {
        toast.success("Welcome to Fresh Cart", {
          duration: 3000,
          className: "text-success px-5 fw-bold my-3",
          iconTheme: {
            primary: "#198754",
            secondary: "#fff",
          },
        });
        localStorage.setItem("userToken", data.token);
        saveUserData();
        getLoggedUserWishlist();
        getLoggedUserCart();
        navigate("/");
      }
    } catch (error) {
      setLoader(false);
      if (error.response.data?.errors) {
        toast.error(error.response.data.errors.msg, {
          duration: 3000,
          className: "text-danger px-5 fw-bold my-3",
        });
      } else {
        toast.error(error.response.data.message, {
          duration: 3000,
          className: "text-danger px-5 fw-bold my-3",
        });
      }
    }
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid fa-eye text-gray-500 ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            {loader ? (
              <button
                type="button"
                className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="ml-2">Loading...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Login
              </button>
            )}
            <Link to="/forgotPassword" className="text-sm text-gray-600 hover:text-gray-800">
              Forgot Your Password?
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
