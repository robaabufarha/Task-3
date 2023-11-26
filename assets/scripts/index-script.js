let allData=[];
var regionFilter;
var filteredData;
var selectedRegion = "Filter by Region";
var savedRegion =(localStorage.getItem('selectedRegion'));
  


async function getInformation(){ 
  try{
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
     allData = await response.json();
    filteredData = allData;
    console.log(allData);
    if (savedRegion== "no")
    {
      displayData(allData);
    }
    else
      filterCountries();        
  }
  catch (error) {
    console.error("Error fetching data:", error.message);
}

}

getInformation();

async function displayData(data){
  let countryinfo = document.getElementById("country-info");

  console.log(countryinfo);
    let info = "";
    data.map((country) => 
    {
        info+= `
        <div class="col col-12" onclick = "saveCountryName('${country.name.common}')">
                    <div class="card">
                        <a href="Details2.html" target="_blank">
                        <img src=${country.flags.svg}
                         class="card-img-top"
                          alt=${country.flags.alt}
                          >
                         </a>
                        <div class="card-body">
                          <h4 class="card-title text-truncate">${country.name.common}</h4>
                          <div class="card-text"> 
                            <div class="text-truncate"> <b>Pobulation:</b> ${country.population}</div>
                              <div class="text-truncate"> <b>Reagion:</b> ${country.region}</div>
                                <div class="text-truncate"> <b>Capital:</b> ${country.capital}</div>
                          </div>
                        </div>
                        
                      </div>
                </div>
        `
    }
    );
    countryinfo.innerHTML = info;

}

async function filterCountries(){
 regionFilter = document.getElementById('region-filter');

  selectedRegion = regionFilter.value.toLowerCase();
  storeSelection(selectedRegion);
 
 

 const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
 if(selectedRegion =="no")
{
  const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
       if (!response.ok) {
        if (response.status === 404) {
          console.log(`No country found with the name ${searchTerm}`);
        } else {
         throw new Error(`HTTP error! Status: ${response.status}`);
        }}
          const data1 = await response.json();
          displayData(data1);
          storeSelection(selectedRegion);
  
}

  
 else {
   filteredData = allData.filter(country => {
    const countryRegion = country.region.toLowerCase();
    const countryName = country.name.common.toLowerCase();
    

    return  (selectedRegion === ' ' || countryRegion === selectedRegion && (countryName.includes(searchTerm)));
});
storeSelection(selectedRegion);
displayData(filteredData);
}}
document.getElementById('search-input').addEventListener('input', filterCountries);
filterCountries();



function storeSelection(selectedRegion) {
  localStorage.setItem('selectedRegion', selectedRegion);
}




function darkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}
function saveCountryName(name){
  console.log(name);
  localStorage.setItem("countryName",name)


}
