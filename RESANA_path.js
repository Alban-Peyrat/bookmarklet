javascript:(function(){
    var folder_path="";
    /* Get folder path */
    document.querySelectorAll("ul.v-breadcrumbs li").forEach(part => folder_path += part.textContent.trim().replace(/^>$/, " → "));
       
    /* Adds a file path above the file path */
    document.querySelectorAll(".ic-list .ic-item").forEach(elem => {
        fileName = elem.querySelector(".i-file__info-name");
        fileExtension = elem.querySelector(".ic-col--2").textContent.replace(".", "").toUpperCase();
        /* Publications */
        if (fileName === null){fileName = elem.querySelector(".i-file__info p");}
        if (fileExtension === "PUB"){fileExtension = "publication ";}
        /* Format file display */
        else{fileExtension = "fichier " + fileExtension;}
        elem.prepend("RESANA → " + folder_path + " → " + fileExtension + " " + fileName.textContent);
    })
})()