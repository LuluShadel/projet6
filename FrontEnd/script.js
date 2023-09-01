
const gallery = document.querySelector(".gallery")

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

const filteredWorks = works.filter(function (work) {
    return work.category.id === categoryId;
});

for (const element of filteredWorks) {
    const figure = document.createElement("figure");
    figure.innerHTML = `
        <img src="${element.imageUrl}" alt="${element.title}">
        <figcaption>${element.title}</figcaption>
    `;
    gallery.appendChild(figure);
}


async function TriageFiltre() {
    const works = await appelApiWorks();
    

    function applyFilter(categoryId) {
        gallery.innerHTML = "";
        clearFilters();
        const btn = document.querySelector(`.btn${categoryId}`);
        btn.classList.add("active");

        const filteredWorks = works.filter(function (work) {
            return work.category.id === categoryId;
        });

        for (const element of filteredWorks) {
            const figure = document.createElement("figure");
            figure.innerHTML = `
                <img src="${element.imageUrl}" alt="${element.title}">
                <figcaption>${element.title}</figcaption>
            `;
            gallery.appendChild(figure);
        }
    }

    const btn1 = document.querySelector(".btn1");
    btn1.addEventListener("click", function () {
        applyFilter(1);
    });

    const btn2 = document.querySelector(".btn2");
    btn2.addEventListener("click", function () {
        applyFilter(2);
    });

    const btn3 = document.querySelector(".btn3");
    btn3.addEventListener("click", function () {
        applyFilter(3);
    });
}
    affichageImage()
    afficherfiltre()
    TriageFiltre()

    // mode edition 

    const userToken = window.localStorage.getItem("userToken");
    const btnLogOut = document.querySelector(".btnLogOut");
    const btnLogin = document.querySelector(".btnLogin");
    const divEdition = document.querySelector(".edition");
    const divFiltre = document.getElementById("filtres");
    const modification = document.querySelector(".modification");
    
    if (userToken !== null) {
        enableEditMode();
        btnLogOut.addEventListener("click", disableEditMode);
    }
    
    function enableEditMode() {
        btnLogOut.classList.remove("inactive");
        btnLogin.classList.add("inactive");
        divEdition.classList.remove("inactive");
        divFiltre.classList.add("inactive");
        modification.classList.remove("inactive");
    }
    
    function disableEditMode() {
        window.localStorage.removeItem('userToken');
        btnLogOut.classList.add("inactive");
        btnLogin.classList.remove("inactive");
        divEdition.classList.add("inactive");
        divFiltre.classList.remove("inactive");
        modification.classList.add("inactive");
    }


// modal 

const btnEdition = document.getElementById("btnEdition")
const btnEdition2 = document.querySelector(".btnEdition2")
const dialog = document.getElementById("modal")

btnEdition.addEventListener("click",function(){
    dialog.showModal()
    genererModalGallery()
})

btnEdition2.addEventListener("click",function(){
    dialog.showModal()
    genererModalGallery()
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
                
                if(confirm("voulez vous vraiment supprimer le projet ?")){
                deleteWork(element.id) 
                try {
                    while (allWorks.firstChild){
                    allWorks.removeChild(allWorks.firstChild); 
                    }
                    
                    
                }
                
                catch {
                    alert("ERROR")
                }
            }
            else {
                alert("Le projet n'a pas été supprimé")
            }
            })
            
    
    }
    

}
       
    
    


// fonction pour supprimer les works 
async function deleteWork(id) {
    // Récupération du token
    if (userToken !== null) {
        const tokenJson = JSON.parse(userToken);
        const token = tokenJson.token;

    
            try {
                const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (response.ok) {
                    console.log("Projet supprimé avec succès !");
                    gallery.innerHTML=""
                    affichageImage()
                    
                } else {
                    console.error("Une erreur s'est produite lors de la suppression du projet.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        } else {
            console.log("Suppression annulée par l'utilisateur.");
        }
    }



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



        // changement du style de l'input files 

        const inputImage = document.getElementById("ajoutPhoto")
        const btnChoixFichier = document.getElementById("btnChoixFichier")
        const imagePreview = document.getElementById("fichierSelectionner")

        btnChoixFichier.addEventListener("click",function(event){
            event.preventDefault()
            inputImage.click()
        })

        inputImage.addEventListener("change",function(){
            const selectedFile = inputImage.files[0]

            // rajouter quoi faire du fichier 
            if(selectedFile){
                const reader = new FileReader();
        
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block"

            }
            reader.readAsDataURL(selectedFile)
        }
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
                                })
                                if (response.ok) {
                                    console.log("Succès")
                                    form.reset()
                                    imagePreview.src=""
                                    imagePreview.style.display="none"
                                    gallery.innerHTML=""
                                    affichageImage()
                                } else {
                                    console.log("Erreur")
                                }
                            } catch (error) {
                                console.error("Erreur lors de la requête :", error)
                            }
                        }
                    }
                } else {
                    alert("Veuillez remplir tous les champs");
                }
            });

            
            

            










