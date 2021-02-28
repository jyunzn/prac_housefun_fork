;(function () {
    const oCutMapCity = document.querySelector('#cut-map .select-area .city');
    const oCutMapArea = document.querySelector('#cut-map .select-area .area');

    oCutMapCity.addEventListener('change', handleCityChange);
    oCutMapArea.addEventListener('change', handleAreaChange);

    function handleCityChange() {
        generAreaOptions(my_city[this.value])
    }
    function handleAreaChange() {
        // ?
    }

    function generCityOptions() {
        let html = ['<option value="" disabled selected>請選擇</option>'];
        for(i in my_city) {
            html.push(`<option value="${i}">${i}</option>`);
        };
        oCutMapCity.innerHTML = html.join('');
    }

    function generAreaOptions(areas) {
        let html = '<option value="" disabled selected>請選擇</option>';
        html += areas.map(area => `<option value="${area}">${area}</option>`).join('');
        oCutMapArea.innerHTML = html;
    }

    generCityOptions()
})();