// creation de figure 
const divGallery = document.querySelector(".gallery");
const figure = document.createElement("figure");
divGallery.appendChild(figure);

//creation des balise img et figcaption 

const img = document.createElement("img");
img.setAttribute("id","img");
figure.appendChild(img)

const title = document.createElement("figcaption");
title.setAttribute("id","title");
figure.appendChild(title);




// image depuis l'api 
fetch("http://localhost:5678/api/works")
.then(res => res.json())
.then(data => img.src = data[0].imageUrl);

//title depuis l'api 
fetch("http://localhost:5678/api/works")
.then(res => res.json())
.then(data => title.innerText = data[0].title);







