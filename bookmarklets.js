// Rappels : pour commenter dans les scripts utliser /* */ sinon ça ne fonctionnera pas
// Aussi, JQuery est utilisable si la page l'utilise de base
// Pour avoir plusieurs lignes de bookmark : https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/multi-row_bookmarks.css

// Alma : add code stat (med)
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

// ArchiRes : search record by biblinoumber
javascript:(function(){
  /* Searches the prompted biblionumber in Bokeh, Koha or Omeka */
  const bokehEndpoint = "recherche/viewnotice";
  const bokehLibIdParam = "id_int_bib";
  const bokehSigbIdParam = "id_sigb";
  const omekaEndpoint = "admin/item?fulltext_search=&property%5B0%5D%5Bjoiner%5D=and&property%5B0%5D%5Bproperty%5D=185&property%5B0%5D%5Btype%5D=eq&property%5B0%5D%5Btext%5D=";
  const kohaEndpoint = "cgi-bin/koha/catalogue/detail.pl?biblionumber=";
  let endpoint = null;
  let sigbId = null;
  let libId = 1;

  /* Gets this URL */
  let curr_url = new URL(window.location.href);
  if (curr_url.origin.indexOf("omeka") > -1){
    endpoint = omekaEndpoint;
  }else if(curr_url.origin.indexOf("koha") > -1){
    endpoint = kohaEndpoint;
  }else {
    endpoint = bokehEndpoint;
  }
  
  /* Gets the user input */
  let userInput = window.prompt(`ID ?\n\t(To query a Bokeh libray other than the first one, type its ID before an underscore (ex : "5_123456"))`);
  let hasMatched = /^\s*(\d+)\s*_\s*(.*)\s*$/.exec(userInput);
  if (hasMatched !== null) {
    sigbId = hasMatched[2].trim();
    libId = hasMatched[1].trim();
  }else{
    sigbId = userInput.trim();
  };

  /* Navigates to the Wayback Machine*/
  if (endpoint === bokehEndpoint){
    document.location.replace(`${curr_url.origin}/${endpoint}/${bokehSigbIdParam}/${sigbId}/${bokehLibIdParam}/${libId}`);
  }else {
    document.location.replace(`${curr_url.origin}/${endpoint}${sigbId}`);
  } 
  
})();

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

// Bokeh : inspector_gadget
javascript:(function(){
  /* Gets this Bokeh URL */
  var url = new URL(window.location.href);
  document.location.replace(`${url.origin}${url.pathname}/inspector_gadget/1${url.search}`);
})();

// Dumas Med Ge
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

// Dumas Med Spe
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

// Dumas Pharmacy
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

// Dumas Odonto
javascript:(function(){
    let typeMemoire = 30; /* dumas_degreeType */
    let domaineFormation = 48; /* dumas_degreeSubject */
    /* All that text is unnecessary is probably */
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

    document.getElementById("dumas_degreeType").value = typeMemoire;
    document.getElementById("dumas_degreeSubject").value = domaineFormation;
    document.getElementById("list_domain").innerHTML += domaineHal;
})();

//IdRef recherche personne
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

//IdRef recherche experte nom de famille
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

//IdRef recherche experte nom de famille et prénom
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

//IdRef recherche nom commun RAMEAU
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

// Wayback Machine this URL
javascript:(function(){
    /* Searches the current URL in the Wayabck Machine*/
    /* Gets current URL */
    const url = window.location.href;
    /* Navigates to the Wayback Machine*/
    document.location.replace("https://web.archive.org/web/*/" + url);
})();

// Wayback Machine prompted URL
javascript:(function(){
    /* Searches a prompted URL in the Wayabck Machine*/
    /* Gets the wanetd URL */
    var url = window.prompt("Collez l'URL voulue :");
    /* Navigates to the Wayback Machine*/
    document.location.replace("https://web.archive.org/web/*/" + url);
})();

// REBUB header arrête de scroll
javascript: (function () {
    document.getElementsByTagName("header")[0].style.position = "static";
    document.getElementById("content").style.marginTop = 0;
    document.getElementById("content").style.paddingTop = "10px";
    document.getElementById("secondary").style.position = "static";
})();

// Babord+ changer couleur du surlignement (marche aussi sur d'autre sites)
javascript: (function () {
    document.styleSheets[0].insertRule("*::selection {background:black!important; color:white!important}");
})();

