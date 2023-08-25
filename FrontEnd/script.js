
let gallery = document.querySelector(".gallery")
const urlWorks ="http://localhost:5678/api/works" 
const urlCategorie ="http://localhost:5678/api/categories"
const urlDeleteWork ="http://localhost:5678/api/works/"

// fonction recuperant l'api works
async function appelApiWorks(){
    const response = await fetch(urlWorks)
    return await response.json();
}


async function appelApiCategorie(){
    const response = await fetch(urlCategorie)
    return await response.json()
}

async function appelApiDeleteWork(){
    const response = await fetch (urlDeleteWork)
    return await response.json()
}

let works= []

// affichage des images
async function affichageImage (works){
   works = await appelApiWorks()
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
        let divFiltre = document.getElementById("filtres")
        
        //creation du boutton 
        let allFiltre = document.createElement("button")
        allFiltre.classList=`btnFiltre btn btn${element.id}`
        allFiltre.innerText=`${element.name}`
 
        divFiltre.appendChild(allFiltre)   
    }

    // evenement au clic du bouton tous (par defaut)
    const btnTous = document.querySelector(".btnTous")

    btnTous.addEventListener("click",()=>{
        gallery.innerHTML = ""
        clearFilters()
        btnTous.classList.add("active")
        affichageImage(works)
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




async function TriageFiltre (){
    
    works = await appelApiWorks()

    //recuperation du btn objet
    let btn1 = document.querySelector(".btn1")

        //ecoute du clic bouton objet
        btn1.addEventListener("click",function (){
            gallery.innerHTML = ""
            //on efface la class active des bouton filtres
            clearFilters()
            // on ajoute active sur le bouton cliquer
            btn1.classList.add("active")
            //fonction qui filtre 
            const filtreObjet= works.filter(function(work){
            // retourne que si category.id=1 donc objet
                return work.category.id ===1  
            })
            // mise à jour du DOM en fonction du nouveau tableau filtrer
            affichageImage(filtreObjet)
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

        
    
    affichageImage()
    afficherfiltre()
    TriageFiltre()




    // mode edition 


    const userToken = window.localStorage.getItem("userToken")

const btnLogOut = document.querySelector(".btnLogOut")
const btnLogin = document.querySelector(".btnLogin")
const divEdition = document.querySelector(".edition")
const divFiltre = document.getElementById("filtres")
const modification = document.querySelector(".modification")


    
if (userToken !== null){
    modeEditionLogin()

    btnLogOut.addEventListener("click",function(){
        modeEditionLogOut()
    })
}

function modeEditionLogin(){
    btnLogOut.classList.remove("inactive")
    btnLogin.classList.add("inactive")
    divEdition.classList.remove("inactive")
    divFiltre.classList.add("inactive")
    modification.classList.remove("inactive")

}

function modeEditionLogOut (){
    window.localStorage.removeItem('userToken')
        btnLogOut.classList.add("inactive")
        btnLogin.classList.remove("inactive")
        divEdition.classList.add("inactive")
        divFiltre.classList.remove("inactive")
        modification.classList.add("inactive")
        
}


// modal 

const btnEdition = document.getElementById("btnEdition")
const dialog = document.getElementById("modal")

btnEdition.addEventListener("click",function(){
    dialog.showModal()
})


// affichage des works modal galerie photo


async function genererModalGallery (){
const modalGallery = document.getElementById("modalGallery")
modalGallery.innerHTML=""

const modalWork = await appelApiWorks()


for (let i =0;i<modalWork.length;i++){

    const element = modalWork[i]
    
    let allWorks = document.createElement("figure")
    allWorks.setAttribute("class","figureModal")
        allWorks.innerHTML=`
        <div class="divTrashIcon"></div>
        <img src="${element.imageUrl}" alt="${element.title}">
        `
        modalGallery.appendChild(allWorks)
    
    let trashIcon = document.createElement("a")
        trashIcon.innerHTML=`
        <i class="fa-solid fa-trash-can"></i>
        `
        allWorks.appendChild(trashIcon)

        trashIcon.addEventListener("click",function(e){
            deleteWork(element.id) 
            try {
                while (allWorks.firstChild)
                allWorks.removeChild(allWorks.firstChild); 
            }
            catch {
                alert("ERROR")
            }
        })
}
}
   
genererModalGallery()





async function deleteWork(id){

    //recuperation du token 
    if (userToken !==null){
        const tokenJson = JSON.parse(userToken)
        
        let token = tokenJson.token

        if(confirm( `voulez vous vraiment supprimer le projet`)===true){
            
           await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${token}`},
                })    
                
             
        }
        
    
    }}


        // modal ajout photo 


    const btnAjoutPhoto = document.getElementById("btnAjoutPhoto")
    const modalAjout = document.getElementById("modalAjout")

        btnAjoutPhoto.addEventListener("click",function(){
            modalAjout.showModal()
        })


        // fermeture de la modal 

        const btnClose1 = document.querySelector(".close1")

        btnClose1.addEventListener("click",function(){
            modalAjout.close()
        })


            // ajouter des photos 

            const photoAjouté = document.getElementById("ajoutPhoto");
            const titreAjouté = document.getElementById("ajoutTitre");
            const categorieAjouté = document.getElementById("choixCatégorie");
            const form = document.getElementById("modalAjoutPhoto");
            const btnValide = document.getElementById("validerPhoto")

            
            
            btnValide.addEventListener("click", async function (event) {
                event.preventDefault();
                
                if (photoAjouté.value !== "" && titreAjouté.value !== "" && categorieAjouté.value !== "") {
                    if (userToken !== null) {
                        const tokenJson = JSON.parse(userToken);
                        let token = tokenJson.token;
            
                        if (confirm(`Voulez-vous vraiment ajouter le projet ?`)) {
                            try {
                                const response = await fetch(`http://localhost:5678/api/works`, {
                                    method: "POST",
                                    headers: { "Authorization": `Bearer ${token}` },
                                    body: new FormData(form) // récupère directement les données du formulaire
                                });
                                for(let pair of new FormData(form).entries()){
                                    console.log(pair[0]+','+typeof(pair[1]))  // pour regarder le type des elements envoyés
                                }
            
                                if (response.ok) {
                                    console.log("Succès");
                                } else {
                                    console.log("Erreur");
                                }
                            } catch (error) {
                                console.error("Erreur lors de la requête :", error);
                            }
                        }
                    }
                } else {
                    alert("Veuillez remplir tous les champs");
                }
            });

            
            

            










