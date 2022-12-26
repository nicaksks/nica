const products = document.getElementById("products");

async function wishlist() {
  const r = await axios.get("https://api-nica.onrender.com/all")
  .then(response => response.data.data);

  return r;
};

async function t() {

  const data = await wishlist();

  //Name, photo, price, category and url;

  for(i in data) {
    //products.innerHTML += `<a href="${data[i].url}" target="_blank"><button class="products">${data[i].name} <br><span style="color: pink">Preço: R$${data[i].price}</span></button><br></a>`;
    products.innerHTML += `<a href="${data[i].url}" target="_blank"><button class="products"><img src=${data[i].photo}> <br><span>${data[i].name}</span> <br>Preço: R$${data[i].price}</button><br></a>`; 
  };
};

t()