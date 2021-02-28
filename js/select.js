;(function () {
    const oCityBtn  = document.querySelector('#city-btn');
    const oAreaBtn  = document.querySelector('#area-btn');
    const oHouseBtn = document.querySelector('#house-btn');
    const oPriceBtn = document.querySelector('#price-btn');

    const oCityOptions = document.querySelector('#city-options');
    const oAreaOptions = document.querySelector('#area-options');
    const aCityOption  = document.querySelectorAll('#city-options .option');


    oCityBtn.addEventListener('click', handleCityBtn);
    oAreaBtn.addEventListener('click', handleAreaBtn);
    aCityOption.forEach(dom => dom.addEventListener('click', handleCityOptions));


    function handleCityBtn() {
        _moveAreaOptions(false);
    }
    function handleAreaBtn() {
        _moveAreaOptions(true);
    }
    function handleCityOptions() {
        _moveAreaOptions(true);
    }

    /**
     * @description 移動選擇地區的選擇匡
     * @left 是否向左移動
     * */ 
    function _moveAreaOptions(left) {
        if (left) {
            oCityOptions.style.transform = 'translateX(calc(-100% + -20px))';
            oAreaOptions.style.transform = 'translateX(calc(-100% + -20px))';
        } else {
            oCityOptions.style.transform = 'unset';
            oAreaOptions.style.transform = 'unset';
        }
    }

    // function _show




})();

