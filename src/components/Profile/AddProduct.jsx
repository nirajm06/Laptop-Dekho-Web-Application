import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus, Trash2, Pencil } from "lucide-react";
import "./AddProduct.css";

const AddProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]); // store all products
  const [editIndex, setEditIndex] = useState(null); // 🆕 track which product is being edited

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // 🆕 Handle form submit (add / edit)
  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      stock: data.stock,
      image: imagePreview,
    };

    if (editIndex !== null) {
      // 📝 Update existing product
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // ➕ Add new product
      setProducts((prev) => [...prev, newProduct]);
    }

    reset();
    setImagePreview(null);
    setShowForm(false);
  };

  // 🖼 Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // 🗑 Delete product
  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  // ✏ Edit product
  const handleEdit = (index) => {
    const product = products[index];
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("description", product.description);
    setValue("category", product.category);
    setValue("stock", product.stock);
    setImagePreview(product.image);

    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Product Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Product Cards */}
      <div className="product-grid">
        {products.length === 0 ? (
          <p className="no-product">No products added yet.</p>
        ) : (
          products.map((p, index) => (
            <div className="product-card" key={index}>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  <Pencil size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <img src={p.image} alt={p.name} className="product-img" />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p>{p.category}</p>
              <p className="desc">{p.description}</p>
              <p>
                <b>Stock:</b> {p.stock}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ======== Modal Form ======== */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editIndex !== null ? "Edit Product" : "Add New Product"}</h3>
              <button
                className="btn-close"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setImagePreview(null);
                  setEditIndex(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="address-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    {...register("name", { required: "Product name is required" })}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    className={errors.price ? "error" : ""}
                  />
                  {errors.price && <span className="error-message">{errors.price.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    {...register("description", { required: "Description is required" })}
                    className={errors.description ? "error" : ""}
                  ></textarea>
                  {errors.description && (
                    <span className="error-message">{errors.description.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    {...register("category", { required: "Category is required" })}
                    className={errors.category ? "error" : ""}
                  />
                  {errors.category && (
                    <span className="error-message">{errors.category.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    {...register("stock", { required: "Stock is required" })}
                    className={errors.stock ? "error" : ""}
                  />
                  {errors.stock && <span className="error-message">{errors.stock.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange}
                    className={errors.image ? "error" : ""}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ marginTop: "10px", maxHeight: "150px", borderRadius: "6px" }}
                    />
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editIndex !== null ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                    setImagePreview(null);
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
