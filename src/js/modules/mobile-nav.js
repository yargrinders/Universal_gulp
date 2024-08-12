// Module Burger
// function mobileNav() {
//     function menuInit() {
// 		const iconMenu = document.querySelector(".icon-menu");
	  
// 		if (iconMenu) {
// 		  iconMenu.addEventListener("click", function (e) {
// 			e.preventDefault();
// 			document.documentElement.classList.toggle("menu-open");
// 		  });
// 		}
// 	  }
	  
// 	  function menuOpen() {
// 		document.documentElement.classList.add("menu-open");
// 	  }
	  
// 	  function menuClose() {
// 		document.documentElement.classList.remove("menu-open");
// 	  }
	  
// 	  // Initialize menu
// 	  document.addEventListener("DOMContentLoaded", function () {
// 		menuInit();
// 	  });
// }

// export default mobileNav;

// Module Burger
function mobileNav() {
    function menuInit() {
        const iconMenu = document.querySelector(".icon-menu");
      
        if (iconMenu) {
            iconMenu.addEventListener("click", function (e) {
                e.preventDefault();
                document.documentElement.classList.toggle("menu-open");
                
                // Disable / Enable - Burger page Scroll
                if (document.documentElement.classList.contains("menu-open")) {
                    disableScroll();
                } else {
                    enableScroll();
                }
            });
        }
    }
    
    function disableScroll() {
        document.body.classList.add("no-scroll");
    }
    
    function enableScroll() {
        document.body.classList.remove("no-scroll");
    }
    
    function menuOpen() {
        document.documentElement.classList.add("menu-open");
        disableScroll();
    }
    
    function menuClose() {
        document.documentElement.classList.remove("menu-open");
        enableScroll();
    }
    
    // Initialize menu
    document.addEventListener("DOMContentLoaded", function () {
        menuInit();
    });
}

export default mobileNav;
