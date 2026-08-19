
const gift = document.getElementById('gift');
const audio = document.getElementById('bg-music');
const stages = document.querySelectorAll('.stage');

gift.addEventListener('click', () => {
    audio.play().catch(e => console.log("Audio play failed: ", e));
    
    stages[0].classList.add('hidden');
    stages[1].classList.remove('hidden');
    
    let count = 5;
    const countdownEl = document.getElementById('countdown');
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.innerText = count;
        } else {
            clearInterval(interval);
            showReveal();
        }
    }, 1000);
});

function showReveal() {
    stages[1].classList.add('hidden');
    stages[2].classList.remove('hidden');
    setTimeout(() => {
        stages[2].classList.add('hidden');
        stages[3].classList.remove('hidden');
    }, 3000);
}
