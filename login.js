
const userMail = document.getElementById("champsEmail");
const password = document.getElementById("champsPassword");
const form = document.getElementById("login")
const message = document.getElementById("message")



    form.addEventListener("submit",async function(event){
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        const data = {
            email: userMail.value,
            password: password.value,
        }
        const chargeUtile= JSON.stringify(data)
        


const responseLogin = await fetch("http://localhost:5678/api/users/login",{
    method : 'post',
    headers: {
        'Content-Type': 'application/json'      
      },
      body:chargeUtile,
})

    if (responseLogin.status==200){
        const responseLoginJSON = await responseLogin.json()
        
        const  token = responseLoginJSON.token
        const userId = responseLoginJSON.userId 
        
        const userToken = {
            user :`${userId}`,
            token : `${token}`
        }

        const valeurUserToken =JSON.stringify(userToken)
         window.localStorage.setItem("userToken",valeurUserToken)
         window.location.href="index.html"
    }
    else if (responseLogin.status==404){
        message.innerText="ERREUR Aucun utilisateur trouvé"
    }
    else if (responseLogin.status==401){
        message.innerText="ERREUR mot de passe incorrecte"
        
    }

})







