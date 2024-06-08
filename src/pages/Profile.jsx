import { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ProductElement } from "../components";

import {
  getCurrentUser,
  editUser,
  getProductsBySeller,
  getOwnedCompany,
} from "../api";

const Profile = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [userFormData, setUserFormData] = useState(0);
  const [companyFormData, setCompanyFormData] = useState(0);
  const [products, setProducts] = useState(0);
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await getCurrentUser();
      const data = response?.data?.[0];
      console.log("here here", data);
      setUserFormData({
        name: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        phone: data?.mobile,
        adress: data?.profile?.adress,
        national_id: data?.profile?.national_id,
      });

      console.log("here here getUserData", userFormData);
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getOwnedCompany()
      .then((res) => {
        setCompanyFormData(res.data);
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
      });
  }, []);

  useEffect(() => {
    getProductsBySeller(companyFormData?.name)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
      });
  }, [companyFormData?.name]);

  // useEffect(() => {
  //   if (loginState) {
  //     getCurrentUser()
  //       .then((res) => {
  //         const data = res?.data?.[0];
  //         console.log("here here then", data);
  //         setUserFormData({
  //           name: data?.firstname,
  //           lastname: data?.lastname,
  //           email: data?.email,
  //           phone: data?.mobile,
  //           adress: data?.profile?.adress,
  //           national_id: data?.profile?.national_id,
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error("Error: ", error.response);
  //       });
  //   } else {
  //     toast.error("You must be logged in to access this page");
  //     navigate("/");
  //   }
  // }, [loginState, navigate, setUserFormData, getCurrentUser.data]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const getResponse = await getCurrentUser();
      const userObj = getResponse?.data?.[0];
      const userId = userObj?.id;

      await editUser(userId, {
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        phone: userFormData.phone,
        profile: {
          adress: userFormData.adress,
          national_id: userFormData.national_id,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <SectionTitle title="Profile" path="User Profile" />
      <form
        className="max-w-7xl mx-auto text-center px-10"
        onSubmit={updateProfile}
      >
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your first name</span>
            </label>
            {console.log("here here inside comp", userFormData.firstname)}
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.firstname}
              onChange={(e) => {
                setUserFormData({ ...userFormData, name: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => {
                setUserFormData({ ...userFormData, lastname: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {
                setUserFormData({ ...userFormData, email: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {
                setUserFormData({ ...userFormData, phone: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Adress</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => {
                setUserFormData({ ...userFormData, adress: e.target.value });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => {
                setUserFormData({ ...userFormData, password: e.target.value });
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>

      <SectionTitle path="Company Info" />

      <form
        className="max-w-7xl mx-auto text-center px-10"
        onSubmit={updateProfile}
      >
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Company name</span>
            </label>
            {console.log(
              "here here company inside comp",
              companyFormData.firstname
            )}
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={companyFormData.firstname}
              onChange={(e) => {
                setCompanyFormData({
                  ...companyFormData,
                  name: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Company Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={companyFormData.email}
              onChange={(e) => {
                setCompanyFormData({
                  ...companyFormData,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Company Mobile</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={companyFormData.mobile}
              onChange={(e) => {
                setCompanyFormData({
                  ...companyFormData,
                  mobile: e.target.value,
                });
              }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Company Adress</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={companyFormData.adress}
              onChange={(e) => {
                setCompanyFormData({
                  ...companyFormData,
                  adress: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Company tax number</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={companyFormData.tax_number}
              onChange={(e) => {
                setCompanyFormData({
                  ...companyFormData,
                  tax_number: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Company
        </button>
      </form>

      <SectionTitle path="Company Products" />
      <div className="selected-products-grid max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductElement
            key={product.id}
            id={product.id}
            title={product.name}
            image={product.product_images?.[0]}
            price={product.product_prices?.[0]}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
