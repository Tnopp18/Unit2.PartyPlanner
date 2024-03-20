const COHORT = "2402-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;
//make an array/variable to hold the event data
const partyArr = {
  parties: []
};
//make a variable to define the ul in html
const partyList = document.querySelector("#parties");

//sync the party array with the API and render it 
async function render() {
  await getParties();
  renderParties();
}
render();
//fetch the data from the api and put the data needed into a function
async function getParties() {
  try {
    const response = await fetch(API_URL);
    //console.log(response)
    
    const json = await response.json();
    //console.log(json)
    //console.log(json.data);
    partyArr.parties = json.data;
    console.log(partyArr.parties);
  } catch (error) {
    console.log(error)
  }
}
//render the parties so that they go into the html and show up on page
const renderParties = () => {
  partyArr.parties.forEach( (party) => {
    const li = document.createElement('li');
    li.innerHTML = `${party.name}: ${party.date} at ${party.location} - ${party.description}`;
    partyList.appendChild(li);
  })
}
//use form to get the information and then add it to the ul/array
//i did this locally on the browser to not mess with other classmates on the API
const addParty = (event) => {
  event.preventDefault();
  const formData = new FormData(addPartyForm);
  const partyData = {
    name: formData.get('name'),
    date: formData.get('date'),
    time: formData.get('time'),
    location: formData.get('location'),
    description: formData.get('description')
  };
  
  partyArr.parties.push(partyData);
  renderParties();
  addPartyForm.reset(); 
}
//had to move this down from the top so that the addParty function would be able to use it.
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);