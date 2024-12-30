import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const AddCategory = createAsyncThunk("/addCategory", async (catName) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const response = await axios.post(
    "https://localhost:7152/api/ProductCategories",
    {
      name: catName,
    },
    {
      headers: {
        Authorization: `Bearer ${storedUser.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );
  return response.data;
});

export const DeleteCategory = createAsyncThunk(
  "deleteCategory",
  async (catId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(
      `https://localhost:7152/api/ProductCategories?id=${catId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const fetchAllProductCategory = createAsyncThunk(
  "/category/fetchAllCategory",
  async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      "https://localhost:7152/api/ProductCategories",
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
);
const adminCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(AddCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(DeleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.categoryList = action.payload.data;
      })
      .addCase(DeleteCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.categoryList = action.payload.$values;
      })
      .addCase(fetchAllProductCategory.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      });
  },
});
export default adminCategorySlice.reducer;
