

//Get content from JSON
async function getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

        // Omvandlar svaret för json till datan jag kan använda
        const json = await response.json();
        return json;

    }catch (error) {
        console.error(error.message);
        return null;
    }
}


function createUserCard(user) {
    
        // Skapa kortet
        const card = document.createElement('div');
        card.classList.add('user-card');

        //skapa och fyll inehållet vi vill ha 
        const name = document.createElement('h2');
        name.textContent = user.name;

        
        const username = document.createElement('p');
        username.textContent = (`Användarnamn: ${user.username}`);

        
        const email = document.createElement('p');
        email.textContent = (`Email: ${user.email}`);

          // Skapa "Visa mer"-knapp
      const button = document.createElement('button');
      button.textContent = 'Visa mer';

      // Skapa extra info-div (gömd från början)
      const extraInfo = document.createElement('div');
      extraInfo.style.display = 'none';
      

      const city = document.createElement('p');
      city.textContent = `Stad: ${user.address.city}`;

      const phone = document.createElement('p');
      phone.textContent = `Telefon: ${user.phone}`;

      const company = document.createElement('p');
      company.textContent = `Företag: ${user.company.name}`;

    

      
        // Lägg till extra info i div
        extraInfo.appendChild(city);
        extraInfo.appendChild(phone);
        extraInfo.appendChild(company);

                // Lägg till eventlyssnare på knappen
                button.addEventListener('click', () => {
                    if (extraInfo.style.display === 'none') {
                        extraInfo.style.display = 'block';
                        button.textContent = 'Visa mindre';
                    } else {
                        extraInfo.style.display = 'none';
                        button.textContent = 'Visa mer';
                    }
                });
        
        
            //lägg till allt i kortet
        
            card.appendChild(name);
            card.appendChild(username);
            card.appendChild(email);
            card.appendChild(button);
            card.appendChild(extraInfo);

            return card;
            }


// Hittar elementet i HTML to Show users
 function displayUsers(users) {

    const container = document.getElementById('user-container');
    console.log("Dessa användare kommer in i displayUsers:", users);
  
  users.forEach(user => {
    const card = createUserCard(user);
    container.appendChild(card);
  });
}



 //Så att funktionen körs automatiskt när sidan laddas
document.addEventListener('DOMContentLoaded', async () => {
    const users = await getUsers();

    if (users) {
        displayUsers(users);
    } else {
        console.error("Inga användare hämtades.");
    }
})


