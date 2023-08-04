// affichage des images page d'acceuil
const urlWork = "http://localhost:5678/api/works";

let work = []


const card = async () =>{

    await fetch(urlWork)
    .then((response)=>response.json())
    //recuperation dans notre tableau du tableau provenant de l'api
    .then((data)=>{
        work = data
        
    })
}

const cardList = async()=>{
    await card()
    //recupération de la div parent et utilisation de map pour recuperer les elements du tableau 
    document.querySelector(".gallery").innerHTML=work.map(
        //ajout du bloc avec les `` à rajouter pour chaques lignes
        (liste) =>`
        <figure>
        <img src="${liste.imageUrl}" alt="${liste.title}"></img>
        <figcaption>${liste.title}</figcaption>
</figure>`
// permet de concaténé tous les élements d'un tableau et de ne pas faire apparaittre les virgules par defaut 
    ).join("")
}
cardList()


// creation des boutons filtres 

const urlCategorie = "http://localhost:5678/api/categories";

const filtre = async() =>{
    await fetch (urlCategorie)
    .then((response)=>response.json())
    .then((data)=>{
        work=data
        
    })
}


//fonction qui ajout les filtres

let divFiltre = document.getElementById("filtres")

const filtreList = async()=>{
    await filtre ()
    divFiltre.innerHTML=work.map(
       (liste)=>
    
        `<button class="btn btnFiltre${liste.id}">${liste.name}</button>`
    ).join("")
    
}

filtreList()

// changement de couleur pour le filtre selectionner 

















