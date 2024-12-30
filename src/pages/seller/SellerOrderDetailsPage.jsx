import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersForSeller,
  UpdateOrderStatus,
} from "../../service/orderSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

function SellerOrderDetailsPage() {
  const dispatch = useDispatch();

  const { orderId, paymentId } = useParams(); // Retrieve order ID from URL
  // console.log(orderId, paymentId);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    console.log("useEffect", sellerId);
    dispatch(fetchAllOrdersForSeller({ sellerId }));
  }, [dispatch]);

  // console.log("order", orderList);
  let order = null;
  let payment = null;
  console.log(orderId, paymentId);
  orderList.forEach((element) => {
    console.log(element.order.id);
    if (element?.order?.id == orderId) {
      order = element.order;
      payment = element;
    }
  });
  console.log("order: ", order);
  console.log("payment", payment);
  const initialFormData = {
    status: order.orderStatus || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const sellerId = parseInt(localStorage.userId);
  async function handleUpdateStatus(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const updateOrderData = {
      ...order,
      orderStatus: formData.status,
    };
    console.log(updateOrderData);
    await dispatch(UpdateOrderStatus({ orderData: updateOrderData }));
    dispatch(fetchAllOrdersForSeller({ sellerId }));
    toast.success("Status updated");
    setIsSubmitting(false);
    // console.log("hellobro");
  }
  return (
    <>
      {/* <button
        onClick={() => setOpenDetailsDialog(true)}
        className="btn btn-dark"
      >
        View Details
      </button> */}

      {/* <div
        className={`modal fade ${openDetailsDialog ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: openDetailsDialog ? "block" : "none" }}
        aria-labelledby="orderDetailsModalLabel"
        aria-hidden={!openDetailsDialog}
      >
        <div className="modal-dialog" style={{ maxWidth: "600px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailsModalLabel">
                Order Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setOpenDetailsDialog(false)}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order ID</p>
                    <span>{order.id}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Date</p>
                    <span>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Quantity</p>
                    <span>{order.quantity}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Price</p>
                    <span>{order.quantity * order.product.price}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Status</p>
                    <span>{order.orderStatus}</span>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row g-3">
                <div className="col-12">
                  <div className="fw-medium">Payment Details</div>
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between">
                      <span>{payment.status}</span>
                      <span>{payment.mode}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr />

              <div className="row g-3">
                <div className="col-12">
                  <div className="fw-medium">Shipping Info</div>
                  <div className="text-muted">
                    <p>
                      {order.user.firstName} {order.user.lastName}
                    </p>
                    <p>{order.address.address}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.pincode}</p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.notes}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateStatus}>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Order Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="InProcess">In Process</option>
                    <option value="InShipping">In Shipping</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark">
                  Update Order Status
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpenDetailsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
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
                        // className={`badge ${getStatusBadgeClass(
                        //   order.orderStatus
                        // )}`}
                        >
                          <form onSubmit={handleUpdateStatus}>
                            <div className="mb-3">
                              <label htmlFor="status" className="form-label">
                                <span
                                  className={`badge ${getStatusBadgeClass(
                                    order.orderStatus
                                  )}`}
                                >
                                  {order.orderStatus}
                                </span>
                              </label>
                              <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    status: e.target.value,
                                  })
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="InProcess">In Process</option>
                                <option value="InShipping">In Shipping</option>
                                <option value="rejected">Rejected</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </div>
                            <button type="submit" className="btn btn-dark">
                              Update Order Status
                            </button>
                          </form>
                          {/* {order.orderStatus} */}
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
    </>
  );
}
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

export default SellerOrderDetailsPage;
