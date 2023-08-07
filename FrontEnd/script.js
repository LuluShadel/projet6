// affichage des images page d'acceuil
const urlWork = "http://localhost:5678/api/works";

let work = []


const card = async () =>{

    await fetch(urlWork)
    .then((response)=>response.json())
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

 // appel de l'api avec le chemin catégorie
fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then((categories) => {
    //boucle for pour chaque catégorie
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        console.log(element);

        // récuperation de la div parent 

        let divFiltre = document.getElementById("filtres")
        
        let allFiltre = document.createElement("button")
        allFiltre.classList=`btn btn${element.id}`
        
        allFiltre.innerText=`${element.name}`
        
        divFiltre.appendChild(allFiltre)

    }})
        



// changement de couleur pour le filtre selectionner 

















