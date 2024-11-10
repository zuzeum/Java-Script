function pustoTu() {
    var empty = document.getElementById("pole-1").value;

    if (fname.length > 10) {
        alert("The name may have no more than 10 characters");
        submitOK = "false";
    }
    if (submitOK == "false") {
      return false;
    }
}