// Planno colorer les cases pour un nom
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

// Planno colorer toute l'équipe 
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

// Koha rechercher biblionumber PROMPT
javascript:(function(){
  /* Searches a prompted biblionumber in Koha */
  /* Gets the wanetd biblionumber */
  var bbnb = window.prompt("Indiquez le biblionumber voulu :");

  /* Sets-up the catalog search*/
  /* pas besoin de faire ça, j'avais mal repéré le problème que j'avais*/
 /* var catSearchButton = document.querySelector("#header_search ul li a[href='#catalog_search']");
  if (catSearchButton.parentElement.attributes["class"].value.indexOf("ui-state-active") === -1) {
    catSearchButton.click();
  }*/

  /* Writes the command */
  var catForm = document.querySelector("#header_search #catalog_search #cat-search-block");
  catForm.querySelector("#search-form").value = "biblionumber=" + bbnb;
  catForm.querySelector("input[type='submit'][value='Valider']").click();
})();

// Koha exporter tableau règles de circulation
javascript:(function(){
  /* var output = ""; */

  /* Dialog set-up */
  const alpDialog = document.createElement("div");
  alpDialog.id = "alpDialog";  

  /* Selects all rows */
  var rows = document.querySelectorAll("#default-circulation-rules tr");
  for (let ii = 0; ii < rows.length; ii++) {
  /* Gets the cells inside the row if it's not the edit row */
    if (!(rows[ii].id === "edit_row")) {
      /* output += "| "; */
      let alpDialogP = document.createElement("li");
      alpDialogP.id = "alpDialogP";
      alpDialogP.innerText += "| ";
      
      let cells = rows[ii].querySelectorAll("td");
      if (cells.length === 0) {
        cells = rows[ii].querySelectorAll("th");
      }
      /* Gets each cell content */
      for (let jj = 0; jj < cells.length; jj++){
        /* output += cells[jj].innerText + " | "; */
        alpDialogP.innerText += cells[jj].innerText + " | ";
      }
      /*output += "\n";*/
      alpDialog.appendChild(alpDialogP);
      /* Mise en forme du header et du tableau */
      if (ii === 0) {
        /*output += "| ";*/
        let formatingRow = document.createElement("li");
        formatingRow.innerText = "| ";
        for (let jj = 0; jj < cells.length; jj++) {
          /* output += ":---: | "; */
          formatingRow.innerText += ":---: | ";
        }
        /*output += "| ";*/
        formatingRow.innerText += "| ";
        alpDialog.appendChild(formatingRow);
      }
    }
  }

  /* Opens the dialog */
  $("body").append(alpDialog);
  alert("Voir la fin de la page pour trouver le texte");
})();

