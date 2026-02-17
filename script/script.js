const loadTrendingProducts =()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data =>{
        const topRated = [...data].sort((a, b)=> b.rating.rate - a.rating.rate).slice(0,3)
        displayTrendingProducts(topRated)
    })
}

const displayTrendingProducts = (products)=>{
    const trendingContainer = document.getElementById("trending-container");
    trendingContainer.innerHTML = "";
    products.forEach(product => {
        const productCart = document.createElement("div");
        productCart.innerHTML = `
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

    trendingContainer.append(productCart)
    });

}


loadTrendingProducts()