# Bookmarklet

[![Active Development](https://img.shields.io/badge/Maintenance%20Level-Actively%20Developed-brightgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)

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

## ArchiRès

### Rechercher un biblionumber (Bokeh, Koha, Omeka-S)

Permet de rechercher par biblionumber sur Bokeh, Koha ou Omeka-S, en étant exécuter depuis une page de la base voulue.
Pour Bokeh, si besoin de rechercher dans une bibliothèque autre que la principale, indiquer sont identifiant devant le biblionumber, séparés par un underscore (ex : `5_123456`) 

## Bokeh

### Effectuer une recherche sur une facette par son identifiant depuis n'importe quelle page du site

``` JS
// Bokeh : search a facet
javascript:(function(){
  /* Searches the prompted facet in Bokeh */

  var endpoint = "/recherche/simple/expressionRecherche/*/";
  var index = "multifacets";

  /* Gets this Bokeh URL */
  var bokeh_url = new URL(window.location.href);
  
  /* Gets the user input */
  var facette = window.prompt(`Écrire la facette à rechercher :\n\t(commencer par "_" pour utiliser "facette" au lieu de multifacets)\n\t(pour le même type de facette, mettre un "-" pour rechercher plusieurs facettes en "OU")`);
  if (facette.charAt(0) === "_") {
    index = "facette";
    facette = facette.substring(1)
  };

  /* Navigates to the Wayback Machine*/
  document.location.replace(`${bokeh_url.origin}${endpoint}${index}/${facette}`);
})();
```

## Dumas

Les 4 scripts de métadonnées pour les thèses remplacent [l'aide au dépôt de DUMAS](/../../../ub-svs).
Toute nouvelle modification se fera ici, l'aide originnelle ne sera plus maintenue sauf cas exceptionnel.

### Métadonnées pour les thèses d'exercice de médecine générale

À activer sur l'onglet du dépôt.
Ajoute :
* le `Type de mémoire` comme `Thèse d'exercice de médecine`,
* le `Domaine de formation` comme `Sciences de la vie et de la santé`,
* les `Domaines HAL` `Sciences du Vivant [q-bio]` et `Médecine humaine et pathologie`
* la `Spécialité` comme `Médecine générale`.

Le code (version du 08/04/2022) :

``` Javascript
javascript:(function(){
    let typeMemoire = 12; /* dumas_degreeType */
    let domaineFormation = 48; /* dumas_degreeSubject */
    let specialite = 150; /* dumas_degreeSpeciality */
    /* All that text is unnecessary is probably */
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

    document.getElementById("dumas_degreeType").value = typeMemoire;
    document.getElementById("dumas_degreeSubject").value = domaineFormation;
    document.getElementById("dumas_degreeSpeciality").value = specialite;
    document.getElementById("list_domain").innerHTML += domaineHal;
})();
```

### Métadonnées pour les thèses d'exercice de médecine spécialisée

À activer sur l'onglet du dépôt.
Affiche une boîte de dialogue avec [la liste des spécialités identifiées pour la médecine spécialisée (à la BUSVS)](https://github.com/Alban-Peyrat/ub-svs/blob/main/dumas/dumas_busvs_indexes.json).
Lors du clic sur la spécialité voulue, ajoute :
* le `Type de mémoire` comme `Thèse d'exercice de médecine`,
* le `Domaine de formation` comme `Sciences de la vie et de la santé`,
* les `Domaines HAL` `Sciences du Vivant [q-bio]` et `Médecine humaine et pathologie`
* la `Spécialité` comme celle sélectionnée (attention, l'appellation affichée ne correspond pas forcément à l'intitulé dans DUMAS).

Le code (version du 08/04/2022) :

``` Javascript
javascript:(function(){
    let typeMemoire = 12; /* dumas_degreeType */
    let domaineFormation = 48; /* dumas_degreeSubject */
    let specialite = 5; /* dumas_degreeSpeciality */
    /* All that text is unnecessary is probably */
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

    /* List of specialities in medicine */
    const listSpe = {
      "Allergologie":383,
      "Anatomie et cytologie anatomique":164,
      "Anatomie et cytologie pathologiques":196,
      "Anesthésie réanimation":163,
      "Biologie médicale":159,
      "Biologie médicale - Virologie (Virologie n'a pas d'index je crois)":159,
      "Cardiologie et chirurgie vasculaire":170,
      "Cardiologie et maladies vasculaires":199,
      "Chirurgie générale":171,
      "Chirurgie orale (Chirurgie maxillo-faciale)":44,
      "Chirurgie orthopédique et traumatologique":206,
      "Chirurgie thoracique et cardio-vasculaire":208,
      "Chirurgie urologique":209,
      "Chirurgie viscérale et digestive":211,
      "Dermatologie et vénéréologie":172,
      "Diabétologie endocrinologie":203,
      "Endocrinologie":152,
      "Endocrinologie et métabolisme":165,
      "Génétique médicale":174,
      "Gériatrie":212,
      "Gynécologie médicale":200,
      "Gynécologie obstétrique":175,
      "Hématologie":166,
      "Hépato-gastro-entérologie":155,
      "Médecine du travail":176,
      "Médecine d'urgence":214,
      "Médecine interne":201,
      "Médecine interne et immunologie clinique":285,
      "Médecine légale et expertise médicale":27,
      "Médecine nucléaire":177,
      "Médecine physique et de réadaptation":178,
      "Néphrologie":179,
      "Neurologie":153,
      "Oncologie":167,
      "Oncologie médicale":833,
      "Ophtalmologie":168,
      "Oto-rhyno-laryngologie et chirurgie cervico-faciale":169,
      "Pédiatrie":181,
      "Physique et Réadaptation":178,
      "Pneumologie":183,
      "Psychiatrie":184,
      "Radiodiagnostic et imagerie médicale":185,
      "Rhumatologie":186,
      "Santé publique":543,
      "Urologie":928
   };

    /* Dialog for specialities */
    const alpDialog = document.createElement("div");
    alpDialog.id = "alpDialog";
    const alpDialogUl = document.createElement("ul");
    alpDialogUl.id = "alpDialogUl";
    for(key in listSpe){
        let elem = document.createElement("li");
        let elemInp = document.createElement("a");
        elemInp.id = "elemInp_" + listSpe[key];
        elemInp.text = key;
        /* https://bobbyhadz.com/blog/javascript-create-element-with-onclick-event */
        elemInp.addEventListener('click', function () {
            speId = this.id.substring(8);
            specialite = speId;
            $("#alpDialog").remove();

            /* Apply changes. All at the same time. */
            document.getElementById("dumas_degreeType").value = typeMemoire;
            document.getElementById("dumas_degreeSubject").value = domaineFormation;
            document.getElementById("dumas_degreeSpeciality").value = specialite;
            document.getElementById("list_domain").innerHTML += domaineHal;
        });
        elem.appendChild(elemInp);
        alpDialog.appendChild(elem);
    }
    $("body").append(alpDialog);
    $("#alpDialog").dialog({height: 800, width: 800, title:"Choisissez la spécialité"});
})();
```

### Métadonnées pour les thèses d'exercice de pharmacie

À activer sur l'onglet du dépôt.
Affiche une boîte de dialogue avec [la liste des spécialités identifiées pour la pharmacie (à la BUSVS)](https://github.com/Alban-Peyrat/ub-svs/blob/main/dumas/dumas_busvs_indexes.json).
Lors du clic sur la spécialité voulue, ajoute :
* le `Type de mémoire` comme `Thèse de pharmacie`,
* le `Domaine de formation` comme `Sciences de la vie et de la santé`,
* les `Domaines HAL` `Sciences du Vivant [q-bio]` et `Sciences pharmaceutiques`
* la `Spécialité` comme celle sélectionnée (attention, l'appellation affichée ne correspond pas forcément à l'intitulé dans DUMAS).

Le code (version du 08/04/2022 - domaines HAL corrigés) :

``` Javascript
javascript:(function(){
    let typeMemoire = 13; /* dumas_degreeType */
    let domaineFormation = 48; /* dumas_degreeSubject */
    let specialite = 5; /* dumas_degreeSpeciality */
    /* All that text is unnecessary is probably */
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.sp" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Sciences pharmaceutiques</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences pharmaceutiques</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

    /* List of specialities in pharmacy */
    const listSpe = {
      "Biologie médicale":159,
      "Industrie":844,
      "Industrie Recherche":790,
      "Innovation pharmaceutique et recherche":592,
      "Officine":788,
      "Pharmacie hospitalière - Pharmacie industrielle et biologie médicale":653,
      "Pharmacie hospitalière - Pratique et recherche":553,
      "Pharmacie hospitalière bio-médicale":789,
      "Pharmacie hospitalière et des collectivités":160,
      "Sciences Pharmaceutiques":592,
      "Toxicologie":774
   };

    /* Dialog for specialities */
    const alpDialog = document.createElement("div");
    alpDialog.id = "alpDialog";
    const alpDialogUl = document.createElement("ul");
    alpDialogUl.id = "alpDialogUl";
    for(key in listSpe){
        let elem = document.createElement("li");
        let elemInp = document.createElement("a");
        elemInp.id = "elemInp_" + listSpe[key];
        elemInp.text = key;
        /* https://bobbyhadz.com/blog/javascript-create-element-with-onclick-event */
        elemInp.addEventListener('click', function () {
            let speId = this.id.substring(8);
            specialite = speId;
            $("#alpDialog").remove();

            /* Apply changes. All at the same time. */
            document.getElementById("dumas_degreeType").value = typeMemoire;
            document.getElementById("dumas_degreeSubject").value = domaineFormation;
            document.getElementById("dumas_degreeSpeciality").value = specialite;
            document.getElementById("list_domain").innerHTML += domaineHal;
        });
        elem.appendChild(elemInp);
        alpDialog.appendChild(elem);
    }
    $("body").append(alpDialog);
    $("#alpDialog").dialog({height: 800, width: 800, title:"Choisissez la spécialité"});
})();
```

### Métadonnées pour les thèses d'exercice d'odontologie

À activer sur l'onglet du dépôt.
Ajoute :
* le `Type de mémoire` comme `Thèse d'exercice en chirurgie dentaire`,
* le `Domaine de formation` comme `Sciences de la vie et de la santé`,
* les `Domaines HAL` `Sciences du Vivant [q-bio]` et `Médecine humaine et pathologie`.

Le code (version du 08/04/2022) :

``` Javascript
javascript:(function(){
    let typeMemoire = 30; /* dumas_degreeType */
    let domaineFormation = 48; /* dumas_degreeSubject */
    /* All that text is unnecessary is probably */
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

    document.getElementById("dumas_degreeType").value = typeMemoire;
    document.getElementById("dumas_degreeSubject").value = domaineFormation;
    document.getElementById("list_domain").innerHTML += domaineHal;
})();
```

## Idref

### Passer en recherche nom de personne

Fonctionne sur n'importe quelle page d'IdRef tant que l'URL est `https://www.idref.fr/autorites.jsp`.
Commence une nouvelle recherche en exécutant le script `clearAll()` (ce que fait le bouton `Nouvelle recherche`), puis définit le tri par `De A à Z`.
Sélectionne ensuite `Nom de personne` dans le type d'autorité voulue.
Enfin, passe le focus sur la zone de saisie dans la section `Termes de recherche`.

Le code (version du 07/04/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "persname_t:#val#"){
      list[ii].click();
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

Le code (version du 07/04/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  document.getElementById("Text1").value = "nom_t:";
  
  var list = document.getElementsByName("ComboIndex");
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].click();
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

Le code (version du 07/04/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  document.getElementById("Text1").value = "nom_t: AND prenom_t:";
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].click();
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

Le code (version du 07/04/2022) :

``` Javascript
javascript: (() => {
  clearAll();
  document.getElementById("ComboTri").value = "&sort=affcourt_z asc";
  var list = document.getElementsByName("ComboIndex");
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "subjectheading_t:#val#"){
      list[ii].click();
    }
  }
  document.getElementById("recordtype_z_Rameau").checked = true;
  document.getElementById("Text1").focus();
})();
```

## Koha

### Rechercher un `biblionumber` à partir d'une boîte de dialogue

Sur une page de Koha, ouvre une boîte de dialogue demandant d'indiquer le `biblionumber` que l'on souhaite rechercher.
Une fois celui-ci validé, définit la valeur de la barre de recherche catalogue sur `biblionumber={biblionumber}` et lance la recherche catalogue.

``` Javascript
javascript:(function(){
  /* Searches a prompted biblionumber in Koha */
  /* Gets the wanetd biblionumber */
  var bbnb = window.prompt("Indiquez le biblionumber voulu :");

  /* Writes the command */
  var catForm = document.querySelector("#header_search #catalog_search #cat-search-block");
  catForm.querySelector("#search-form").value = "biblionumber=" + bbnb;
  catForm.querySelector("input[type='submit'][value='Valider']").click();
})();
```

### Exporter le tableau de 

## Planno

### Colorer son nom dans les plannings

Colore, pour tous plannings de la page, l'arrière-plan de la cellule du nom renseigné.
Vous devez remplacer le nom renseigné après le `=` de `nom` par la forme de votre nom écrite dans Planno.
Vous pouvez également choisir la couleur en modifiant la valeur de `couleur`, en utilisant le nom anglais de la couleur ou un code CSS.
[Voici un tableau avec une liste de couleurs si vous voulez (il faut descendre un peu)](https://developer.mozilla.org/fr/docs/Web/CSS/color_value#les_mots-clés).

Le code (version du 05/07/2022) :

``` Javascript
javascript:(function(){
  var nom = "Peyrat A."; /* Nom de la personne */
  var couleur = "red"; /* Nom de la couleur (en anglais) ou notation de la couleur en CSS si vous connaissez*/

  var tables = document.getElementsByClassName("tabsemaine1");
  for (let ii = 0; ii < tables.length; ii++){
    let cells = tables[ii].getElementsByTagName("td");
    for (let jj = 0; jj < cells.length; jj++) {
      let txt = cells[jj].getElementsByTagName("span");
      if ((txt.length == 1) && (txt[0].textContent.indexOf(nom) > -1)) {
        cells[jj].style.backgroundColor = couleur;
      } else if (txt.length > 1) {
        for (let kk = 0; kk < txt.length; kk++) {
          if (txt[kk].textContent.indexOf(nom) > -1) {
            cells[jj].style.backgroundColor = couleur;
          }
        }
      }
    }
  }
})();
```

### Colorer le nom de toute l'équipe

Colore, pour tous les plannings de la page, l'arrière-plan et le texte des noms renseignés selon les couleurs renseignées.
Dans la variable `agents`, vous devez remplacer les noms (le mien et ceux du gouvernement Borne I) par la forme du nom écrite dans Planno.
Vous pouvez également copier-coller la ligne d'un agent existant pour la rajouter juste après la première afin de rajouter d'autres agents.
Changez ensuite la couleur (`couleur`) du fonds dans l'accolade située juste après le nom de l'agent ([voici un tableau avec une liste de couleurs (il faut descendre un peu)](https://developer.mozilla.org/fr/docs/Web/CSS/color_value#les_mots-clés)).
Si vous utilisez une couleur sombre, vous pouvez également changer la couleur du texte en modifiant `couleurTexte` dans l'accolade : je ne recommande que l'utilisation des couleurs `black` et `white` pour les textes.

Le code (version du 06/07/2022) :

``` Javascript
javascript:(function(){
  /* couleur = Nom de la couleur (en anglais) ou notation de la couleur en CSS si vous connaissez*/
  /* couleurTexte = Nom de la couleur (idem qu'au-dessus) du texte */
  var agents = {
    "Peyrat A." : {"couleur" : "crimson", "couleurTexte" : "black"},
    "Borne E." : {"couleur" : "bisque", "couleurTexte" : "black"},
    "Véran O." : {"couleur" : "rebeccapurple", "couleurTexte" : "white"},
    "Riester F." : {"couleur" : "deepskyblue", "couleurTexte" : "black"},
    "Rome I." : {"couleur" : "green", "couleurTexte" : "black"},
    "Caubel C." : {"couleur" : "deeppink", "couleurTexte" : "black"} /* Attention, le dernier ne doit pas être suivi d'une virgule */
  };

var tables = document.getElementsByClassName("tabsemaine1");
  /* Loop tables */
  for (let ii = 0; ii < tables.length; ii++){
    let cells = tables[ii].getElementsByTagName("td");
    /* Loop cells */
    for (let jj = 0; jj < cells.length; jj++) {
      let txt = cells[jj].getElementsByTagName("span");
      /* Loop spans */
      for (let kk = 0; kk < txt.length; kk++) {
        /* Loop agents */
        for (const agent in agents) {
            if (txt[kk].textContent.indexOf(agent) > -1) {
              txt[kk].style.backgroundColor = agents[agent]["couleur"];
              txt[kk].style.color = agents[agent]["couleurTexte"];
            }
            
        }
      }

    }
  }
})();
```

## Wayback Machine

### Rechercher l'URL actuelle

Recherche l'URL de la page actuelle dans la Wayback Machine.

Le code (version du 28/04/2022) :

``` Javascript
javascript:(function(){
    /* Searches the current URL in the Wayabck Machine*/
    /* Gets current URL */
    const url = window.location.href;
    /* Navigates to the Wayback Machine*/
    document.location.replace("https://web.archive.org/web/*/" + url);
})();
```

### Rechercher une URL

Ouvre une boîte de dialoge dans laquelle l'on colle l'URL dont l'on souhaite consulter les archives, puis la recherche après validation.

Le code (version du 28/04/2022) :

``` Javascript
javascript:(function(){
    /* Searches a prompted URL in the Wayabck Machine*/
    /* Gets the wanetd URL */
    var url = window.prompt("Collez l'URL voulue :");
    /* Navigates to the Wayback Machine*/
    document.location.replace("https://web.archive.org/web/*/" + url);
})();
```
