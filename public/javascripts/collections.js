
const insertRow = (e) => {
  let insertAtr = document.querySelectorAll(".ins-atr");
  let body = {};
  insertAtr.forEach((atr) => {
    let atrName = atr.id.split("-")[1];
    let value = atr.value;
    if (value) {
      body[atrName] = value;
    }

  });

  postData(`/db/${dbName}/col/${colName}`, body)
    .then(displayRows);



};


const displayRows = (rows) => {
  if (rows) {
    let colNames = "<th scope=\"col\"></th>",
      rowNames = "",
      rowsHTML = document.querySelector("#rows"),
      first = rows[0],
      insertData = "";

    let keys = Object.keys(first).filter((key) => key != "_id");
    keys.forEach(key => {
      colNames += `<th scope=\"col\">${key}</th>`;
      let atr = "atr-" + key;
      insertData += `<td><input type="text" class="form-control ins-atr" id=${atr}></input></td>`;

    });
    let i = 1;
    rows.forEach(row => {
      rowNames += "<tr>";

      let values = `<th scope="row">${i}</th>`;


      keys.forEach(key => {
        values += `<td>${row[key]}</td>`;

      });
      i++;
      rowNames += values;
      rowNames += "</tr>";
    });
    let insertCol = ` <tr>
            <th scope="row">
            <button class="btn btn-outline-info" type="submit" id="add-button">add</button></th>
            ${insertData}
          </tr>`;



    let tabla = `
    <h2>Documents</h2>
          <table class="table">
          <thead>
            <tr>
              ${colNames}
            </tr>
          </thead>
          <tbody>
          ${insertCol}
            ${rowNames}
          </tbody>
        </table>`;
    rowsHTML.innerHTML = tabla;

    const rowInsert = document.querySelector("#add-button");
    rowInsert.addEventListener("click", insertRow);
  }

};
let colName = "";
const onFetch = (e) => {

  e.preventDefault();
  colName = document.querySelector("#col-selector").value;
  docs= document.querySelector("#number-docs").value;
  fetch(`/db/${dbName}/col/${colName}/${docs}`)
    .then(res => res.json())
    .then(displayRows);

};



async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};