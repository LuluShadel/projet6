
const userMail = document.querySelector(".champsEmail");
const password = document.getElementById("champsPassword");
const form = document.getElementById("login")

console.log(form)



const data = {
    email: userMail.value,
    password: password.value,
}

console.log(data)


    

    form.addEventListener("submit",(event)=>{
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
    

        const chargeUtile= JSON.stringify(data)
        console.log(chargeUtile)
        
fetch("http://localhost:5678/api/users/login",{
    method : 'post',
    headers: {
        'Content-Type': 'application/json'      
      },
      body:chargeUtile,
})
.then (response =>{
    if (response.ok){
        return response.json()
    }
    else{
        throw new Error ("Erreur lors de la requête")
    }
})
})





