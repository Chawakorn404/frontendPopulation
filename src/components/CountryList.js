import React, { useEffect, useState } from "react";

// Assuming sec1 and sec2 are provided as props or as static data.
const sec1 = {
    "Asia": [
    "Hong Kong",
    "Taiwan",
    "Japan",
    "East Timor",
    "Macao",
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Georgia",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
    "Russia"
   
  ],
  "Europe": [
    "Czech Republic",
    "Vatican City",
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
     "Czechia",
    "Faroe Islands",
    "Gibraltar",
    "Guernsey",
    "Russia"
  ],
  "Africa": [
    "Western Sahara",
    "Anguilla",
    "Cote d'Ivoire",
    "Democratic Republic of Congo",
    "Eritrea",
    "Cape Verde",
    "Falkland Islands",
    "Guadeloupe",
    "Reunion",
    "Sao Tome and Principe",

    "Ivory Coast",
    "Congo (DRC)",
    "Cabo Verde",
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Congo (DRC)",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe"
  ],
  "Oceania": [
    "New Caledonia",
    "Tokelau",
    "Wallis and Futuna",
    "Micronesia",
    "Australia",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia",
    "Nauru",
    "New Zealand",
    "Palau",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
    "Niue"
  ],
  "Americas": [
    "British Virgin Islands",
    "Bonaire Sint Eustatius and Saba",
    "American Samoa",
    "Aruba",
    "Bermuda",
    "Cayman Islands",
    "Cook Islands",
    "Curacao",
    "French Guiana",
    "French Polynesia",
    "Greenland",
    "Guam",
    "Isle of Man",
    "Jersey",
    "Martinique",
    "Mayotte",
    "Micronesia (country)",
    "Montserrat",
    "Northern America (UN)",
    "Northern Mariana Islands",
    "Puerto Rico",
    "Saint Barthelemy",
    "Saint Helena",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Sint Maarten (Dutch part)",
    "United States Virgin Islands",
    "Turks and Caicos Islands",
    "Antigua and Barbuda",
    "Argentina",
    "Bahamas",
    "Barbados",
    "Belize",
    "Bolivia",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Grenada",
    "Guatemala",
    "Guyana",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Paraguay",
    "Peru",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Suriname",
    "Trinidad and Tobago",
    "United States",
    "Uruguay",
    "Venezuela"
  ]
};

