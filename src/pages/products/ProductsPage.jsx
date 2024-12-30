// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductsPage.css";
// import ProductFilter from "./filter";
// import { useSelector } from "react-redux";

// const categoryId = {
//   Clothing: 1,
//   Electronics: 2,
//   Groceries: 3,
//   Sports: 8,
// };

// const ProductsPage = ({
//   categoryId,
//   category,
//   products: propProducts = [],
// }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("");

//   const fetchProducts = async (subCategory = []) => {
//     let BASE_URL = "https://localhost:7152/api/Products";

//     try {
//       if (subCategory.length > 0) {
//         const subCategoryQuery = subCategory.join(",");
//         BASE_URL = `${BASE_URL}/by-subCat/${subCategoryQuery}`;
//       } else {
//         BASE_URL = `${BASE_URL}/by-cat/${category.toLowerCase()}`;
//         // if (category.toLowerCase() === "electronics") {
//         //   BASE_URL = `${BASE_URL}/by-cat/electronics`;
//         // } else if (category.toLowerCase() === "clothing") {
//         //   BASE_URL = `${BASE_URL}/by-cat/clothing`;
//         // } else if (category.toLowerCase() === "groceries") {
//         //   BASE_URL = `${BASE_URL}/by-cat/groceries`;
//         // } else if (category.toLowerCase() === "sports") {
//         //   BASE_URL = `${BASE_URL}/by-cat/sports`;
//         // }
//       }

//       const response = await fetch(BASE_URL);
//       const data = await response.json();
//       console.log("API response:", data);

//       const productArray = data.$values || [];
//       setProducts(productArray);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setSortOrder("");
//     fetchProducts([]);
//   }, [category]);

//   const navigate = useNavigate();

//   const handleProductClick = (product) => {
//     navigate(`/product/${product.id}`, { state: { product } });
//   };

//   const handleFilterChange = (selectedSubCategory) => {
//     setSortOrder("");
//     fetchProducts(selectedSubCategory);
//   };

//   const handleSortChange = (order) => {
//     setSortOrder(order);
//     const sortedProducts = [...products].sort((a, b) => {
//       if (order === "lowToHigh") {
//         return a.price - b.price;
//       } else if (order === "highToLow") {
//         return b.price - a.price;
//       }
//       return 0;
//     });
//     setProducts(sortedProducts);
//   };

//   return (
//     <div className="container mt-4 products-page">
//       <div className="d-flex justify-content-between align-items-center">
//         <h1 className="mb-4">{category} Products</h1>

//         <div className="sort-section">
//           <label htmlFor="sortOrder" className="me-2">
//             Sort By:
//           </label>
//           <select
//             id="sortOrder"
//             className="form-select form-select-sm d-inline-block w-auto"
//             value={sortOrder}
//             onChange={(e) => handleSortChange(e.target.value)}
//           >
//             <option value="">Default</option>
//             <option value="lowToHigh">Price: Low to High</option>
//             <option value="highToLow">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//       <div className="products-layout">
//         <div className="filter-section">
//           <ProductFilter
//             onFilterChange={handleFilterChange}
//             categoryId={categoryId}
//           />
//         </div>
//         <div className="products-section">
//           {loading ? (
//             <p>Loading products...</p>
//           ) : (
//             <div className="row">
//               {products.map((product) => (
//                 <div key={product.id} className="col-md-4 mb-4">
//                   <div
//                     className={`card ${
//                       product.stock === 0 ? "out-of-stock" : ""
//                     }`}
//                   >
//                     <img
//                       src={`https://localhost:7152/${product.imageUrl}`}
//                       className="card-img-top"
//                       alt={product.name}
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title">{product.name}</h5>
//                       {/* <p className="card-text">{product.description}</p> */}
//                       <p className="card-price">Price: ₹{product.price}</p>
//                       <button
//                         className="btn btn-dark"
//                         onClick={() => handleProductClick(product)}
//                         disabled={product.stock === 0}
//                       >
//                         {product.stock === 0 ? "No Stock" : "View Details"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import ProductFilter from "./filter";
import { Pagination } from "react-bootstrap";

const categoryId = {
  Clothing: 1,
  Electronics: 2,
  Groceries: 3,
  Sports: 8,
};

const ProductsPage = ({
  categoryId,
  category,
  products: propProducts = [],
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const fetchProducts = useCallback(
    async (subCategory = []) => {
      let BASE_URL = "https://localhost:7152/api/Products";

      try {
        if (subCategory.length > 0) {
          const subCategoryQuery = subCategory.join(",");
          BASE_URL = `${BASE_URL}/by-subCat/${subCategoryQuery}`;
        } else {
          BASE_URL = `${BASE_URL}/by-cat/${category.toLowerCase()}`;
        }

        const response = await fetch(BASE_URL);
        const data = await response.json();
        const productArray = data.$values || [];
        setProducts(productArray);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [category]
  ); // Only fetch products when `category` changes

  useEffect(() => {
    setSortOrder(""); // Reset sort order when category changes
    fetchProducts([]); // Fetch products for the new category
  }, [category, fetchProducts]);

  useEffect(() => {
    if (sortOrder) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "lowToHigh") {
          return a.price - b.price;
        } else if (sortOrder === "highToLow") {
          return b.price - a.price;
        }
        return 0;
      });
      setProducts(sortedProducts);
      setCurrentPage(1); // Reset to the first page when sorting changes
    }
  }, [sortOrder, products]);

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleFilterChange = (selectedSubCategory) => {
    setSortOrder("");
    fetchProducts(selectedSubCategory);
  };

  const handleSortChange = (order) => {
    setSortOrder(order); // Triggers sorting effect
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages based on the length of products and itemsPerPage
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4 products-page">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">{category} Products</h1>

        <div className="sort-section">
          <label htmlFor="sortOrder" className="me-2">
            Sort By:
          </label>
          <select
            id="sortOrder"
            className="form-select form-select-sm d-inline-block w-auto"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products-layout">
        <div className="filter-section">
          <ProductFilter
            onFilterChange={handleFilterChange}
            categoryId={categoryId}
          />
        </div>
        <div className="products-section">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="row">
              {currentProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div
                    className={`card ${
                      product.stock === 0 ? "out-of-stock" : ""
                    }`}
                  >
                    <img
                      src={`https://localhost:7152/${product.imageUrl}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-price">Price: ₹{product.price}</p>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleProductClick(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "No Stock" : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
