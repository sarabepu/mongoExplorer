const onOpen = (e) => {


  dbName = document.querySelector("#db-select").value;
  fetch(`/db/${dbName}`)
    .then(res => res.json())
    .then(displayCollections);
  e.preventDefault();
};

const displayCollections = (list) => {
  let rows = document.querySelector("#rows");
  rows.innerHTML = "";
  let databases = document.querySelector("#collections");
  databases.innerHTML = "";
  const form = document.createElement("form");
  form.id = "col-form";

  const collec = document.createElement("h2");
  collec.textContent = "Collections";
  form.appendChild(collec);

  const selectorOption = document.createElement("select");
  selectorOption.name = "collections";
  selectorOption.id = "col-selector";
  form.appendChild(selectorOption);

  const op= document.createElement("option");
  op.value="";
  op.textContent= "--Please choose an option--";
  selectorOption.appendChild(op);

  const button = document.createElement("button");
  button.className = "btn btn-outline-info";
  button.type = "submit";
  button.textContent = "Fetch";
  form.appendChild(button);


  list.forEach(col => {
    const option = document.createElement("option");

    option.value = col.name;
    option.textContent = col.name;
    selectorOption.appendChild(option);
  });

  databases.appendChild(form);


  const colSearch = document.querySelector("#col-form");
  // eslint-disable-next-line no-undef
  colSearch.addEventListener("submit", onFetch);

};


const dBSearch = document.querySelector("#formDB");
dBSearch.addEventListener("submit", onOpen);



let dbName = "";
