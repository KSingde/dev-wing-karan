// Quick Notes Feature
document.addEventListener('DOMContentLoaded', () => {
    // Create Quick Note button and add to DOM
    const quickNoteBtn = document.createElement('div');
    quickNoteBtn.className = 'quick-note-btn';
    quickNoteBtn.innerHTML = '<i class="fas fa-pen"></i>';
    document.body.appendChild(quickNoteBtn);
    
    // Create Note Modal
    const noteModal = document.createElement('div');
    noteModal.className = 'note-modal';
    noteModal.innerHTML = `
      <h3>Quick Thought</h3>
      <textarea id="quick-note-text" placeholder="Jot down your ideas, thoughts, or code snippets..."></textarea>
      <div class="note-modal-buttons">
        <button class="cancel-note">Cancel</button>
        <button class="save-note">Save</button>
      </div>
    `;
    document.body.appendChild(noteModal);
    
    // Open note modal
    quickNoteBtn.addEventListener('click', () => {
      noteModal.classList.add('open');
      document.getElementById('quick-note-text').focus();
      
      // Change button icon
      quickNoteBtn.innerHTML = '<i class="fas fa-times"></i>';
    });
    
    // Cancel note
    const cancelBtn = noteModal.querySelector('.cancel-note');
    cancelBtn.addEventListener('click', () => {
      noteModal.classList.remove('open');
      document.getElementById('quick-note-text').value = '';
      
      // Reset button icon
      quickNoteBtn.innerHTML = '<i class="fas fa-pen"></i>';
    });
    
    // Save note
    const saveBtn = noteModal.querySelector('.save-note');
    saveBtn.addEventListener('click', () => {
      const noteText = document.getElementById('quick-note-text').value.trim();
      
      if (noteText) {
        // Save note to local storage
        saveNoteToLocalStorage(noteText);
        
        // Show success message
        showNotification('Note saved successfully!');
        
        // Clear textarea and close modal
        document.getElementById('quick-note-text').value = '';
        noteModal.classList.remove('open');
        
        // Reset button icon
        quickNoteBtn.innerHTML = '<i class="fas fa-pen"></i>';
      } else {
        showNotification('Please enter some text before saving.', 'error');
      }
    });
    
    // Save note to local storage
    function saveNoteToLocalStorage(text) {
      // Get existing notes or initialize empty array
      const existingNotes = JSON.parse(localStorage.getItem('devNotes')) || [];
      
      // Add new note with timestamp
      const newNote = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString(),
        tags: extractHashtags(text)
      };
      
      existingNotes.push(newNote);
      
      // Save back to local storage
      localStorage.setItem('devNotes', JSON.stringify(existingNotes));
    }
    
    // Extract hashtags from note text
    function extractHashtags(text) {
      const hashtagRegex = /#(\w+)/g;
      const matches = text.match(hashtagRegex);
      
      if (matches) {
        return matches.map(tag => tag.substring(1));
      }
      
      return [];
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      // Show notification with animation
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  
    // Add scroll progress indicator
    if (document.querySelector('.module-container')) {
      // Create scroll progress element
      const scrollProgress = document.createElement('div');
      scrollProgress.className = 'scroll-progress';
      scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
      document.body.appendChild(scrollProgress);
      
      // Update progress bar on scroll
      window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / docHeight) * 100;
        
        scrollProgress.querySelector('.scroll-progress-bar').style.width = `${progress}%`;
      });
    }
    
    // Add theme switcher panel
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      // Create theme panel button
      const themePanelBtn = document.createElement('button');
      themePanelBtn.className = 'theme-panel-btn';
      themePanelBtn.innerHTML = '<i class="fas fa-palette"></i>';
      themePanelBtn.title = 'Change theme';
      themeToggle.parentNode.appendChild(themePanelBtn);
      
      // Create theme panel
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
      
      // Toggle theme panel
      themePanelBtn.addEventListener('click', () => {
        themePanel.classList.toggle('show');
      });
      
      // Select theme
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
          
          // Save theme preference
          localStorage.setItem('theme-variant', theme);
          
          // Close panel
          themePanel.classList.remove('show');
        });
      });
      
      // Load saved theme variant
      const savedThemeVariant = localStorage.getItem('theme-variant');
      if (savedThemeVariant && savedThemeVariant !== 'default') {
        document.body.classList.add(`${savedThemeVariant}-theme`);
      }
    }
    
    // Add blog tag filtering if on blog page
    if (document.querySelector('.blog-entries')) {
      // Add filter controls
      const blogSection = document.querySelector('.blog-section');
      const filtersDiv = document.createElement('div');
      filtersDiv.className = 'blog-filters';
      filtersDiv.innerHTML = `
        <button class="blog-filter active" data-filter="all">All</button>
        <button class="blog-filter" data-filter="milestone">Milestones</button>
        <button class="blog-filter" data-filter="struggle">Struggles</button>
        <button class="blog-filter" data-filter="insight">Insights</button>
        <button class="blog-filter" data-filter="achievement">Achievements</button>
      `;
      
      // Insert filters after the section header
      const sectionHeader = blogSection.querySelector('.section-header');
      sectionHeader.after(filtersDiv);
      
      // Add tags to existing blog entries (for demo)
      const blogEntries = document.querySelectorAll('.blog-entry');
      
      // For the demo, assign random tags to entries
      const tagTypes = ['milestone', 'struggle', 'insight', 'achievement'];
      
      blogEntries.forEach(entry => {
        const entryContent = entry.querySelector('.entry-content');
        const tagType = tagTypes[Math.floor(Math.random() * tagTypes.length)];
        
        const tagSpan = document.createElement('div');
        tagSpan.className = `blog-tag ${tagType}`;
        tagSpan.textContent = tagType.charAt(0).toUpperCase() + tagType.slice(1);
        
        // Add tag after title
        const entryTitle = entryContent.querySelector('h3');
        entryTitle.after(tagSpan);
        
        // Add data attribute for filtering
        entry.setAttribute('data-tag', tagType);
      });
      
      // Filter functionality
      const filterButtons = filtersDiv.querySelectorAll('.blog-filter');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const filter = button.getAttribute('data-filter');
          
          // Show/hide entries based on filter
          blogEntries.forEach(entry => {
            if (filter === 'all' || entry.getAttribute('data-tag') === filter) {
              entry.style.display = 'flex';
            } else {
              entry.style.display = 'none';
            }
          });
        });
      });
    }
  });