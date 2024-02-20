<template>
    <a>Funtziona</a>
    <div></div>
</template>
<script>
const zutabeak = [
  {
    nombre: "Diluc",
    elemento: "Pyro",
    arma: "Claymore",
    vision: "Lobo",
    rareza: 5
  },
  {
    nombre: "Jean",
    elemento: "Anemo",
    arma: "Espada",
    vision: "León",
    rareza: 5
  },
  {
    nombre: "Mona",
    elemento: "Hydro",
    arma: "Catalizador",
    vision: "Balla",
    rareza: 5
  },
  {
    nombre: "Keqing",
    elemento: "Electro",
    arma: "Espada",
    vision: "Destello",
    rareza: 5
  },
  {
    nombre: "Zhongli",
    elemento: "Geo",
    arma: "Polearm",
    vision: "Diamante",
    rareza: 5
  },
  // Puedes agregar más personajes aquí según tus necesidades
];
  const zutabeakToShow = Object.keys(zutabeak[0]);
  const lerroakToShow = Object.values(zutabeak[0]);
  console.log(zutabeakToShow);
  console.log(lerroakToShow);
//   alert([zutabeak[0][zutabeakToShow[0]]])
</script>