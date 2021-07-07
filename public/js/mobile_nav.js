function showMenu() {
    const mobile_nav = document.querySelector(".mobile_nav");
    if(mobile_nav.classList.contains('hidden')) {
        mobile_nav.classList.remove('hidden');
    }
    
    else {
        mobile_nav.classList.add('hidden');
    }
}

const mobile_menu = document.querySelector("#mobile_menu");
mobile_menu.addEventListener("click", showMenu);