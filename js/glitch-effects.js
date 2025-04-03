// Enhanced glitch text interaction
document.addEventListener('DOMContentLoaded', () => {
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
      // Make the cursor change to indicate it's clickable
      glitchText.style.cursor = 'pointer';
      
      // Add hover effect - intensify the glitch on hover
      glitchText.addEventListener('mouseenter', () => {
        glitchText.classList.add('glitch-hover');
      });
      
      glitchText.addEventListener('mouseleave', () => {
        glitchText.classList.remove('glitch-hover');
      });
      
      // Click handler with progressive interactions
      let clickCount = 0;
      glitchText.addEventListener('click', () => {
        clickCount++;
        
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'glitch-modal';
        
        // Different messages based on number of clicks
        let message = '';
        
        switch(clickCount) {
          case 1:
            message = "You clicked the glitch! You must be curious 😄";
            break;
          case 2:
            message = "Clicked again? You're definitely inquisitive! Keep exploring.";
            break;
          case 3:
            message = "Three clicks! Here's a secret: try pressing the Konami code on any page.";
            break;
          case 4:
            message = "Four clicks?! Alright, here's something special: open the console and type 'hacker_mode()'.";
            break;
          default:
            message = `You've clicked ${clickCount} times. You're persistent! Check the Projects section for more hidden features.`;
        }
        
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <p>${message}</p>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeBtn.click();
          }
        });
      });
      
      // Add Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      let konamiIndex = 0;
      
      document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          
          if (konamiIndex === konamiCode.length) {
            // Trigger matrix rain effect
            startMatrixRain();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      });
      
      // Console Easter Egg function
      window.hacker_mode = function() {
        document.body.classList.add('hacker-theme');
        console.log("%cHacker mode activated! 👨‍💻", "color:lime; font-size:20px; font-weight:bold;");
        console.log("%cType exit_hacker_mode() to return to normal", "color:lime;");
      };
      
      window.exit_hacker_mode = function() {
        document.body.classList.remove('hacker-theme');
        console.log("%cBack to normal mode", "color:#00bfff;");
      };
    }
  });
  
  // Matrix rain effect function
  function startMatrixRain() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // Matrix rain animation
    const ctx = canvas.getContext('2d');
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    const matrixInterval = setInterval(draw, 35);
    
    // Stop matrix effect after 10 seconds
    setTimeout(() => {
      clearInterval(matrixInterval);
      document.body.removeChild(canvas);
    }, 10000);
  }