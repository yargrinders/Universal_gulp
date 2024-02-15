function mobileNav() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;

    burger.addEventListener('click', function(event) {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menu.addEventListener('click', function(){
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
    });
}

export default mobileNav;
