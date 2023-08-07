
// Evenement du bouton tous (par defaut)

const btnTous= document.querySelector(".btnTous")

btnTous.addEventListener("click",()=>{

// affichage des images page d'acceuil
fetch("http://localhost:5678/api/works")
//reponse au format json = lisible 
.then(response => response.json())
.then((works)=>{
    //div parent
    let divWorks = document.querySelector(".gallery")
        //efface avant chaque chargement
    divWorks.innerHTML="";
    //boucle permettant d'afficher les images 
    for(let i=0; i < works.length; i++){
        const element = works[i]
     
        let allWorks = document.createElement("figure")
        allWorks.innerHTML=`
        <img src="${element.imageUrl}" alt="${element.title}">
        <figcaption>${element.title}</figcaption>
        `
        divWorks.appendChild(allWorks)
    }
})
})
// permet d'afficher les images au chargement
btnTous.click()

// creation des boutons filtres 

 // appel de l'api avec le chemin catégorie
fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then((categories) => {
    //boucle for pour chaque catégorie
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        // récuperation de la div parent 

        let divFiltre = document.getElementById("filtres")
        
        //creation du boutton 
        let allFiltre = document.createElement("button")
        allFiltre.classList=`btn btn${element.id}`
        allFiltre.innerText=`${element.name}`
        
        //rattachement aux parents 
        divFiltre.appendChild(allFiltre)

    }})
        


















