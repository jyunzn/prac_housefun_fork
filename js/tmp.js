// 有時間的話，自己寫選擇器，不然原生的太醜
// <div class="my-select">
//     <div class="select-box" data-for="city">
//         請選擇
//         <i><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M940.884512 276.804327c-21.594831-21.594831-56.607252-21.594831-78.203106 0L510.770498 628.716258 158.858566 276.804327c-21.594831-21.594831-56.607252-21.594831-78.203106 0-21.594831 21.594831-21.594831 56.607252 0 78.203106l391.013484 391.013485c21.594831 21.594831 56.607252 21.594831 78.203107 0l0.001023-0.001023 391.012462-391.012462c21.594831-21.595854 21.594831-56.608276-0.001024-78.203106z" /></svg></i>
//     </div>
//     <ul class="my-options" id="city">
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//     </ul>
// </div>
// <div class="my-select">
//     <div class="select-box" data-for="area">
//         請選擇
//         <i><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M940.884512 276.804327c-21.594831-21.594831-56.607252-21.594831-78.203106 0L510.770498 628.716258 158.858566 276.804327c-21.594831-21.594831-56.607252-21.594831-78.203106 0-21.594831 21.594831-21.594831 56.607252 0 78.203106l391.013484 391.013485c21.594831 21.594831 56.607252 21.594831 78.203107 0l0.001023-0.001023 391.012462-391.012462c21.594831-21.595854 21.594831-56.608276-0.001024-78.203106z" /></svg></i>
//     </div>
//     <ul class="my-options" id="area">
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//         <li>台北市</li>
//     </ul>
// </div>


// .main .cut-map {
    
//     .my-select {
//         width: 90px;
//         position: relative;
//         display: inline-block;
//         .my-options {
//             border: 1px solid #ccc;
//             visibility: hidden;
//             li {
//                 padding: 5px;
//             }
//             li:hover {
//                 background: #f8f8f8;
//             }
//         }

//         .select-box:hover {
            
//             background: #f8f8f8;
//         }
//     }
// }

// ;(function () {
//     const aCutMapSelectBox = document.querySelectorAll('#cut-map .select-box');
//     const aCutMapSelectOptions = document.querySelectorAll('#cut-map .my-options');
//     const oCity                = document.querySelector('#cut-map #city');
//     const oArea                = document.querySelector('#cut-map #area');
    

//     aCutMapSelectBox.forEach(dom => dom.addEventListener('click', handleClickForCutMapSelectBox));
//     aCutMapSelectOptions.forEach(dom => dom.addEventListener('click', handleClickForCutMapSelectOptions));


//     function handleClickForCutMapSelectBox() {
//         switch (this.dataset.for) {
//             case 'city':
//                 showSelect(oCity);
//                 break;
//             case 'area':
//                 showSelect(oArea);
//                 break;
//         };
//     }

//     function handleClickForCutMapSelectOptions() {
//         hiddenSelect(this);
//     }

//     function showSelect(dom) {
//         dom.style.visibility = 'unset';
//     }
//     function hiddenSelect(dom) {
//         dom.style.visibility = 'hidden';
//     }
// })();