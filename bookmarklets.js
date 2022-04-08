// Rappels : pour commenter dans les scripts utliser /* */ sinon ça ne fonctionnera pas
// Aussi, JQuey est utilisable si la page l'utilise de base

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
    let domaineHal = '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>'; /*  */

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
