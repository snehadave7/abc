import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Categories.css";
import { fetchAllProductCategory } from "../../service/adminCategorySlice";
const Categories = () => {
  const { categoryList, isLoading } = useSelector(
    (state) => state.adminCategory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductCategory());
  }, [dispatch]);
  return (
    <div className="container mt-4">
      <h3>Shop by Category</h3>
      <div className="row">
        {categoryList.map((category, index) => (
          <div className="col-md-4" key={index}>
            <Link
              to={`/${category.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card  h-100">
                <div className="">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
