
const url = "http://localhost:5678/api/works";

let work = [];

// fonction assync avec await qui interrompt l'execution et attend la resolution de la promesse
const request = async () => {
    await fetch(url)
    //pour analyse réponse en json et retourner les données en json
    .then ((resolve)=>resolve.json())
    // ligne du tableau = donnée
    .then((data)=>{
        work = data
    })
    // catch = plusieurs instruction à utiliser en cas d'erreur 
    .catch(function(error){
        alert('http error'+error.status)
    })
}

const workList = async()=>{
    await request()
    //recupération de la div parent et utilisation de map pour recuperer les elements du tableau 
    document.querySelector(".gallery").innerHTML=work.map(
        //ajout du bloc avec les `` à rajouter pour chaques lignes
        (liste) =>`
        <figure>
        <img src="${liste.imageUrl}" alt="${liste.title}"></img>
        <figcaption>${liste.title}</figcaption>
</figure>`
// permet de concaténé tous les élements d'un tableau 
    ).join("")
}
workList()











