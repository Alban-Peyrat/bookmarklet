# Bookmarklet

_Rappel : pour mettre des bookmarklets, ajouter un nouveau marque-page dans votre navigateur et renseigner les lignes de codes associées comme étant l'URL._

_Les codes sur cette page ne sont qu'un copier-coller du [fichier originel](https://github.com/Alban-Peyrat/bookmarklet/blob/main/bookmarklets.js) à un instant T.
Ce fichier reste la source principale pour consulter la dernière version d'un script._

## Alma

### Ajouter les codes statistiques pour la médecine (UB)

_Exclusif à l'Université de Bordeaux (ou en tout cas, développé exclusivement pour elle)._

Vous devez vous rendre dans un premier temps sur l'onglet `Notes` de la page de votre exemplaire.
Le script renseignera la note statistique 1 comme `U00 A destination de la communauté universitaire` et la note statistique 2 comme `FAB : Médecine et spécialités`, puis enregistrera les modifications.

Le code (version du 30/03/2022) :

``` Javascript
javascript: (() => {
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1")[0].value = "U00";
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_2")[0].value = "FAB";
  document.getElementById("PAGE_BUTTONS_cbuttonsave").click()
})();
```

### Ajouter les codes statistiques pour l'odontologie (UB)

_Exclusif à l'Université de Bordeaux (ou en tout cas, développé exclusivement pour elle)._

Vous devez vous rendre dans un premier temps sur l'onglet `Notes` de la page de votre exemplaire.
Le script renseignera la note statistique 1 comme `U00 A destination de la communauté universitaire` et la note statistique 2 comme `FC0 : Odontologie`, puis enregistrera les modifications.

Le code (version du 30/03/2022) :

``` Javascript
javascript: (() => {
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1")[0].value = "U00";
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_2")[0].value = "FC0";
  document.getElementById("PAGE_BUTTONS_cbuttonsave").click()
})();
```

## Idref

### Passer en recherche nom de personne

Fonctionne sur n'importe quelle page d'IdRef tant que l'URL est `https://www.idref.fr/autorites.jsp`.
Commence une nouvelle recherche en exécutant le script `clearAll()` (ce que fait le bouton `Nouvelle recherche`), puis définit le tri par `De A à Z`.
Sélectionne ensuite `Nom de personne` dans le type d'autorité voulue.
Enfin, passe le focus sur la zone de saisie dans la section `Termes de recherche`.

Le code (version du 30/03/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "persname_t:#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("Text1").focus();
})();
```

### Passer en recherche experte nom de famille

Fonctionne sur n'importe quelle page d'IdRef tant que l'URL est `https://www.idref.fr/autorites.jsp`.
Commence une nouvelle recherche en exécutant le script `clearAll()` (ce que fait le bouton `Nouvelle recherche`), puis définit le tri par `De A à Z`.
Sélectionne ensuite `Expert` dans le type d'autorité voulue.
Enfin, passe le focus à la fin de la zone de saisie dans la section `Termes de recherche` en préremplissant le champ avec `nom_t:`.

Le code (version du 30/03/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  document.getElementById("Text1").value = "nom_t:";
  
  var list = document.getElementsByName("ComboIndex");
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("Text1").focus();
})();
```

### Passer en recherche experte nom de famille et prénom

Fonctionne sur n'importe quelle page d'IdRef tant que l'URL est `https://www.idref.fr/autorites.jsp`.
Commence une nouvelle recherche en exécutant le script `clearAll()` (ce que fait le bouton `Nouvelle recherche`), puis définit le tri par `De A à Z`.
Sélectionne ensuite `Expert` dans le type d'autorité voulue.
Enfin, passe le focus à la fin de la zone de saisie dans la section `Termes de recherche` en préremplissant le champ avec `nom_t: AND prenom_t:`.

Le code (version du 30/03/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  document.getElementById("Text1").value = "nom_t: AND prenom_t:";
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("Text1").focus();
})();
```
