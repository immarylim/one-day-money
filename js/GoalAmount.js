export const amGoalForm = document.querySelector('.am--goalForm');
export const amGoalBox = document.querySelector('.am--goalBox');
export const amTotalWrap = document.querySelector('.am--totalWrap');

const amGoalInp = document.querySelector('.am--goalInp');
const amGoalBtn = document.querySelector('.am--goalBtn');
const amGoalTxt = document.querySelector('.am--goalTxt');

amGoalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const goalInpVal = amGoalInp.value;

    localStorage.setItem('goalAmount', JSON.stringify(goalInpVal));

    onGoalView();
    amGoalTxt.innerText = goalInpVal;
});

const onGoalView = () => {
    amGoalForm.style.display = 'none';
    amGoalBox.style.display = 'flex';
    amTotalWrap.style.display = 'block';
}

const goalDtGet = JSON.parse(localStorage.getItem('goalAmount'));

if(goalDtGet !== null) {
    onGoalView();
    amGoalTxt.innerText = goalDtGet;
}