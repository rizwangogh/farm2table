import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Product from "./components/Product2";
import { UserOrders } from "./components/UserOrders";
import { OrderInfo } from "./components/OrderInfo";
import AddProduct from "./components/AddProduct2";
import { SellerOrders } from "./components/SellerOrders";
import { OrderInfoSeller } from "./components/OrderInfoSeller";
import Home from "./components/home/screen/Home";
import Productadd from "./components/home/screen/Productadd";
import { SellerProducts } from "./components/SellerProducts";
import { Signout } from "./components/Signout";
import Vendor from "./components/Vendor";
import { Profile } from "./components/Profile";
import axios from "axios";

function App() {
  let navigate = useNavigate();

  const verifyToken = async (role) => {
    try {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      if (token.role !== role) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      let { data } = await axios.get("/api/user/auth", {
        headers: {
          "auth-token": token.token,
        },
      });
      console.log(data);
      if (data.role !== role) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("token");
      navigate("/login")
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/addproduct" element={<Productadd />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/user/orders" element={<UserOrders />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/products" element={<SellerProducts />} />
      <Route path="/user/order/:orderId" element={<OrderInfo />} />
      <Route path="/product/add" element={<AddProduct verifyToken={verifyToken}/>} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/seller/order/:orderId" element={<OrderInfoSeller />} />
    </Routes>
  );
}

export default App;
