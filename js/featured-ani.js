(function () {
    const oMainCityBtn  = document.querySelector('.featured .main-city-btn');
    const aMainCityBtns = oMainCityBtn.querySelectorAll('li');

    aMainCityBtns.forEach(dom => dom.addEventListener('mouseover', handleHoverStartBtn));
    aMainCityBtns.forEach(dom => dom.addEventListener('mouseout',  handleHoverEndBtn));

    function handleHoverStartBtn() {
        this.classList.add('hover');
        oMainCityBtn.classList.remove('ani');
    }

    function handleHoverEndBtn() {
        this.classList.remove('hover');
        oMainCityBtn.classList.add('ani');
    }
})()