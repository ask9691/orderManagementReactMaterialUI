import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "./../Components/Orders/OrderComponent";
const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
