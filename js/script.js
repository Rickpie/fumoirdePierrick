document.addEventListener("DOMContentLoaded", function () {
  // Détecte le dossier racine du projet sur GitHub Pages ou en local
  let paths = window.location.pathname.split("/").filter((path) => path !== "");
  let repoName =
    paths.length > 0 && window.location.hostname.includes("github.io")
      ? `/${paths[0]}/`
      : "/";

  // Charger le header
  fetch(`${repoName}header/header.html`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // Une fois le header chargé, corriger les liens
      let navLinks = document.querySelectorAll(
        "#header .navbar-links a, #header .navbar-brand"
      );
      navLinks.forEach((link) => {
        let href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#")) {
          link.setAttribute("href", repoName + href);
        }
      });

      // Corriger l'image de la bannière si nécessaire
      let bannerImg = document.querySelector("#header #banniere img");
      if (bannerImg) {
        let src = bannerImg.getAttribute("src");
        if (src && !src.startsWith("http")) {
          bannerImg.setAttribute("src", repoName + src);
        }
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du header:", error);
    });

  // Charger le footer
  fetch(`${repoName}footer/footer.html`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du footer:", error);
    });
});
