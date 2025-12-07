import Papa from "papaparse";

// Ruta del CSV
const datasetURL = new URL("../data/datasetP.csv", import.meta.url).href;

export function loadPopulationData() {
  return new Promise((resolve, reject) => {
    Papa.parse(datasetURL, {
      download: true,
      header: true,
      delimiter: ";",
      dynamicTyping: true,

      complete: function (results) {
        const rows = results.data;

        console.log("CSV RAW:", rows);

        const countries = {};

        rows.forEach(row => {
          // --- VALIDACIÓN ROBUSTA ---
          if (!row || !row.pais || !row.anio || !row.poblacion) {
            return; // Ignorar filas vacías o incompletas
          }

          const country = String(row.pais).trim();
          const year = Number(row.anio);
          const pop = Number(row.poblacion);

          if (!countries[country]) {
            countries[country] = [];
          }

          countries[country].push({
            anio: year,
            poblacion: pop
          });
        });

        console.log("DATA CARGADA:", countries);

        // ============================
        //    MERCOSUR COMO TOTAL
        // ============================
        const paisesMercosur = ["Argentina", "Brasil", "Uruguay", "Paraguay"];

        const years = [...new Set(rows.map(r => Number(r.anio)))].filter(Boolean).sort();

        const mercosur = years.map(year => {
          const total = rows
            .filter(r => r && r.anio == year && paisesMercosur.includes(String(r.pais).trim()))
            .reduce((acc, r) => acc + Number(r.poblacion || 0), 0);

          return { anio: year, poblacion: total };
        });

        countries["MERCOSUR"] = mercosur;

        resolve(countries);
      },

      error: function (err) {
        console.error("Error al cargar CSV:", err);
        reject(err);
      }
    });
  });
}