const sec2 = [
    {
        "Country name": "Afghanistan"
    },
    {
        "Country name": "Africa (UN)"
    },
    {
        "Country name": "Albania"
    },
    {
        "Country name": "Algeria"
    },
    {
        "Country name": "American Samoa"
    },
    {
        "Country name": "Andorra"
    },
    {
        "Country name": "Angola"
    },
    {
        "Country name": "Anguilla"
    },
    {
        "Country name": "Antigua and Barbuda"
    },
    {
        "Country name": "Argentina"
    },
    {
        "Country name": "Armenia"
    },
    {
        "Country name": "Aruba"
    },
    {
        "Country name": "Asia (UN)"
    },
    {
        "Country name": "Australia"
    },
    {
        "Country name": "Austria"
    },
    {
        "Country name": "Azerbaijan"
    },
    {
        "Country name": "Bahamas"
    },
    {
        "Country name": "Bahrain"
    },
    {
        "Country name": "Bangladesh"
    },
    {
        "Country name": "Barbados"
    },
    {
        "Country name": "Belarus"
    },
    {
        "Country name": "Belgium"
    },
    {
        "Country name": "Belize"
    },
    {
        "Country name": "Benin"
    },
    {
        "Country name": "Bermuda"
    },
    {
        "Country name": "Bhutan"
    },
    {
        "Country name": "Bolivia"
    },
    {
        "Country name": "Bonaire Sint Eustatius and Saba"
    },
    {
        "Country name": "Bosnia and Herzegovina"
    },
    {
        "Country name": "Botswana"
    },
    {
        "Country name": "Brazil"
    },
    {
        "Country name": "British Virgin Islands"
    },
    {
        "Country name": "Brunei"
    },
    {
        "Country name": "Bulgaria"
    },
    {
        "Country name": "Burkina Faso"
    },
    {
        "Country name": "Burundi"
    },
    {
        "Country name": "Cambodia"
    },
    {
        "Country name": "Cameroon"
    },
    {
        "Country name": "Canada"
    },
    {
        "Country name": "Cape Verde"
    },
    {
        "Country name": "Cayman Islands"
    },
    {
        "Country name": "Central African Republic"
    },
    {
        "Country name": "Chad"
    },
    {
        "Country name": "Chile"
    },
    {
        "Country name": "China"
    },
    {
        "Country name": "Colombia"
    },
    {
        "Country name": "Comoros"
    },
    {
        "Country name": "Congo"
    },
    {
        "Country name": "Cook Islands"
    },
    {
        "Country name": "Costa Rica"
    },
    {
        "Country name": "Cote d'Ivoire"
    },
    {
        "Country name": "Croatia"
    },
    {
        "Country name": "Cuba"
    },
    {
        "Country name": "Curacao"
    },
    {
        "Country name": "Cyprus"
    },
    {
        "Country name": "Czechia"
    },
    {
        "Country name": "Democratic Republic of Congo"
    },
    {
        "Country name": "Denmark"
    },
    {
        "Country name": "Djibouti"
    },
    {
        "Country name": "Dominica"
    },
    {
        "Country name": "Dominican Republic"
    },
    {
        "Country name": "East Timor"
    },
    {
        "Country name": "Ecuador"
    },
    {
        "Country name": "Egypt"
    },
    {
        "Country name": "El Salvador"
    },
    {
        "Country name": "Equatorial Guinea"
    },
    {
        "Country name": "Eritrea"
    },
    {
        "Country name": "Estonia"
    },
    {
        "Country name": "Eswatini"
    },
    {
        "Country name": "Ethiopia"
    },
    {
        "Country name": "Europe (UN)"
    },
    {
        "Country name": "Falkland Islands"
    },
    {
        "Country name": "Faroe Islands"
    },
    {
        "Country name": "Fiji"
    },
    {
        "Country name": "Finland"
    },
    {
        "Country name": "France"
    },
    {
        "Country name": "French Guiana"
    },
    {
        "Country name": "French Polynesia"
    },
    {
        "Country name": "Gabon"
    },
    {
        "Country name": "Gambia"
    },
    {
        "Country name": "Georgia"
    },
    {
        "Country name": "Germany"
    },
    {
        "Country name": "Ghana"
    },
    {
        "Country name": "Gibraltar"
    },
    {
        "Country name": "Greece"
    },
    {
        "Country name": "Greenland"
    },
    {
        "Country name": "Grenada"
    },
    {
        "Country name": "Guadeloupe"
    },
    {
        "Country name": "Guam"
    },
    {
        "Country name": "Guatemala"
    },
    {
        "Country name": "Guernsey"
    },
    {
        "Country name": "Guinea"
    },
    {
        "Country name": "Guinea-Bissau"
    },
    {
        "Country name": "Guyana"
    },
    {
        "Country name": "Haiti"
    },
    {
        "Country name": "High-income countries"
    },
    {
        "Country name": "Honduras"
    },
    {
        "Country name": "Hong Kong"
    },
    {
        "Country name": "Hungary"
    },
    {
        "Country name": "Iceland"
    },
    {
        "Country name": "India"
    },
    {
        "Country name": "Indonesia"
    },
    {
        "Country name": "Iran"
    },
    {
        "Country name": "Iraq"
    },
    {
        "Country name": "Ireland"
    },
    {
        "Country name": "Isle of Man"
    },
    {
        "Country name": "Israel"
    },
    {
        "Country name": "Italy"
    },
    {
        "Country name": "Jamaica"
    },
    {
        "Country name": "Japan"
    },
    {
        "Country name": "Jersey"
    },
    {
        "Country name": "Jordan"
    },
    {
        "Country name": "Kazakhstan"
    },
    {
        "Country name": "Kenya"
    },
    {
        "Country name": "Kiribati"
    },
    {
        "Country name": "Kosovo"
    },
    {
        "Country name": "Kuwait"
    },
    {
        "Country name": "Kyrgyzstan"
    },
    {
        "Country name": "Land-locked developing countries (LLDC)"
    },
    {
        "Country name": "Laos"
    },
    {
        "Country name": "Latin America and the Caribbean (UN)"
    },
    {
        "Country name": "Latvia"
    },
    {
        "Country name": "Least developed countries"
    },
    {
        "Country name": "Lebanon"
    },
    {
        "Country name": "Lesotho"
    },
    {
        "Country name": "Less developed regions"
    },
    {
        "Country name": "Less developed regions, excluding China"
    },
    {
        "Country name": "Less developed regions, excluding least developed countries"
    },
    {
        "Country name": "Liberia"
    },
    {
        "Country name": "Libya"
    },
    {
        "Country name": "Liechtenstein"
    },
    {
        "Country name": "Lithuania"
    },
    {
        "Country name": "Low-income countries"
    },
    {
        "Country name": "Lower-middle-income countries"
    },
    {
        "Country name": "Luxembourg"
    },
    {
        "Country name": "Macao"
    },
    {
        "Country name": "Madagascar"
    },
    {
        "Country name": "Malawi"
    },
    {
        "Country name": "Malaysia"
    },
    {
        "Country name": "Maldives"
    },
    {
        "Country name": "Mali"
    },
    {
        "Country name": "Malta"
    },
    {
        "Country name": "Marshall Islands"
    },
    {
        "Country name": "Martinique"
    },
    {
        "Country name": "Mauritania"
    },
    {
        "Country name": "Mauritius"
    },
    {
        "Country name": "Mayotte"
    },
    {
        "Country name": "Mexico"
    },
    {
        "Country name": "Micronesia (country)"
    },
    {
        "Country name": "Moldova"
    },
    {
        "Country name": "Monaco"
    },
    {
        "Country name": "Mongolia"
    },
    {
        "Country name": "Montenegro"
    },
    {
        "Country name": "Montserrat"
    },
    {
        "Country name": "More developed regions"
    },
    {
        "Country name": "Morocco"
    },
    {
        "Country name": "Mozambique"
    },
    {
        "Country name": "Myanmar"
    },
    {
        "Country name": "Namibia"
    },
    {
        "Country name": "Nauru"
    },
    {
        "Country name": "Nepal"
    },
    {
        "Country name": "Netherlands"
    },
    {
        "Country name": "New Caledonia"
    },
    {
        "Country name": "New Zealand"
    },
    {
        "Country name": "Nicaragua"
    },
    {
        "Country name": "Niger"
    },
    {
        "Country name": "Nigeria"
    },
    {
        "Country name": "Niue"
    },
    {
        "Country name": "North Korea"
    },
    {
        "Country name": "North Macedonia"
    },
    {
        "Country name": "Northern America (UN)"
    },
    {
        "Country name": "Northern Mariana Islands"
    },
    {
        "Country name": "Norway"
    },
    {
        "Country name": "Oceania (UN)"
    },
    {
        "Country name": "Oman"
    },
    {
        "Country name": "Pakistan"
    },
    {
        "Country name": "Palau"
    },
    {
        "Country name": "Palestine"
    },
    {
        "Country name": "Panama"
    },
    {
        "Country name": "Papua New Guinea"
    },
    {
        "Country name": "Paraguay"
    },
    {
        "Country name": "Peru"
    },
    {
        "Country name": "Philippines"
    },
    {
        "Country name": "Poland"
    },
    {
        "Country name": "Portugal"
    },
    {
        "Country name": "Puerto Rico"
    },
    {
        "Country name": "Qatar"
    },
    {
        "Country name": "Reunion"
    },
    {
        "Country name": "Romania"
    },
    {
        "Country name": "Russia"
    },
    {
        "Country name": "Rwanda"
    },
    {
        "Country name": "Saint Barthelemy"
    },
    {
        "Country name": "Saint Helena"
    },
    {
        "Country name": "Saint Kitts and Nevis"
    },
    {
        "Country name": "Saint Lucia"
    },
    {
        "Country name": "Saint Martin (French part)"
    },
    {
        "Country name": "Saint Pierre and Miquelon"
    },
    {
        "Country name": "Saint Vincent and the Grenadines"
    },
    {
        "Country name": "Samoa"
    },
    {
        "Country name": "San Marino"
    },
    {
        "Country name": "Sao Tome and Principe"
    },
    {
        "Country name": "Saudi Arabia"
    },
    {
        "Country name": "Senegal"
    },
    {
        "Country name": "Serbia"
    },
    {
        "Country name": "Seychelles"
    },
    {
        "Country name": "Sierra Leone"
    },
    {
        "Country name": "Singapore"
    },
    {
        "Country name": "Sint Maarten (Dutch part)"
    },
    {
        "Country name": "Slovakia"
    },
    {
        "Country name": "Slovenia"
    },
    {
        "Country name": "Small island developing states (SIDS)"
    },
    {
        "Country name": "Solomon Islands"
    },
    {
        "Country name": "Somalia"
    },
    {
        "Country name": "South Africa"
    },
    {
        "Country name": "South Korea"
    },
    {
        "Country name": "South Sudan"
    },
    {
        "Country name": "Spain"
    },
    {
        "Country name": "Sri Lanka"
    },
    {
        "Country name": "Sudan"
    },
    {
        "Country name": "Suriname"
    },
    {
        "Country name": "Sweden"
    },
    {
        "Country name": "Switzerland"
    },
    {
        "Country name": "Syria"
    },
    {
        "Country name": "Taiwan"
    },
    {
        "Country name": "Tajikistan"
    },
    {
        "Country name": "Tanzania"
    },
    {
        "Country name": "Thailand"
    },
    {
        "Country name": "Togo"
    },
    {
        "Country name": "Tokelau"
    },
    {
        "Country name": "Tonga"
    },
    {
        "Country name": "Trinidad and Tobago"
    },
    {
        "Country name": "Tunisia"
    },
    {
        "Country name": "Turkey"
    },
    {
        "Country name": "Turkmenistan"
    },
    {
        "Country name": "Turks and Caicos Islands"
    },
    {
        "Country name": "Tuvalu"
    },
    {
        "Country name": "Uganda"
    },
    {
        "Country name": "Ukraine"
    },
    {
        "Country name": "United Arab Emirates"
    },
    {
        "Country name": "United Kingdom"
    },
    {
        "Country name": "United States"
    },
    {
        "Country name": "United States Virgin Islands"
    },
    {
        "Country name": "Upper-middle-income countries"
    },
    {
        "Country name": "Uruguay"
    },
    {
        "Country name": "Uzbekistan"
    },
    {
        "Country name": "Vanuatu"
    },
    {
        "Country name": "Venezuela"
    },
    {
        "Country name": "Vietnam"
    },
    {
        "Country name": "Wallis and Futuna"
    },
    {
        "Country name": "Western Sahara"
    },
    {
        "Country name": "Yemen"
    },
    {
        "Country name": "Zambia"
    },
    {
        "Country name": "Zimbabwe"
    }
];

