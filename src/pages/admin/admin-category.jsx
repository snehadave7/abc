import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  fetchAllProductCategory,
} from "../../service/adminCategorySlice";
import { DeleteCategory } from "../../service/adminCategorySlice";

const initialFormData = {
  name: "",
};

function AdminCategory() {
  const { categoryList = [], isLoading } = useSelector(
    (state) => state.adminCategory
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    dispatch(fetchAllProductCategory());
  }, [dispatch]);

  function handleDelete(catId) {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(DeleteCategory(catId)).then((data) => {
        dispatch(fetchAllProductCategory());
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const catData = {
      name: formData.name,
    };
    await dispatch(AddCategory(formData.name)).then(async (data) => {
      await dispatch(fetchAllProductCategory());
    });
  }
  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h3" className="bg-dark text-white">
          Product Category Management
        </Card.Header>

        <Card.Body>
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>CategoryName</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.length > 0 ? (
                  categoryList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <id>{item.name}</id>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                        <Button variant="danger" size="sm">
                          SubCategory
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr colSpan="6" className="text-center">
                    <td>No category found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
          <h4>
            <b>Add new Category</b>
          </h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Category Name..."
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <button type="submit" className="btn btn-dark">
              Add
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminCategory;
