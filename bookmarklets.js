//Code stat médecine
javascript: (() => {
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1")[0].value = "U00";
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_2")[0].value = "FAB";
  document.getElementById("PAGE_BUTTONS_cbuttonsave").click()
})();

//Code stat odonto
javascript: (() => {
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_1")[0].value = "U00";
  document.getElementsByName("pageBean.itemMd.dnx.physicalItemTable.statisticsNote_2")[0].value = "FC0";
  document.getElementById("PAGE_BUTTONS_cbuttonsave").click()
})();

//IdRef recherche personne
javascript: (() => {
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
  var list = document.getElementsByName("ComboIndex");
  document.getElementById("Text1").value = "nom_t:"
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("Text1").focus();
})();

//IdRef recherche experte nom de famille et prénom
javascript: (() => {
  var list = document.getElementsByName("ComboIndex");
  document.getElementById("Text1").value = "nom_t: AND prenom_t:"
  
  for(var ii=0; ii<list.length; ii++) {
    if(list[ii].value == "#val#"){
      list[ii].checked = true;
    }
  }
  document.getElementById("Text1").focus();
})();