// Flatten sec1 into a single array of country names
const sec1Countries = Object.values(sec1).flat();

// Extract country names from sec2
const sec2Countries = sec2.map(country => country["Country name"]);

// Find countries in sec1 that are not in sec2
const countriesInSec1NotInSec2 = sec1Countries.filter(country => !sec2Countries.includes(country));

// Find countries in sec2 that are not in sec1
const countriesInSec2NotInSec1 = sec2Countries.filter(country => !sec1Countries.includes(country));

console.log("Countries in sec1 but not in sec2:", countriesInSec1NotInSec2);
console.log("Countries in sec2 but not in sec1:", countriesInSec2NotInSec1);


const CountryComparison = () => {
    const [matches, setMatches] = useState([]);
  
    useEffect(() => {
      // Flatten sec2 into a set of country names for easier lookup
      const sec2CountryNames = new Set(sec2.map(item => item["Country name"]));
  
      // Compare countries from sec1 with sec2
      const matchedCountries = Object.entries(sec1).reduce((acc, [region, countries]) => {
        const matched = countries.filter(country => sec2CountryNames.has(country));
        if (matched.length > 0) {
          acc.push({ region, countries: matched });
        }
        return acc;
      }, []);
  
      setMatches(matchedCountries);
    }, []);
  
    return (
      <div>
        <h1>Country Matches</h1>
        {matches.length > 0 ? (
          matches.map(({ region, countries }) => (
            <div key={region}>
              <h2>{region}</h2>
              <ul>
                {countries.map(country => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
    );
  };
  
  export default CountryComparison;
