const amNameInp = document.querySelector('.am--nameInp');
const amNumInp = document.querySelector('.am--numInp');
const amAddBtn = document.querySelector('.am--addBtn');
const amTotalListBox = document.querySelector('.am--totalListBox');
const amTotalNum = document.querySelector('.am--totalNum');
const amGoalInitBtn = document.querySelector('.am--goalInit');

const amGoalFormVi = document.querySelector('.am--goalForm');
const amGoalBoxVi = document.querySelector('.am--goalBox');
const amTotalWrapVi = document.querySelector('.am--totalWrap');

let totalArr = [];
let totalVal = 0;

amAddBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(amNameInp.value === '' || amNumInp.value === '') {
        alert('출처와 금액을 모두 입력해주세요.');
    } else {
        const totalObj = {
            id: Math.floor(Math.random() * 100) + 1,
            name: amNameInp.value,
            num: amNumInp.value
        };

        totalArr.push(totalObj);

        localStorage.setItem('totalList', JSON.stringify(totalArr));

        amNameInp.value = '';
        amNumInp.value = '';

        onTotalList(totalObj.id, totalObj.name, totalObj.num);

        totalVal += Number(totalObj.num);
        amTotalNum.innerText = `${totalVal} 원`;

        onTotalWarn(totalVal);
    }
});

const onTotalList = (listId, listName, listNum) => {
    const liTag = document.createElement('li');
    liTag.className = 'am--totalList';
    liTag.id = listId;
    const spanATag = document.createElement('span');
    spanATag.innerText = listName;
    const spanBTag = document.createElement('span');
    spanBTag.innerText = `${listNum} 원`;
    const btnTag = document.createElement('button');
    btnTag.className = 'am--totalDelBtn'

    liTag.append(spanATag, spanBTag, btnTag);
    amTotalListBox.appendChild(liTag);

    btnTag.addEventListener('click', (e) => {
        /* HTML delete */
        const delLi = e.target.parentNode;

        amTotalListBox.removeChild(delLi);

        /* localStorage delete */
        totalArr = totalArr.filter(item => item.id !== Number(delLi.id));
        
        localStorage.setItem('totalList', JSON.stringify(totalArr));

        /* txt update */
        totalVal -= listNum;
        amTotalNum.innerText = `${totalVal} 원`;

        /* warning */
        onTotalWarn(totalVal);
    });
}

const onTotalWarn = (sum) => {
    const goalDtGetB = Number(JSON.parse(localStorage.getItem('goalAmount')));

    if(sum >= (goalDtGetB - 1000)) {
        amTotalNum.style.color = '#f30037';
    } else {
        amTotalNum.style.color = '#2dc653';
    }
}

amGoalInitBtn.addEventListener('click', () => {
    localStorage.removeItem('totalList');
    localStorage.removeItem('goalAmount');

    amTotalListBox.replaceChildren();
    amTotalNum.innerText = '0 원'
    amTotalNum.style.color = '#2dc653';

    amGoalFormVi.style.display = 'block';
    amGoalBoxVi.style.display = 'none';
    amTotalWrapVi.style.display = 'none';
});

const totalArrGet = JSON.parse(localStorage.getItem('totalList'));

if(totalArrGet !== null) {
    totalArr.push(...totalArrGet);

    totalArr.forEach((element) => {
        onTotalList(element.id, element.name, Number(element.num));

        totalVal += Number(element.num);
    });

    amTotalNum.innerText = `${totalVal} 원`;

    onTotalWarn(totalVal);
}