// Theme Switcher for The Dev Wing
document.addEventListener('DOMContentLoaded', () => {
    // Get theme toggle and parent container
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      // Create theme panel button if it doesn't exist
      if (!document.querySelector('.theme-panel-btn')) {
        const themePanelBtn = document.createElement('button');
        themePanelBtn.className = 'theme-panel-btn';
        themePanelBtn.innerHTML = '<i class="fas fa-palette"></i>';
        themePanelBtn.title = 'Change theme style';
        themeToggle.parentNode.appendChild(themePanelBtn);
      
        // Create theme panel if it doesn't exist
        if (!document.querySelector('.theme-panel')) {
          const themePanel = document.createElement('div');
          themePanel.className = 'theme-panel';
          themePanel.innerHTML = `
            <div class="theme-option" data-theme="default">
              <div class="theme-preview default-theme"></div>
              <span>Default</span>
            </div>
            <div class="theme-option" data-theme="hacker">
              <div class="theme-preview hacker-preview"></div>
              <span>Hacker</span>
            </div>
            <div class="theme-option" data-theme="monochrome">
              <div class="theme-preview monochrome-preview"></div>
              <span>Monochrome</span>
            </div>
            <div class="theme-option" data-theme="retro">
              <div class="theme-preview retro-preview"></div>
              <span>Retro</span>
            </div>
          `;
          themeToggle.parentNode.appendChild(themePanel);
        }
      }
      
      // Get theme panel button and panel
      const themePanelBtn = document.querySelector('.theme-panel-btn');
      const themePanel = document.querySelector('.theme-panel');
      
      // Toggle theme panel visibility
      themePanelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themePanel.classList.toggle('show');
      });
      
      // Close panel when clicking elsewhere
      document.addEventListener('click', (e) => {
        if (themePanel.classList.contains('show') && 
            !themePanel.contains(e.target) && 
            e.target !== themePanelBtn) {
          themePanel.classList.remove('show');
        }
      });
      
      // Handle theme selection
      const themeOptions = themePanel.querySelectorAll('.theme-option');
      themeOptions.forEach(option => {
        option.addEventListener('click', () => {
          const theme = option.getAttribute('data-theme');
          
          // Remove all theme classes
          document.body.classList.remove('hacker-theme', 'monochrome-theme', 'retro-theme');
          
          // Add selected theme class
          if (theme !== 'default') {
            document.body.classList.add(`${theme}-theme`);
          }
          
          // Save theme preference to localStorage
          localStorage.setItem('theme-variant', theme);
          
          // Close panel
          themePanel.classList.remove('show');
        });
      });
      
      // Apply saved theme variant on load
      const savedThemeVariant = localStorage.getItem('theme-variant');
      if (savedThemeVariant && savedThemeVariant !== 'default') {
        document.body.classList.add(`${savedThemeVariant}-theme`);
      }
    }
    
    // Dark/Light mode integration
    const applyColorScheme = () => {
      const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
      const themeIcon = document.querySelector('#theme-toggle i');
      
      if (themeIcon) {
        themeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
      }
      
      // Add appropriate class to indicate base theme for custom themes
      document.body.classList.toggle('base-dark', isDarkMode);
      document.body.classList.toggle('base-light', !isDarkMode);
    };
    
    // Run once on load
    applyColorScheme();
    
    // Watch for theme changes from main theme toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          applyColorScheme();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
  });