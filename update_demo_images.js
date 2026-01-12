import axios from 'axios';

async function updateProduct() {
  try {
    // 1. Get all products to find a valid ID
    console.log("Fetching products...");
    const res = await axios.get('http://localhost:5000/api/products');
    const products = res.data;

    if (products.length === 0) {
      console.log("No products found to update.");
      return;
    }

    // 2. Pick the first product
    const targetProduct = products[0];
    console.log(`Updating product: ${targetProduct.name} (ID: ${targetProduct.id})`);

    // 3. Prepare fake "additional" images by reusing other product images if available
    let extraImages = [];
    if (products.length >= 3) {
       // Use images from other products to simulate variety
       extraImages = [targetProduct.image, products[1].image, products[2].image];
    } else {
       extraImages = [targetProduct.image];
    }

    // 4. Send PUT request
    const updateRes = await axios.put(`http://localhost:5000/api/products/${targetProduct.id}`, {
       images: extraImages
    });

    console.log("Update Success:", updateRes.data.message);
    console.log("New Images:", updateRes.data.product.images);

  } catch (err) {
    console.error("Error:", err.message);
    if (err.response) console.error(err.response.data);
  }
}

updateProduct();
