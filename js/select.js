;(function () {
    // 上面四顆按鈕
    const oCityBtn  = document.querySelector('#city-btn');
    const oAreaBtn  = document.querySelector('#area-btn');
    const oHouseBtn = document.querySelector('#house-btn');
    const oPriceBtn = document.querySelector('#price-btn');

    // 選擇區域框框
    const oselectArea = document.querySelector('.select-area');

    // 選擇區域的兩個框
    const oCityOptions = document.querySelector('#city-options');
    const oAreaOptions = document.querySelector('#area-options');


    // 生成所有城市的選項
    generCityList();


    // 每個區域的選項們
    let aCityOption  = document.querySelectorAll('#city-options .option');
    let aAreaOption  = document.querySelectorAll('#area-options .option');
    let aPurposesOption  = document.querySelectorAll('.purposes .option');
    let aPriceRangeOption  = document.querySelectorAll('.price-range .option');

    // 三個大區塊
    let oAddr = document.querySelector('.select-area .addr');
    let oPurposes = document.querySelector('.select-area .purposes');
    let oPriceRange = document.querySelector('.select-area .price-range');

    
    // 其他
    let oSelectAreaTipBox = oselectArea.querySelector('.select-area-tip-box'); // 小提示框
    let aPriceInputBox = oPriceRange.querySelectorAll('.price-input-box input'); // 輸入金額的匡


    oCityBtn.addEventListener('click', handleCityBtn);
    oAreaBtn.addEventListener('click', handleAreaBtn);
    oHouseBtn.addEventListener('click', handleHouseBtn);
    oPriceBtn.addEventListener('click', handlePriceBtn);

    aCityOption.forEach(dom => dom.addEventListener('click', handleCityOptions));
    aAreaOption.forEach(dom => dom.addEventListener('click', handleAreaOptions));
    aPurposesOption.forEach(dom => dom.addEventListener('click', handlePurposesOptions));
    aPriceRangeOption.forEach(dom => dom.addEventListener('click', handlePriceRangeOptions));

    document.addEventListener('click', handleDocumentClick);
    aPriceInputBox.forEach(dom => dom.addEventListener('blur', handlePriceInputBlur));

    // 最上面四顆按鈕的點擊事件處理
    function handleCityBtn(ev) {
        
        handleDisplayArea(oAddr, [oPurposes, oPriceRange]);
        moveAreaOptions(false);
        oselectArea.style.visibility = 'unset';
        ev.cancelBubble = true;
        
    }
    function handleAreaBtn(ev) {
        handleDisplayArea(oAddr, [oPurposes, oPriceRange]);

        // 如果當前沒有選中任何城市，不給去選成區域
        if (curSelectCity == '') {
            moveAreaOptions(false);
        } else {
            moveAreaOptions(true);
        }
        
        oselectArea.style.visibility = 'unset';
        ev.cancelBubble = true;
    }
    function handleHouseBtn(ev) {
        handleDisplayArea(oPurposes, [oAddr, oPriceRange]);

        oselectArea.style.visibility = 'unset';
        ev.cancelBubble = true;
    }
    function handlePriceBtn(ev) {
        handleDisplayArea(oPriceRange, [oAddr, oPurposes]);

        oselectArea.style.visibility = 'unset';
        ev.cancelBubble = true;
    }


    function handleDisplayArea(displayDom, hiddenDoms) {
        hiddenDoms.forEach(dom => (dom.style.display = 'none'));
        displayDom.style.display = 'block';
    }




    function handleDisableClass() {
        if (selectCount >= 3) {
            oCityOptions.classList.add('disabled');
            // 如果當前選擇的城市還沒有區域時，要給人家選一下區域
            if (selectAreas[curSelectCity] && selectAreas[curSelectCity].length !== 0) {
                oAreaOptions.classList.add('disabled');
            } else {
                oAreaOptions.classList.remove('disabled');
            }
        } else {
            oCityOptions.classList.remove('disabled');
            oAreaOptions.classList.remove('disabled');
        }
    }

    let selectAreas = {};
    let curSelectCity = '';
    let selectCount = 0;
    // [每個選項的點擊事件處理] //

    // 城市選項
    function handleCityOptions(ev) {
        // 判斷是否是點右上角的刪除 icon
        if (ev.target.dataset.remove) {
            curSelectCity = this.innerText.trim();
            removeCity(curSelectCity);
            this.classList.remove('select');
        } else {
            let tmp = this.innerText.trim();
            // 最多提供三個地點的查詢
            if (selectCount >= 3) {
                // 如果是有選中該區域過的城市，要給他去看一下他選了啥
                if (selectAreas[tmp]) {
                    curSelectCity = tmp;
                    generAreaList(my_city[curSelectCity]);
                    moveAreaOptions(true);
                }
                return ;
            }
            curSelectCity = tmp;

            // 數據處理
            addCity(curSelectCity);
            generAreaList(my_city[curSelectCity]);
            moveAreaOptions(true);
            this.classList.add('select');
        } 

        console.log(selectAreas, selectCount);
        handleDisableClass();
        // 處理第一欄位的文字
        handleTips();
        ev.cancelBubble = true;
    }

    function addCity(city) {
        if (!selectAreas[city]) {
            selectAreas[city] = []
            selectCount++
        }
    }
    function removeCity(city) {
        len = selectAreas[city].length == 0 ? 1 : selectAreas[city].length;
        delete selectAreas[city] && (selectCount -= len);
        curSelectCity = '';
    }
    function handleTips() {
        let text = '';
        if (selectCount == 0) {
            text = '請至少選擇一個您想找的縣市區域，才能為您進行搜尋喔！';
        } else {
            text = '請選擇您想找的縣市區域（可複選3個）';
        }
        oSelectAreaTipBox.textContent = text;
    }

    // 區選項
    function handleAreaOptions(ev) {
        // 最多三個，但是如果當前的城市還沒選區的話可以放行
        let seletedArea = this.innerText.trim();
        if (ev.target.dataset.remove) {
            removeArea(seletedArea);
            this.classList.remove('select');
        } else {
            if (selectCount >= 3 && selectAreas[curSelectCity].length !== 0) return;
            if (addArea(seletedArea)) {
                this.classList.add('select');
            };
        }
        console.log(selectAreas, selectCount);
        handleDisableClass();
        ev.cancelBubble = true;
    }

    function addArea(area) {
        
        // 如果該城市再已選的數據中沒有
        if (!selectAreas[curSelectCity]) return false;

        // 如果是第一次選地區，那麼會把城市那個選擇直接往下拼，城市那個在 addCity 加過了
        if (selectAreas[curSelectCity].length !== 0) {
            selectCount++
        }
        selectAreas[curSelectCity].push(area);
        return true;
    }

    function removeArea(area) {
        let curCityInfos = selectAreas[curSelectCity];
        let index = curCityInfos.findIndex(v => v == area);
        index >= 0 && curCityInfos.splice(index, 1);

        // 等於 0 的話不能剪，因為表示全選該城市，所以還是有一個選項
        if (curCityInfos.length != 0) {
            selectCount--
        }
        
    }


    // 用途選項
    let selectPurposes = [];
    function handlePurposesOptions(ev) {
        console.dir(this.innerText);
        if (Array.from(this.classList).includes('select')) {
            selectPurposes.includes && selectPurposes.splice(selectPurposes.findIndex(item => item == this.innerText), 1);
        } else {
            selectPurposes.push(this.innerText);
        }
        this.classList.toggle('select');
        ev.cancelBubble = true;
    }


    // 價格區間
    let selectPriceRange = '不限';
    function handlePriceRangeOptions(ev) {
        selectPriceRange = this.innerText.trim();
        handlePriceValue(selectPriceRange);
        aPriceRangeOption.forEach(dom => dom.classList.remove('select'));
        this.classList.add('select');

        console.log(selectPriceRange);
        ev.cancelBubble = true;
    }

    function handlePriceValue(price) {
        if (price === '不限') {
            return '價格不限';
        } else if (price.startsWith('-')) {
            return '';
        } else {
            return price
        }
    }

    let n1 = null;
    let n2 = null;
    function handlePriceInputBlur(ev) {
        // let input = Number(this.value);
        // if (Number.isNaN(input)) {
        //     this.value = '';
        //     return;
        // }

        // let n = this.dataset.n;
        // if (n == 'n1') {
        //     n1 = input;
        //     if (n1 > n2) {
                
        //     }
        // } else {
        //     n2 = input;
        // }
        
    }




    // 點擊除了顯示匡的其他地方時，隱藏顯示匡
    function handleDocumentClick(ev) {
        !oselectArea.contains(ev.target) && (oselectArea.style.visibility = 'hidden');
    }

    /**
     * @description 移動選擇地區的選擇匡
     * @left 是否向左移動
     * */ 
    function moveAreaOptions(left) {
        if (left) {
            oCityOptions.style.transform = 'translateX(calc(-100% + -20px))';
            oAreaOptions.style.transform = 'translateX(calc(-100% + -20px))';
        } else {
            oCityOptions.style.transform = 'unset';
            oAreaOptions.style.transform = 'unset';
        }
    }


    // 生成城市 options
    function generCityList() {
        let htmlArr = [];
        for(i in my_city) {
            let html = `
                <div class="option">
                    <input type="checkbox" class="input">
                    <span>${i}</span>
                    <i class="check-icon"><svg t="1614409506986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3419" width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M1024 246.4l-128-134.4-512 544-256-273.6-128 136 256 273.6L384 928l128-136z" p-id="3420" fill="#60A060"></path></svg></i>
                    <i class="del-icon"><svg data-remove="true" t="1614518561083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2124" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path data-remove="true" d="M595.549 512.5l344.35-344.347c23.211-23.212 23.211-60.84 0-84.053-23.212-23.208-60.841-23.208-84.05 0L511.5 428.45 171.802 88.753c-22.932-22.935-60.116-22.935-83.048 0-22.935 22.933-22.935 60.117 0 83.05L428.45 511.5 84.101 855.849c-23.211 23.21-23.211 60.84 0 84.049 23.212 23.211 60.841 23.211 84.05 0l344.35-344.35 338.822 338.823c22.933 22.935 60.116 22.935 83.048 0 22.935-22.933 22.935-60.117 0-83.048L595.549 512.5z" p-id="2125" fill="#666666"></path></svg></i>
                </div>
            `;
            htmlArr.push(html);
        }
        oCityOptions.innerHTML = htmlArr.join('');
    };

    // 生成區域 options
    function generAreaList(areas) {
        let html = '';

        // 判斷這個城市之前是否有選中
        if(selectAreas[curSelectCity] && selectAreas[curSelectCity].length > 0) {
            // 如果有就把選種的那些加上 select class
            html = areas.map(area => {
                isSelected = selectAreas[curSelectCity].includes(area);
                return `
                    <div class="option ${isSelected ? 'select': ''}">
                        <input type="checkbox" class="input"}>
                        <span>${area}</span>
                        <i class="check-icon"><svg t="1614409506986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3419" width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M1024 246.4l-128-134.4-512 544-256-273.6-128 136 256 273.6L384 928l128-136z" p-id="3420" fill="#60A060"></path></svg></i>
                        <i class="del-icon"><svg data-remove="true" t="1614518561083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2124" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path data-remove="true" d="M595.549 512.5l344.35-344.347c23.211-23.212 23.211-60.84 0-84.053-23.212-23.208-60.841-23.208-84.05 0L511.5 428.45 171.802 88.753c-22.932-22.935-60.116-22.935-83.048 0-22.935 22.933-22.935 60.117 0 83.05L428.45 511.5 84.101 855.849c-23.211 23.21-23.211 60.84 0 84.049 23.212 23.211 60.841 23.211 84.05 0l344.35-344.35 338.822 338.823c22.933 22.935 60.116 22.935 83.048 0 22.935-22.933 22.935-60.117 0-83.048L595.549 512.5z" p-id="2125" fill="#666666"></path></svg></i>
                    </div>
                `
            }).join('');
        } else {
            // 沒有就直接生成
            html = areas.map(area => `
                <div class="option">
                    <input type="checkbox" class="input"}>
                    <span>${area}</span>
                    <i class="check-icon"><svg t="1614409506986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3419" width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M1024 246.4l-128-134.4-512 544-256-273.6-128 136 256 273.6L384 928l128-136z" p-id="3420" fill="#60A060"></path></svg></i>
                    <i class="del-icon"><svg data-remove="true" t="1614518561083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2124" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path data-remove="true" d="M595.549 512.5l344.35-344.347c23.211-23.212 23.211-60.84 0-84.053-23.212-23.208-60.841-23.208-84.05 0L511.5 428.45 171.802 88.753c-22.932-22.935-60.116-22.935-83.048 0-22.935 22.933-22.935 60.117 0 83.05L428.45 511.5 84.101 855.849c-23.211 23.21-23.211 60.84 0 84.049 23.212 23.211 60.841 23.211 84.05 0l344.35-344.35 338.822 338.823c22.933 22.935 60.116 22.935 83.048 0 22.935-22.933 22.935-60.117 0-83.048L595.549 512.5z" p-id="2125" fill="#666666"></path></svg></i>
                </div>
            `).join('');
        };
        oAreaOptions.innerHTML = html;
        aAreaOption  = document.querySelectorAll('#area-options .option');
        aAreaOption.forEach(dom => dom.addEventListener('click', handleAreaOptions));
    }

})();

