const loadAllProducts = ()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => showAllproducts(data))
}
const loadCategories = ()=>{
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => showCategories(data))
    .catch(error => console.log("Error:", error));
}
const loadProductByCategory = (category)=>{
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => showProductByCategory(data))
}

const loadProductDetails=async(id)=>{
    const url = `https://fakestoreapi.com/products/${id}`;
    const res =await fetch(url);
    const details = await res.json();
    
    showProductsDetails(details)
}

const showProductsDetails = (product)=>{
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =`
    <div class="card w-96 bg-base-100 card-sm shadow-sm">
  <div class="card-body">
    <h2 class="card-title">${product.title}</h2>
    <p>${product.description}</p>
    <p>${product.price}</p>
    <p>${product.rating.rate}</p>
    <div class="justify-end card-actions">
      <button class="btn btn-primary mt-8">Buy Now</button>
    </div>
  </div>
    </div>
    `
    document.getElementById("product_modal").showModal()
}
const showCategories = (categories)=>{
    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = "";
    for(let category of categories){
        const categoryLi = document.createElement("li");
        categoryLi.addEventListener("click", ()=>{
            loadProductByCategory(category)
        })
        categoryLi.classList.add("btn", "btn-outline", "rounded-full");
        categoryLi.innerText = category;
       
        
        categoryContainer.append(categoryLi)

    }
}

const showProductByCategory =(products)=>{
    const productContainer = document.getElementById("product-container")
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
         <div class="card bg-base-100 w-96 h-full shadow-sm mt-4">
    <figure>
    <img class="w-full object-cover h-60"
      src="${product.image}"
      alt="Trending Product" />
  </figure>
  <div class="card-body">
    <div class="flex justify-between">
      <p class="first-letter:capitalize">${product.category}</p>
      <div class="flex gap-2 items-center">
        <i class="fa-solid text-yellow-500 fa-star"></i>
        <p>${product.rating.rate}</p>
        <p>${product.rating.count}</p>
      </div>
    </div>
    <p class="text-xl font-semibold">${product.title}</p>
    <p class="text-xl font-semibold">${product.price}</p>
    <div class="card-actions justify-between mt-4 ">
      <div class="btn btn-outline px-12"><i class="fa-solid fa-circle-info"></i>Details</div>
      <div class="btn btn-primary px-12"><i class="fa-solid fa-cart-shopping"></i> Add</div>
    </div>
    </div>
    </div>
        
        `

        productContainer.append(productDiv)

    });
}

const showAllproducts = (allProducts)=>{
  const showAllBtn =  document.getElementById("show-all-products")
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
    for(let product of allProducts){
        showAllBtn.addEventListener("click", ()=>{
            const productDiv = document.createElement("div");
        productDiv.innerHTML = `
         <div class="card bg-base-100 w-96 h-full shadow-sm mt-4">
    <figure>
    <img class="w-full object-cover h-60"
      src="${product.image}"
      alt="Trending Product" />
  </figure>
  <div class="card-body">
    <div class="flex justify-between">
      <p class="first-letter:capitalize">${product.category}</p>
      <div class="flex gap-2 items-center">
        <i class="fa-solid text-yellow-500 fa-star"></i>
        <p>${product.rating.rate}</p>
        <p>${product.rating.count}</p>
      </div>
    </div>
    <p class="text-xl font-semibold">${product.title}</p>
    <p class="text-xl font-semibold">${product.price}</p>
    <div class="card-actions justify-between mt-4 ">
      <div onclick="loadProductDetails(${product.id})" class="btn btn-outline px-12"><i class="fa-solid fa-circle-info"></i>Details</div>
      <div class="btn btn-primary px-12"><i class="fa-solid fa-cart-shopping"></i> Add</div>
    </div>
    </div>
    </div>
        
        `

        productContainer.append(productDiv)

        })
    }
}

loadAllProducts()
loadCategories()
