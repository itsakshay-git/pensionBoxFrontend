import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
// import { getProducts } from "../../redux/features/product/productSlice";
import Ordertable from "../../components/orderTable/orderTable";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // if (isLoggedIn === true) {
    //   dispatch(getProducts());
    // }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <Ordertable  />
    </div>
  );
};

export default Dashboard;