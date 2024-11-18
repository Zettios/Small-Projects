function expandShowDropdown() {
    let dropdownList = document.querySelector(".collapsed");   
    
    if (dropdownList !== null) {
        dropdownList.classList.add("showing");
        dropdownList.classList.remove("collapsed");
    } else {
        dropdownList = document.querySelector(".showing");
        dropdownList.classList.add("collapsed");
        dropdownList.classList.remove("showing");
    }
}