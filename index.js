// create two variables
// myLead should be assigned to an empty array
//inputEl should be assigned to the input field
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("deleted")
console.log(deleteBtn)
const inputBtn = document.getElementById("input-btn")
let listEl = document.getElementById("reveal")
let myLead = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
// Refector the function so that it takes a parameter, leads, that it uses
// instead of the global myLeads variable. Remember to update all invocations
// of the function as well.


if(leadsFromLocalStorage) {
  myLead = leadsFromLocalStorage
  render(myLead)
}
function render(leads) {


  let listItems = ""
  for(let i=0; i<leads.length; i++) {
    // Replace .textContent with .innerHTML and use <li> tags
  // THIS IS INNERHTML WHERE YOU WRITE A BIG HTML STRING AND THEN +=CONCANTNATE SO THE DOM NODES ARE REDUILT AND DESTROYED EVERYTIME.
   // 2. Add the item to the listItems variable instead of the ulEl.innerHTML
   //listItems += "<li><a target='_blank' href='"+ myLead[i] +"'>" + myLead[i] + "</a></li>"
   listItems += `<div>
                   <a target='_blank' href=' ${leads[i].url}' >${leads[i].title}</a>
                   <button class="delete-btn" data-url="${leads[i].url}">Delete</button>
                    <button class="copy-btn" data-url="${leads[i].url}">Copy</button>
                   </div>`
   console.log(listItems)



  //THIS IS ANOTHER METHOD CALLED CREATEELEMENT WHERE BY YOU TELL HTML TO CREATE A HTML ELEMENT THAT ISNT VISIBLE BUT RUNNING IN THE MEMORY OF THE DOM NODE
  // we create the li element first as ABOVE
  // set text content
  //APPend to the ul
    //const li = document.createElement("li")
    //li.textContent = myLead[i]
    //listEl.appendChild(li)


  }
   listEl.innerHTML = listItems

   const deleted = document.querySelectorAll(".delete-btn")

   deleted.forEach(function(button) {
    button.addEventListener("click", function () {
      const data = button.dataset.url
      deleteHistory(data)
    })
   })

   const copied = document.querySelectorAll(".copy-btn")

   copied.forEach(function(button) {
    button.addEventListener("click", function() {
      const data = button.dataset.url
      copyButton(data,button)
    })
   })

}

function copyButton(url,copyBtn) {
  navigator.clipboard.writeText(url)

  copyBtn.textContent= "copied"

  setTimeout(function() {
    copyBtn.textContent="copy"
  },2000)

}

function deleteHistory(url) {

    myLead = myLead.filter(function(lead) {
        return lead.url !== url
    })

    localStorage.setItem("myLead", JSON.stringify(myLead))

    render(myLead)
}



 // 1. Create a variable, listItems, to hold all the HTML for the list items
// Assign it to an empty string to begin with

//Make the delete button works
// 1. Store the delete button in a deleteBtn variable
// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLead, and the DOM

deleteBtn.addEventListener("click", function() {
    console.log("double clicked!")
    localStorage.clear()
    myLead = []
    listEl.innerHTML = ""
    render(myLead)
})
// save tab button
// 1. Grab the SAVE TAB button and store it in a tabBtn variable
let tabBtn = document.getElementById("tab-btn")
// 2. Listen for clicks on tabBtn. Log Per's LinkedIn URL to the console


tabBtn.addEventListener("click", function () {
  //use chrome api to get the tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//  })
  chrome.tabs.query({currentWindow:true}, function (tabs) {
    if(tabs.length===0) {
      return;
    }
    for(let i=0; i<tabs.length; i++) {
      let duplicate = myLead.some(function(lead) {
        return lead.url===tabs[i].url
      })

      if(!duplicate) {
myLead.push({url: tabs[i].url, title: tabs[i].title})
      }

    }
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)

  })





})

//Checking if button works

inputBtn.addEventListener("click", function () {

  //myLead.push("www.awesomelead.com")
   // Push the value from the inputEl into the myLeads array
    // instead of the hard-coded "www.awesomeleads.com" value
    // Google -> "get value from input field javascript"


//using truthy and falsy
  //if(leadsFromLocalStorage) {
 // myLead = leadsFromLocalStorage
  // this is true only if there was a stored key and value in localStorage
  // you can choose use the renderLeads function here but chose to render to place it after setItem so that if you had something saved in the localStorage it gets added into the array then when you push from the input you now have two varaibles which are then saved again to local storage then the for loop goes through the array then adds or CONCANTNATEs to the value stored there then renders in innerHTML
  //} else {
  //myLead = []
  //falsy if there wasn't a value stored to which you get a blank array
 // }

 const query = inputEl.value
 if(query==="") {
  return;
 }

 const duplicate = myLead.some(function(lead) {
  return lead.url===query
 })

 if(!duplicate) {
  myLead.push({
      url: query,
      title: query
    })
    inputEl.value = ""
    // Save the myLeads array to localStorage
    // PS: remember JSON.stringify()
    localStorage.setItem("myLead", JSON.stringify(myLead))
 }

    // Get the leads from the localStorage
// Store it in a variable, leadsFromLocalStorage
// Log out the variable
//let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))

//let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
console.log(leadsFromLocalStorage)


    render(myLead)

    // To verify that it works:
    console.log( localStorage.getItem("myLead") )
    //Call out the renderleads() function
})


//wrap the code below in a renderLeads() function
