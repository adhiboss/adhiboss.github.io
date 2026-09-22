// Batman Easter Egg
console.log("%c>>> SYSTEM INITIALIZED\n%c\"I am vengeance. I am the night. I am debugging in production.\"", 
  "color: #ffffff; font-size: 14px; font-weight: bold; background: #000000; padding: 4px 8px;",
  "color: #888888; font-size: 12px; font-style: italic;");

// Glitch Effect for Headers
const glitchTexts = document.querySelectorAll('.box-header');

glitchTexts.forEach(text => {
    text.addEventListener('mouseover', () => {
        const originalText = text.innerText;
        let iterations = 0;
        
        const interval = setInterval(() => {
            text.innerText = originalText.split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(33 + Math.random() * 94);
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1;
        }, 30);
    });
});
