import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  const id = search.split("=")[1];
  console.log(id);
  return id;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    ).then((res) => res.json());
    return response;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById(
    "adventure-subtitle"
  ).innerHTML = `${adventure.subtitle}`;
  adventure.images.forEach((img) => {
    let div = document.createElement("div");
    //div.className = "activity-card-image";
    div.innerHTML = `<img class=" img-responsive activity-card-image" src="${img}"/>`;
    document.getElementById("photo-gallery").appendChild(div);
  });
  document.getElementById(
    "adventure-content"
  ).innerHTML = `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById(
    "photo-gallery"
  ).innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;

  images.forEach((ele, index) => {
    if (index === 0) {
      //let carousel = document.querySelector(".carousel-inner");
      let div = document.createElement("div");
      div.className = "carousel-item active";
      div.innerHTML = `<img class="img-responsive activity-card-image" src="${ele}">`;
      document.querySelector(".carousel-inner").appendChild(div);
    } else {
      //let carousel = document.querySelector(".carousel-inner");
      let div = document.createElement("div");
      div.className = "carousel-item";
      div.innerHTML = `<img class="img-responsive activity-card-image" src="${ele}">`;
      document.querySelector(".carousel-inner").appendChild(div);
    }
  });
  console.log(images);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    console.log(adventure);
    document.getElementById(
      "reservation-person-cost"
    ).textContent = `${adventure.costPerHead}`;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(adventure);
  console.log(persons);
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = `${totalCost}`;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit", function (e) {
    e.preventDefault(); // prevent the default behaviour
    let url = `${config.backendEndpoint}/reservations/new`;
    let data = $(this).serialize() + "&adventure=" + adventure.id;
    $.ajax({
      url: url,
      type: "post",
      data: data,
      success: function (response) {
        alert("Success!");
        window.location.reload();
      },
      error: function (response) {
        alert("Failed!");
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
