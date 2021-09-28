const contendorProductos = document.querySelector("#container");

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// Get data from a json file
const fetchData = async () => {
  try {
    const res = await fetch("comics.json");
    const data = await res.json();
    console.log(data);
    populateProducts(data);
    handleButtons(data);
  } catch (error) {
    console.log(error);
  }
};

// Example: How to populate a template box width products cards
const populateProducts = (data) => {
  const template = document.querySelector("#contenedor").content;
  const fragment = document.createDocumentFragment();
  // console.log(template)
  data.forEach((comic) => {
    // console.log(producto)
    // The setAttribute() function creates the attribute if doesn't exist.
    template.querySelector("img").setAttribute("src","./imgMarvel/"+ comic.imagen);
    template.querySelector("h5").textContent =
      comic.nombre + " " + comic.coleccion;
    template.querySelector("p").textContent = comic.autor;
    // Dataset is only for information
    template.querySelector("button").dataset.id = comic.id;
    // node template must be cloned to ensure a good performace
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  contendorProductos.appendChild(fragment);
};

// Example: How to link events to HTML tag
const handleButtons = (data) => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Info button:" + btn.dataset.id);
      const producto = data.find(
        (item) => item.id === parseInt(btn.dataset.id)
      );
      producto.cantidad = 1;
      alert(`id:` + btn.dataset.id);
    });
  });
};
