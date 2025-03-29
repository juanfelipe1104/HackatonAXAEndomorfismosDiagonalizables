const key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs";

async function consulta()
{
  nombre = sessionStorage.getItem("municipio");
  id = sessionStorage.getItem("id");

  document.getElementById("titulo").innerHTML = "Información de " + nombre + ":" + id

  url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/" + id;

  const result = await fetch(`${url}?api_key=${key}`);

  data = await result.json();

  console.log(data.datos);
}
