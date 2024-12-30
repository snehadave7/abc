// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrdersForUser } from "../../service/orderSlice";
// import ShoppingOrderDetailsView from "./order-details";

// const OrderHistory = () => {
//   const dispatch = useDispatch();
//   const { orderList, isLoading } = useSelector((state) => state.order);
//   const userId = parseInt(localStorage.userId);

//   useEffect(() => {
//     dispatch(fetchAllOrdersForUser({ userId }));
//   }, [dispatch]);

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="card mt-4">
//       <div className="card-header bg-dark text-white">Order History</div>
//       <div className="card-body">
//         <table className="table table-hover table-striped">
//           <thead>
//             <tr>
//               <th scope="col">Product</th>
//               <th scope="col">Date</th>
//               <th scope="col">Status</th>
//               <th scope="col">Price</th>
//               <th scope="col">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderList && orderList.length > 0 ? (
//               orderList.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.product.name}</td>
//                   <td>{new Date(order.orderDate).toLocaleDateString()}</td>
//                   <td>
//                     <span
//                       className={`badge ${getStatusClass(order.orderStatus)}`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td>₹{order.quantity * order.product.price}</td>
//                   <td>
//                     <ShoppingOrderDetailsView order={order} />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No orders found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const getStatusClass = (status) => {
//   switch (status) {
//     case "delivered":
//       return "bg-success text-white";
//     case "rejected":
//       return "bg-danger text-white";
//     case "InProcess":
//       return "bg-warning text-dark";
//     case "InShipping":
//       return "bg-info text-white";
//     default:
//       return "bg-secondary text-white";
//   }
// };

// export default OrderHistory;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersForUser } from "../../service/orderSlice";
import ShoppingOrderDetailsView from "./order-details";
import { Pagination } from "react-bootstrap"; // Ensure you have react-bootstrap installed for pagination UI

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.order);
  const userId = parseInt(localStorage.userId);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of orders per page

  useEffect(() => {
    dispatch(fetchAllOrdersForUser({ userId }));
  }, [dispatch, userId]);

  if (isLoading) return <div>Loading...</div>;

  // Paginate orders: Slice the array based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages based on the length of orderList and itemsPerPage
  const totalPages = Math.ceil(orderList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="card mt-4">
      <div className="card-header bg-dark text-white">Order History</div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders && currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.product.name}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>₹{order.quantity * order.product.price}</td>
                  <td>
                    <ShoppingOrderDetailsView order={order} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>

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
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "delivered":
      return "bg-success text-white";
    case "rejected":
      return "bg-danger text-white";
    case "InProcess":
      return "bg-warning text-dark";
    case "InShipping":
      return "bg-info text-white";
    default:
      return "bg-secondary text-white";
  }
};

export default OrderHistory;
