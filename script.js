
const gift = document.getElementById('gift');
const audio = document.getElementById('bg-music');
const stages = document.querySelectorAll('.stage');

// Create floating particles in background
function createParticles() {
    const container = document.getElementById('particles');
    const emojis = ['✨', '💖', '🌸', '💫', '🩵', '⭐'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 400);
}

createParticles();

gift.addEventListener('click', () => {
    // Attempt audio playback safely with user gesture
    audio.play().catch(e => console.log("Audio play failed: ", e));
    
    // Transition to Countdown stage
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
            triggerOpeningExplosion();
        }
    }, 1000);
});

function triggerOpeningExplosion() {
    // Quickly flash back to gift stage with intense shaking animation before opening
    stages[1].classList.add('hidden');
    stages[0].classList.remove('hidden');
    gift.classList.add('shake-animation');
    
    // Create extra burst elements
    for(let i=0; i<15; i++) {
        let burst = document.createElement('div');
        burst.innerText = ['💖', '✨', '🎉', '🌸'][Math.floor(Math.random()*4)];
        burst.style.position = 'absolute';
        burst.style.fontSize = '24px';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.transition = 'all 0.8s ease-out';
        document.body.appendChild(burst);
        
        setTimeout(() => {
            let angle = Math.random() * Math.PI * 2;
            let distance = 100 + Math.random() * 100;
            burst.style.transform = `translate(calc(-50% + ${Math.cos(angle)*distance}px), calc(-50% + ${Math.sin(angle)*distance}px)) scale(1.5)`;
            burst.style.opacity = '0';
        }, 10);
        
        setTimeout(() => burst.remove(), 900);
    }

    // After brief intense shake, show cinematic reveal
    setTimeout(() => {
        stages[0].classList.add('hidden');
        showReveal();
    }, 1200);
}

function showReveal() {
    stages[2].classList.add('hidden');
    stages[3].classList.remove('hidden');
    
    // Keep big birthday title visible for 3.5 seconds, then fade smoothly to the card message
    setTimeout(() => {
        stages[3].classList.add('hidden');
        stages[4].classList.remove('hidden');
    }, 3500);
}
