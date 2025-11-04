import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
const ProductForm = () => {
  const [name, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id).then((response) => {
        setProduct(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price)
      });
    }
  }, [id]);

  const saveOrUpdateProduct = (e) => {
    e.preventDefault();
    const product = { name, description, price };
    if (id) {
      ProductService.updateProduct(id, product).then(() => {
        navigate("/");
      });
    } else {
      ProductService.createProduct(product).then(() => {
        navigate("/");
      });
    }
  };
  return (
    <div>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={saveOrUpdateProduct}>
        <div>
          <label>Product:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
                <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};
export default ProductForm;
