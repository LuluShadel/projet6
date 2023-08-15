
// Evenement du bouton tous (par defaut)

//div parent pour les works
let gallery = document.querySelector(".gallery")

// variable contenant chemin vers api works 
const urlWorks ="http://localhost:5678/api/works"

//variable contenant chemin vers api catégorie 
let urlCategorie ="http://localhost:5678/api/categories"



// fonction recuperant l'api works
async function appelApiWorks(){
 

//reponse au format json = lisible 
const response = await fetch(urlWorks)
return await response.json();
}


async function appelApiCategorie(){
const response = await fetch(urlCategorie)
return await response.json()

}

let works= []
// affichage des images
async function affichageImage (){
   works = await appelApiWorks()
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
        clearFilters()
            btnTous.classList.add("active")
        affichageImage()
        

    })

}

// fonction qui va retirer la class active  
function clearFilters() {

    const filters = document.getElementById("filtres")
    
    const children = filters.children
    for(let i = 0; i < children.length; i++) {
        const child = children[i]
        child.classList.remove("active")
    }
}

affichageImage()
afficherfiltre()


async function TriageFiltre (){
    let categories = await appelApiCategorie()
    works = await appelApiWorks()

    //recuperation du btn objet
    let btn1 = document.querySelector(".btn1")

        //ecoute du clic bouton objet
        btn1.addEventListener("click",function (){
            gallery.innerHTML = ""
            clearFilters()
            btn1.classList.add("active")
            const filtreObjet= works.filter(function(work){
            
                return work.category.id ===1  
            })
            console.log(filtreObjet)
            for(let i=0; i <filtreObjet.length ; i++){
                const element = filtreObjet[i]
             
                let allWorks = document.createElement("figure")
                allWorks.innerHTML=`
                <img src="${element.imageUrl}" alt="${element.title}">
                <figcaption>${element.title}</figcaption>
                `
                gallery.appendChild(allWorks)
                
            }
        }) 
        let btn2 = document.querySelector(".btn2")

        //ecoute du clic bouton objet
        btn2.addEventListener("click",function (){
            gallery.innerHTML = ""
            clearFilters()
            btn2.classList.add("active")
            const filtreAppartement= works.filter(function(work){
            
                return work.category.id ===2  
            })
            for(let i=0; i <filtreAppartement.length ; i++){
                const element = filtreAppartement[i]
             
                let allWorks = document.createElement("figure")
                allWorks.innerHTML=`
                <img src="${element.imageUrl}" alt="${element.title}">
                <figcaption>${element.title}</figcaption>
                `
                gallery.appendChild(allWorks)
                
            }
        }) 
        let btn3 = document.querySelector(".btn3")

        //ecoute du clic bouton objet
        btn3.addEventListener("click",function (){
            gallery.innerHTML = ""
            clearFilters()
            btn3.classList.add("active")
            const filtreHotel= works.filter(function(work){
            
                return work.category.id ===3  
            })
            for(let i=0; i <filtreHotel.length ; i++){
                const element = filtreHotel[i]
             
                let allWorks = document.createElement("figure")
                allWorks.innerHTML=`
                <img src="${element.imageUrl}" alt="${element.title}">
                <figcaption>${element.title}</figcaption>
                `
                gallery.appendChild(allWorks)
                
            }
        }) 
    }
        
    

TriageFiltre()





   









