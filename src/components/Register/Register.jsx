import { useFormik } from "formik";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import axios from "../../apis/axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validate = Yup.object({
    name: Yup.string()
      .required("This field is required!")
      .max(14, "Name must be 14 characters or less")
      .min(3, "Name must be 3 characters or more"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone number must be valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be less than 15 characters"),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      sendRegisterData(values);
    },
  });

  async function sendRegisterData(obj) {
    setLoader(true);
    try {
      const { data } = await axios.post("/auth/signup", obj);
      setLoader(false);
      if (data.message === "success") {
        toast.success("Congratulations! You are now registered.", {
          duration: 3000,
          className: "text-success px-4 py-2 rounded-md",
        });
        navigate("/login");
      }
    } catch (error) {
      setLoader(false);
      if (error.response.data?.errors) {
        toast.error(error.response.data.errors.msg, {
          duration: 3000,
          className: "text-red-500 px-4 py-2 rounded-md",
        });
      } else {
        toast.error(error.response.data.message, {
          duration: 3000,
          className: "text-red-500 px-4 py-2 rounded-md",
        });
      }
    }
  }

  return (
    <Fragment>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-600 text-center">Register</h2>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                formik.touched.name && formik.errors.name ? "border-red-500" : ""
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
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
            <label className="block text-sm font-semibold text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                formik.touched.phone && formik.errors.phone ? "border-red-500" : ""
              }`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : ""
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
                  className={`fa-solid fa-eye text-gray-500 ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="rePassword">
              Repassword
            </label>
            <div className="relative">
              <input
                id="rePassword"
                type={showRePassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  formik.touched.rePassword && formik.errors.rePassword ? "border-red-500" : ""
                }`}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rePassword"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                <i
                  className={`fa-solid fa-eye text-gray-500 ${showRePassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>
            )}
          </div>

          {loader ? (
            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
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
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Register
            </button>
          )}
        </form>

        <h5 className="text-center text-sm text-gray-600 py-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Sign in
          </Link>
        </h5>
      </div>
    </Fragment>
  );
};

export default Register;
