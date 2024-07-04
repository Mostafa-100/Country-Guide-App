const countryBtn = document.getElementById("country-btn");
const countryName = document.getElementById("country-name");
const inputWrapper = document.getElementById("input-wrapper");

const countryBox = document.getElementById("country-box");

async function getCountry(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const country = await response.json();

    return country;
}

countryBtn.onclick = async function () {
    const country = await getCountry(countryName.value);
    console.log(country)

    if (countryName.value.trim().length == 0) {
        if (!countryName.classList.contains("is-invalid")) {
            countryName.classList.add("is-invalid");
            inputWrapper.innerHTML += "<div class='invalid-feedback'>Please choose a country name.</div>";
        }
    } else {
        try {
            const country = await getCountry(countryName.value);
            const html = `
            <div class="d-flex align-items-center flex-column pt-4">
                <img src="${country[0].flags.png ?? country.flags.svg ?? ''}" style="width: 100px">
                <h5>${country[0].name.common}</h5>
            </div>
            <div>
                <p><b>Capital:</b> ${country[0].capital[0]}</p>
                <p><b>Continent:</b> ${country[0].continents[0]}</p>
                <p><b>Population:</b> ${country[0].population.toLocaleString()}</p>
                <p><b>Currency:</b> ${Object.values(country[0].currencies)[0].name}</p>
                <p><b>Common Languages:</b> ${Object.values(country[0].languages).join(" - ")}</p>
            </div>`;

            countryBox.innerHTML = html;
        } catch (e) {
            countryBox.innerHTML = `<p class="mt-4 text-center text-danger">This country doesnt exist</p>`;
        }
    }
}