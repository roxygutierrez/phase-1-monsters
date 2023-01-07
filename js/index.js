/*
When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.


1- Create a form that allows the user to create a new monster, and under this form should automatically have 50 monsters loaded. At the end of the list of monsters, there should be a button I can click that should load the next 50 monsters

2-  -Where are the monsters located?
    -Where should the monsters load?
    -Where can i create my form?

3- Create a form to allow users to create a new monster
    i. Add a form tag in HTML under #create-monster tag
        a. Create a field for each of the monster's attributes
            i. name, age, and description
        b. Create a button for the form that says "Create Monster Button"

4- Fetch the and load only the 1st 50 monsters 
    i. Select the monster container and make it a variable called monsterContainer
    ii. Create a new div called "monsters-card" to hold the monsters and make it a variable, call it monsterCard
        a-give this div an id of monster-card
    iii. Fetch Data from URL and limit the monsters to 50 monsters
    iv. in the fetch moethod, for each monster in the array, create a new element
        b. Create a new element for each of the monster's attributes
            i. Create a new element for the monster's name and assign it to the monster's name on the array
            ii. Create a new element for the monster's age and assign it to the monster's name on the array
            iii. Create a new element for the monster's description and assign it to the monster's name on the arra
    v. Append  monsterCard to monsterContainer
    vi. Append monsters name, age, and description to monsterCard
5. Add an event listener submit to the form
    i. select the form and make it a variable called monster-form
        a. add the event handler "submit" to monster-form
    ii. e.preventDefault to prevent the form from refreshing
    iii. Create a new monster object 
        a. Assign it's key:value pairs
    iv. Fetch data from base URL
    v. Parse data into json
    vi. renderMonster 
6. Create a button at the bottom of the monster list, when clicked, loads the next 50 monsters
    i. Select forward and back buttons 
    iii. Add an event listner click to the button element
        a. Within the event listener, fetch the monster data for the next 50 monsters
        b. use the renderMonster function to render the new set of monsters


*/
let currentPage = 1;

const monsterContainer = document.querySelector("#monster-container");
const baseURL = "http://localhost:3000/monsters";
let fiftyURL = `${baseURL}/?_limit=50&_page=1`;

const addPage = () => {
  currentPage++;
  fiftyURL = `${baseURL}/?_limit=50&_page=${currentPage}`;
  return URL;
};

const subtractPage = () => {
  currentPage--;
  fiftyURL = `${baseURL}/?_limit=50&_page=${currentPage}`;
  return URL;
};

fetch(fiftyURL)
  .then((resp) => resp.json())
  .then((monsterArr) => {
    monsterArr.forEach(renderMonster);
  });

const renderMonster = (monster) => {
  const monsterCard = document.createElement("div");
  monsterCard.id = "monster-card";

  const name = document.createElement("p");
  name.textContent = monster.name;

  const age = document.createElement("p");
  age.textContent = monster.age;

  const description = document.createElement("p");
  description.textContent = monster.description;

  monsterContainer.append(monsterCard);
  monsterCard.append(name, age, description);
};

const monsterForm = document.querySelector("#monster-form");
monsterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newMonsterObj = {
    name: e.target["monster-name"].value,
    age: e.target["monster-age"].value,
    description: e.target["monster-description"].value,
  };

  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMonsterObj),
  })
    .then((resp) => resp.json())
    .then(renderMonster);
  e.target.reset();
});

const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");

forwardButton.addEventListener("click", (e) => {
  addPage();
  fetch(fiftyURL)
    .then((resp) => resp.json())
    .then((monsterArr) => {
      document.querySelector("#monster-container").textContent = "";
      monsterArr.forEach(renderMonster);
    });
});

backButton.addEventListener("click", (e) => {
  subtractPage();
  fetch(fiftyURL)
    .then((resp) => resp.json())
    .then((monsterArr) => {
      document.querySelector("#monster-container").textContent = "";

      monsterArr.forEach(renderMonster);
    });
});
