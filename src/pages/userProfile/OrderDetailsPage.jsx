import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Table } from "react-bootstrap";

const OrderDetailsPage = () => {
  const { id } = useParams(); // Retrieve order ID from URL
  const order = useSelector((state) =>
    state.order.orderList.find((o) => o.id === parseInt(id))
  );

  if (!order)
    return <div className="alert alert-danger mt-4">Order not found</div>;

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-dark text-white">
          <h4 className="mb-0">Order Details</h4>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <Table borderless>
                <tbody>
                  <tr>
                    <th>Order ID:</th>
                    <td>{order.id}</td>
                  </tr>
                  <tr>
                    <th>Order Date:</th>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Quantity:</th>
                    <td>{order.quantity}</td>
                  </tr>
                  <tr>
                    <th>Total Price:</th>
                    <td>₹{order.quantity * order.product.price}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-md-6">
              <h5 className="text-muted mb-3">Shipping Information</h5>
              <p className="mb-1">
                <strong>
                  {order.user.firstName} {order.user.lastName}
                </strong>
              </p>
              <p className="mb-1">{order.address.address}</p>
              <p className="mb-1">
                {order.address.city}, {order.address.pincode}
              </p>
              <p className="mb-1">{order.address.phone}</p>
              <p className="mb-1">{order.address.notes}</p>
            </div>
          </div>
          <hr />
          <h5>Order Items</h5>
          <Table className="table-sm table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.product.name}</td>
                <td>₹{order.product.price}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

const getStatusBadgeClass = (status) => {
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

export default OrderDetailsPage;
