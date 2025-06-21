document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('animatedTitle');
    const text = title.textContent;
    title.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'typo-letters';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.animationDelay = `${0.1 + i * 0.05}s`;
        title.appendChild(span);
    }
    
    const animatedText = document.getElementById('animatedText');
    const textContent = animatedText.textContent;
    animatedText.textContent = '';

    const wordFragments = textContent.split(/(\s+)/);

    wordFragments.forEach((fragment, i) => {
        if (!fragment) return;
        
        const fragmentSpan = document.createElement('span');
        fragmentSpan.style.display = 'inline-block';
        
        if (fragment.trim() === '') {
            fragmentSpan.innerHTML = '&nbsp;'.repeat(fragment.length);
            fragmentSpan.style.animationDelay = `${1 + i * 0.05}s`;
        } else {
            fragmentSpan.textContent = fragment;
            fragmentSpan.style.animationDelay = `${1 + i * 0.1}s`;
        }
        
        fragmentSpan.className = 'typo-letters';
        animatedText.appendChild(fragmentSpan);
    });
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        document.getElementById('progressBar').style.width = scrollProgress + '%';
    });
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-item').forEach(item => {
        observer.observe(item);
    });
    
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelector('.shape-1').style.transform = 
            `translate(${x * 30}px, ${y * 30}px) rotate(${x * 20}deg)`;
        
        document.querySelector('.shape-2').style.transform = 
            `translate(${x * -40}px, ${y * -40}px) rotate(${y * 30}deg)`;
        
        document.querySelector('.shape-3').style.transform = 
            `translate(${x * 50}px, ${y * -20}px) rotate(${x * 40}deg)`;
        
        document.querySelector('.shape-4').style.transform = 
            `translate(${x * -20}px, ${y * 50}px) rotate(${y * 40}deg)`;
    });
    
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    document.querySelector('.gallery-item').addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const layers = document.querySelectorAll('.parallax-layer');
        layers.forEach((layer, i) => {
            const depth = parseInt(layer.style.transform.match(/translateZ\((-?\d+)px\)/)[1]);
            const moveX = x * depth * 20;
            const moveY = y * depth * 20;
            layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
        });
    });
});
