import { useEffect, useState } from "react";

const CountryCard = ({ name, flag, altText }) => {
  return (
    <div
      className="countryCard"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        border: "1px solid black",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={altText}
        style={{
          height: "100px",
          width: "100px",
        }}
      />
      <h2>{name}</h2>
    </div>
  );
};

const URL_API = "https://restcountries.com/v3.1/all";

function Countires() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_API);
        const jsonRes = await response.json();
        console.log(jsonRes);
        setCountries(jsonRes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              name={country.name.common}
              flag={country.flags.png}
              altText={country.name.common}
            />
          ))
        ) : (
          <p>No countries match your search</p>
        )}
      </div>
    </div>
  );
}

export default Countires;
