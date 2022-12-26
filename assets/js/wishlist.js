const products = document.getElementById("products");

async function wishlist() {
  const r = await axios.get("https://api-nica.onrender.com/all")
  .then(response => response.data.data);

  return r;
};

async function t() {

  const data = await wishlist();

  for(i in data) {
    products.innerHTML += `<a href="${data[i].url}" target="_blank"><button class="products"><img src=${data[i].photo}> <br><span>${data[i].name}</span> <br>Preço: R$${data[i].price}</button><br></a>`; 
  };
};

t()
