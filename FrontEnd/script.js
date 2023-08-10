
// Evenement du bouton tous (par defaut)

//div parent pour les works
let gallery = document.querySelector(".gallery")

// variable contenant chemin vers api works 
const urlWorks ="http://localhost:5678/api/works"

//variable contenant chemin vers api catégorie 
let urlCategorie = "http://localhost:5678/api/categories"



// fonction recuperant l'api works
async function appelApiWorks(){
 

//reponse au format json = lisible 
const response = await fetch(urlWorks)
return await response.json();
}


async function appelApiCategorie(){
const response = await fetch(urlCategorie)
return await response.json();
}


// affichage des images
async function affichageImage (){
   let works= await appelApiWorks()
   
    
    //boucle permettant d'afficher les images 
    for(let i=0; i < works.length; i++){
        const element = works[i]
     
        let allWorks = document.createElement("figure")
        allWorks.innerHTML=`
        <img src="${element.imageUrl}" alt="${element.title}">
        <figcaption>${element.title}</figcaption>
        `
        gallery.appendChild(allWorks)
    }
}


// creation des boutons filtres 

async function afficherfiltre(){
    let categories = await appelApiCategorie()
    

    let ligne1 = categories[1]
    console.log(ligne1)
    
    //boucle for pour chaque catégorie
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        // récuperation de la div parent 
       let divFiltre = document.getElementById("filtres")
        
        //creation du boutton 
        let allFiltre = document.createElement("button")
        allFiltre.classList=`btnFiltre btn btn${element.id}`
        allFiltre.innerText=`${element.name}`
        
        //rattachement aux parents 
        divFiltre.appendChild(allFiltre)
        
    }
    // evenement au clic du bouton tous (par defaut)
    const btnTous = document.querySelector(".btnTous")
    btnTous.addEventListener("click",()=>{
        // efface avant chaque affichage
        gallery.innerHTML = ""
        affichageImage()

    })


    // filtrage 
    function clearFilters() {

        const filters = document.getElementById("filtres");
        
        const children = filters.children;
        for(let i = 0; i < children.length; i++) {
            const child = children[i];
            child.classList.remove("active");
        }
    };

}

affichageImage()
afficherfiltre()








   









