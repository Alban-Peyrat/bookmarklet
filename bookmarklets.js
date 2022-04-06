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

//IdRef recherche personne
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

//IdRef recherche experte nom de famille
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

//IdRef recherche experte nom de famille et prénom
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

//IdRef recherche nom commun RAMEAU
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
