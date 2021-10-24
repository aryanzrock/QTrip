import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(
      `${config.backendEndpoint}/reservations/`
    ).then((res) => res.json());
    return response;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  console.log(reservations);
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  reservations.forEach((ele) => {
    // to get date in required format
    let d = ele.date;
    let date = new Date(d);
    let day = date.getDate();
    let month = date.getMonth() + 1; // it reutrns month from 0 t0 11 0 for january
    let year = date.getFullYear();
    let finalDate = `${day}/${month}/${year}`;

    //to get time in required format
    let t = ele.time;
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let bookingDate = new Date(t);
    let bookingDay = bookingDate.getUTCDate();
    let bookingMonth = months[bookingDate.getUTCMonth()];
    let bookingYear = bookingDate.getUTCFullYear();
    let finalBookingDate = `${bookingDay} ${bookingMonth} ${bookingYear}`;
    let bookingTime = new Date(t).toLocaleTimeString().split(" ");
    let finalBookingTime = `${bookingTime[0]} pm`;
    let finalTime = `${finalBookingDate}, ${finalBookingTime}`;

    let tr = document.createElement("tr");
    //tr.className ="table-warning"
    tr.innerHTML = `<td scope="col">${ele.id}</td> 
    <td scope="col">${ele.name}</td> 
    <td scope="col">${ele.adventureName}</td>
    <td scope="col">${ele.person}</td> 
    <td scope="col">${finalDate}</td>
    <td scope="col">${ele.price}</td>
    <td scope="col">${finalTime}</td>
    <td scope="col"> <button type="button" id = "${ele.id}" class= "reservation-visit-button"><a href="/pages/adventures/detail/?adventure=${ele.adventure}"</a>Visit Adventure</button></td>`;
    document.getElementById("reservation-table").appendChild(tr);
  });
}

export { fetchReservations, addReservationToTable };
