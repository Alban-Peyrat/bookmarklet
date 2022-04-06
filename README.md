# Bookmarklet

_Rappel : pour mettre des bookmarklets, ajouter un nouveau marque-page dans votre navigateur et renseigner les lignes de codes associées comme étant l'URL._

_Les codes sur cette page ne sont qu'un copier-coller du [fichier originel](https://github.com/Alban-Peyrat/bookmarklet/blob/main/bookmarklets.js) à un instant T.
Ce fichier reste la source principale pour consulter la dernière version d'un script._

## Alma

### Ajouter les codes statistiques (UB)

_Exclusif à l'Université de Bordeaux (ou en tout cas, développé exclusivement pour elle)._

Vous devez vous rendre sur votre exemplaire.
Le script renseignera la note statistique 1 et la note statistique 2 puis enregistrera les modifications.

Afin de choisir les notes, modifiez la valeur de `noteStat1` et / ou `noteStat2` en associant le code de 3 caractères se situant au début du code voulu (exemple : `U00` pour `A destination de la communauté universitaire`).
Si une alerte vous signalant que les codes statistiques n'ont pas pu être appliqués apparaît souvent, vous pouvez augmenter la valeur de `temps`.
Cette variable s'exprime en millisecondes (1 seconde est sa valeur par défaut donc).
Elle est utilisée si vous exécutez le script depuis une page autre que la page `Notes` d'une notice d'exemplaire et sert à attendre qu'Alma charge correctement la page voulue.
Si le problème a toujours lieu, le fonctionnement d'Alma a peut-être changé et je vous invite à revenir vers moi.

Pour les collègues de la BUSVS, vous trouverez [sous le code une liste des codes statistiques pouvant vous intéresser](#listes-des-codes-statistiques-busvs).

Le code (version du 06/04/2022) :

``` Javascript
javascript:(function(){
  /* La valeur des codes stats correspond aux 3 premiers caractères de la note */
  let noteStat1 = "U00";
  let noteStat2 = "FAB";
  let temps = 1000; /* in milliseconds */
  
  function addCodesStats(hasWaited){
    if ((hasWaited) && (document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1").length == 0)){
        alert("Les codes statistiques n'ont pas pu être appliqués car la page n'a pas totalement chargée.\nRelancez le script sur la page \"Notes\" de l'exemplaire ou attribuez les notes manuellement.");
    }else {
        document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1")[0].value = noteStat1;
        document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_2")[0].value = noteStat2;
        document.getElementById("PAGE_BUTTONS_cbuttonsave").click(); /* this saves and quits */
    }
  }

  try { /* Checks if this is the notes page */
    addCodesStats(false);
  } catch (e) { /* If it's not, goes on it and waits for the previously set time */
    document.getElementById("cresource_editornotes").click();
    let timeout = window.setTimeout(addCodesStats, temps, true);
  }
})();
```

#### Listes des codes statistiques (BUSVS)

Ci-dessous, la liste des codes statistiques susceptibles de vous intéresser :
* Note statistique 1 :
  * `U00` : A destination de la communauté universitaire ;
  * `UEM` : A usage de formation - manuel ;
* Note statistique 2 :
  * `FA0` : Médecine ;
  * `FAB` : Médecine et spécialités ;
  * `FB0` : Pharmacie ;
  * `FC0` : Odontologie ;

## Idref

Attention, ces scripts ne modifient pas la partie `Filtres` de l'interface, si vous souhaitez les utiliser, employez la procédure normale.

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

### Passer en recherche nom commun RAMEAU

Fonctionne sur n'importe quelle page d'IdRef tant que l'URL est `https://www.idref.fr/autorites.jsp`.
Commence une nouvelle recherche en exécutant le script `clearAll()` (ce que fait le bouton `Nouvelle recherche`), puis définit le tri par `De A à Z`.
Sélectionne ensuite `Nom commun` dans le type d'autorité voulue, puis le filtre `RAMEAU` dans `Type de notice`.
Enfin, passe le focus sur la zone de saisie dans la section `Termes de recherche`.

Le code (version du 06/04/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "subjectheading_t:#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("recordtype_z_Rameau").checked = true;
  document.getElementById("Text1").focus();
})();
```
