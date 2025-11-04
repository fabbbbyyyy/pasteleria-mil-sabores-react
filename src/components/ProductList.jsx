import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';
const ProductList = () => {
const [products, setProducts] = useState([]);
useEffect(() => {
fetchProducts();
}, []);
const fetchProducts = () => {
ProductService.getAllProducts().then(response => {
setProducts(response.data);
}).catch(error => {
console.log('Error fetching products:', error);
});
};
const deleteProduct = (id) => {
ProductService.deleteProduct(id).then(() => {
fetchProducts();
}).catch(error => {
console.log('Error deleting product:', error);
});
};
return (
<div>
<h2>Product List</h2>
<Link to="/add">Add New Product</Link>
<table>
<thead>
<tr>
<th>Title</th>
<th>Author</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{products.map(product => (
<tr key={product.id}>
<td>{product.name}</td>
<td>{product.price}</td>
<td>
<Link to={`/edit/${product.id}`}>Edit</Link>
<button onClick={() => deleteProduct(product.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};
export default ProductList;