// Bokeh : search a list of title with on facet type
javascript:(function(){
  /* Searches the prompted titles in Bokeh using prompted facets */

  const showTitleList = function(){
    this.nextSibling.style.display = "block";
  };

  /* ---------- Search part ---------- */
  /* Search function called by the button */
  const launchSearchMain = function (){
    
    /* Gets facets value and generates that part of the query if needed */
    let facetsValues = document.getElementById("facetsTextInput").value;
    if (facetsValues !== ""){
      facetsValues = `/multifacets/${facetsValues}`;
    };

    /* Gets the titles */
    let titles = document.getElementById("advTxtArea").value.split("\n");
    /* Normalize the titles : normalize the string → remove accents/diatrics → remove non alphanumeric or space caracter → replace multispaces by 1 */
    for (let ii = 0; ii < titles.length; ii++){
      titles[ii] = titles[ii].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, " ").replace(/\s\s+/g, ' ');
      /* Deletes empty titles */
      if (titles[ii].replace(/\s/g, "") === ""){
        titles.splice(ii);
        ii--; /* prevents the loop from skipping a title */
      };
    };

    /* Launch the search */
    const url = `${(new URL(window.location.href)).origin}/recherche/simple${facetsValues}/axes/a`;

    /* Prepares all links */
    let tempUrl = url;
    let titleList = [];
    let urlCount = 0;
    let titlesCount = 0;

    for (let ii = 0; ii < titles.length; ii++) {
      /* If the title is too long to fit in a query alone, skips it */
      if ((encodeURI(url).length + encodeURI(`-10"${titles[ii]}"`).length) > 800) { /*1ko - ~20% to let the select all work properly */
        let searchLi = document.createElement("li");
        searchLi.textContent = `Titre trop long : ${titles[ii]}`;
        document.querySelector("#linkDiv #linkList").appendChild(searchLi);
        continue;
      }

      /* If adding this title exceed the limit, output the previous link and resets th url */
      if ((encodeURI(tempUrl).length + encodeURI(`-10"${titles[ii]}"`).length) > 800) { /*1ko - ~20% to let the select all work properly */
        /* If yes, adds the link to the list */
        let searchLi = document.createElement("li");
        /* Link */
        let searchLink = document.createElement("a");
        searchLink.classList.add("title-search-link");
        searchLink.href = tempUrl;
        searchLink.target = "_blank";
        searchLink.id = `searchLink${urlCount}`;
        searchLink.textContent = `Lien de recherche n°${urlCount} : ${titlesCount} titres`;
        /* Button for the list of titles to debug */
        let titleListButton = document.createElement("button");
        titleListButton.id = `titleListButton${urlCount}`;
        titleListButton.textContent = "Afficher les titres";
        titleListButton.addEventListener('click', showTitleList);
        /* Lists all the titles */
        let titleListDebug = document.createElement("span");
        titleListDebug.id = `titleListDebug${urlCount}`;
        titleListDebug.style.display = "none";
        titleListDebug.innerHTML = titleList.join("<br/>");

        /* Adds the elements to the list */
        searchLi.appendChild(searchLink);
        searchLi.appendChild(titleListButton);
        searchLi.appendChild(titleListDebug);
        document.querySelector("#linkDiv #linkList").appendChild(searchLi);

        /* Internal loop resets */
        tempUrl = url;
        titleList = [];
        titlesCount = 0;
        urlCount++;
      };

      /* Adds the title to the query */
      tempUrl += `-10"${titles[ii]}"`;
      titleList.push(titles[ii]);
      titlesCount++;
    };
  
    /* After the loop, output the last link */
    let searchLi = document.createElement("li");
    let searchLink = document.createElement("a");
    searchLink.classList.add("title-search-link");
    searchLink.href = tempUrl;
    searchLink.target = "_blank";
    searchLink.id = `searchLink${urlCount}`;
    searchLink.textContent = `Lien de recherche n°${urlCount} : ${titlesCount} titres`;
    searchLi.appendChild(searchLink);
    document.querySelector("#linkDiv #linkList").appendChild(searchLi);
  };

  /* Empties the screen*/
  let body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";
  body.style.backgroundColor = "#EBE0EB";

  /* ---------- UI part ---------- */
  /* Paragraph for facets */
  let facetsParagraph = document.createElement("p");
  facetsParagraph.textContent = `Facettes (1 type, "-" entre elles pour en rechercher plusieurs) : `;
  /* Input text for facets */
  let facetsTextInput = document.createElement("input");
  facetsTextInput.id = "facetsTextInput";
  facetsTextInput.type = "text";
  facetsParagraph.appendChild(facetsTextInput);

  /* Paragrpah explaining title part */
  let titlesParagraph = document.createElement("p");
  titlesParagraph.textContent = `Coller chaque titre sur une ligne ↓↓↓`;

  /* Text area for title */
  let titleTextArea = document.createElement("textarea");
  titleTextArea.id = "advTxtArea";
  titleTextArea.rows = 10;

  /* Search button */
  let searchButton = document.createElement("button");
  searchButton.id = "searchButton";
  searchButton.style.marginLeft = "auto";
  searchButton.style.marginTop = "20px";
  searchButton.textContent = "Générer les liens";
  searchButton.addEventListener('click', launchSearchMain);

  /* Link area */
  let linkDiv = document.createElement("div");
  linkDiv.id = "linkDiv";
  let linkList = document.createElement("ul");
  linkList.id = "linkList";
  linkDiv.appendChild(linkList);

  /* Append everything to a container */
  let globalDiv = document.createElement("div");
  globalDiv.id = "globalDiv";
  globalDiv.style.padding = "5%";
  globalDiv.appendChild(facetsParagraph);
  globalDiv.appendChild(titlesParagraph);
  globalDiv.appendChild(titleTextArea);
  globalDiv.appendChild(searchButton);
  globalDiv.appendChild(linkDiv);
  body.appendChild(globalDiv);
})();