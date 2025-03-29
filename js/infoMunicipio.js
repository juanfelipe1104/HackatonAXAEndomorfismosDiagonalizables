const key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhYmFyYWZhQGdtYWlsLmNvbSIsImp0aSI6ImIwMWEzMDk1LTBmZmQtNDk3NC1hNDk1LTgyNmQ4N2Y1NTRmMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjQyMzc3LCJ1c2VySWQiOiJiMDFhMzA5NS0wZmZkLTQ5NzQtYTQ5NS04MjZkODdmNTU0ZjMiLCJyb2xlIjoiIn0.5nNTwVQaDRyTJTJg-n1Giuvmw8rUQF38Qb_KmPwJkzs";
const key_llama = "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";
const modelo_llama = 'llama3-8b-8192';

async function consulta()
{
  nombre = sessionStorage.getItem("municipio");
  id = sessionStorage.getItem("id");

  document.getElementById("titulo").innerHTML = "Información de " + nombre + ":"

  url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/" + id;

  result = await fetch(`${url}?api_key=${key}`);

  data = await result.json();
  console.log(data.datos);

  if(data.descripcion == "exito")
  {
    result = await fetch(data.datos)

    data = await result.json();

    result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key_llama}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelo_llama,
        messages: [
          {
            role: "system",
            content: "Eres 'AXA Asistente', el chatbot oficial de AXA Seguros. Tu rol es:\
					  1. Responder consultas sobre productos de seguros (auto, hogar, vida, salud)\
					  2. Explicar coberturas, exclusiones y procesos de siniestros\
					  3. Proporcionar información general sin dar asesoramiento personalizado\
					  4. Usar un tono empático pero profesional\
					  \
					  Normas estrictas:\
					  - Nunca inventes información sobre precios o coberturas específicas\
					  - Para casos complejos, deriva a atención al cliente: atencion.clientes@axa.es - 900 909 014\
					  - Usa ejemplos claros cuando expliques conceptos\
					  - Destaca los valores de AXA: el cliente es lo primero, integridad, valentia y unidad\
					  \
					  Formato preferido:\
					  [Respuesta estructurada usa puntos si es complejo]\
					  [Máximo 4 párrafos]\
					  [Recomendación de acción si aplica]"

          },
          {
            role: "user",
            content: "Lee este JSON que te voy a pasar al final del prompt y, en base al historial \
            de este municipio, dame una evaluación de los posibles desastres naturales graves (si hay alguno)\
            y decirme los seguros que recomiendas contratar si vives en este municipio. \
            No menciones nada de un JSON en la respuesta, es para los usuarios. No me des las gracias por compartir algo, yo soy un usuario que está consultando los datos. JSON: " + JSON.stringify(data)
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    data = await result.json();
    if (data.choices && data.choices[0]) 
    {
      document.getElementById("resultado").innerHTML = data.choices[0].message.content;
    }
    
  }

  else
  {
    document.getElementById("resultado").innerHTML = "Ha habido un error.";
  }

  

  console.log(data.datos);
}
