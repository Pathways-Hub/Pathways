// Select the button element
const menuButton = document.getElementById('pmenu');

// Create the menu element
const menu = document.createElement('div');
menu.id = 'curved-menu';
menu.style.position = 'fixed';
menu.style.top = '0'; // Align the menu to the top of the screen
menu.style.right = '0'; // Align the menu to the right of the screen
menu.style.bottom = '0'; // Extend the menu to the bottom of the screen
menu.style.width = '250px'; // Set the menu width
menu.style.backgroundColor = 'white';
menu.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
menu.style.transform = 'translateX(100%)'; // Hide the menu initially
menu.style.transition = 'transform 0.3s ease-in-out, visibility 0s 0.3s'; // Add visibility transition
menu.style.visibility = 'hidden'; // Initially set the menu as invisible
menu.style.overflow = 'hidden'; // Ensure content doesn’t overflow
menu.style.display = 'flex';
menu.style.flexDirection = 'column';
menu.style.zIndex = '1002'; // Ensure the menu is above all other content

// Add the title to the menu
const menuTitle = document.createElement('div');
menuTitle.innerText = 'Menu';
menuTitle.style.fontSize = '16px';
menuTitle.style.fontWeight = 'bold';
menuTitle.style.padding = '10px';
menuTitle.style.borderBottom = '1px solid #ddd';
menuTitle.style.textAlign = 'left';

// Create the close icon button
const closeButton = document.createElement('button');
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.left = '10px';
closeButton.style.border = 'none';
closeButton.style.backgroundColor = 'transparent';
closeButton.style.cursor = 'pointer';
closeButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
closeButton.addEventListener('click', () => {
  isMenuVisible = false;
  menu.style.transform = 'translateX(100%)';
  menu.style.visibility = 'hidden';
  menu.style.transition = 'transform 0.3s ease-in-out, visibility 0s 0.3s';
});

// Append the close button next to the menu title
menuTitle.style.paddingLeft = '40px'; // Ensure the menu title doesn’t overlap with the close button
menu.appendChild(menuTitle);
menu.appendChild(closeButton);

// Add buttons and other elements (the same as in your original code)
// [button creation code here]

// Append the menu to the body
document.body.appendChild(menu);

// Add buttons and other elements
const buttons = [
  { text: 'Workspaces', link: 'workspaces.html' },
  { text: 'Interfaces', link: 'interfaces.html' },
  { text: 'Dates', link: 'calendar.html' },
  { text: 'Documents', link: 'documents.html' },
  { text: 'Tabs', link: 'tabs.html' }
];

buttons.forEach((buttonData, index) => {
  const button = document.createElement('button');
  button.innerText = buttonData.text;
  button.style.padding = '10px';
  button.style.border = 'none';
  button.style.backgroundColor = 'white';
  button.style.textAlign = 'left';
  button.style.cursor = 'pointer';
  button.style.width = '100%';

  // Highlight active button
  if (index === 0) {
    button.style.backgroundColor = '#f0f0f0';
    button.style.fontWeight = 'bold';
  }

  button.addEventListener('click', () => {
    buttons.forEach((_, idx) => {
      const allButtons = document.querySelectorAll('#curved-menu button');
      allButtons[idx].style.backgroundColor = 'white';
      allButtons[idx].style.fontWeight = 'normal';
    });

    button.style.backgroundColor = '#f0f0f0';
    button.style.fontWeight = 'bold';
    if (buttonData.link) {
      window.location.href = buttonData.link;
    }
    updateLastEdited();
  });

  menu.appendChild(button);
});

// Add a divider line after the zone buttons
const zoneDivider = document.createElement('div');
zoneDivider.style.borderBottom = '1px solid #ddd';
zoneDivider.style.margin = '10px 0';
menu.appendChild(zoneDivider);

// Add subtitle above the theme toggle section
const themeSubtitle = document.createElement('div');
themeSubtitle.innerText = 'Theme';
themeSubtitle.style.fontSize = '14px';
themeSubtitle.style.fontWeight = 'normal';
themeSubtitle.style.padding = '10px';
themeSubtitle.style.textAlign = 'left';
menu.appendChild(themeSubtitle);

// Add sun and moon icons for theme toggle
const themeToggleContainer = document.createElement('div');
themeToggleContainer.style.display = 'flex';
themeToggleContainer.style.justifyContent = 'space-between';
themeToggleContainer.style.padding = '10px';

// Create the sun button (light mode)
const sunButton = document.createElement('button');
sunButton.innerHTML = '<i class="fas fa-sun" style="color: #f0c100;"></i>';
sunButton.style.border = 'none';
sunButton.style.backgroundColor = 'white';
sunButton.style.cursor = 'pointer';
sunButton.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  updateHeaderBackground();
  localStorage.setItem('theme', 'light');
});

// Create the moon button (dark mode)
const moonButton = document.createElement('button');
moonButton.innerHTML = '<i class="fas fa-moon" style="color: #6c757d;"></i>';
moonButton.style.border = 'none';
moonButton.style.backgroundColor = 'white';
moonButton.style.cursor = 'pointer';
moonButton.addEventListener('click', () => {
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
  updateHeaderBackground();
  localStorage.setItem('theme', 'dark');
});

themeToggleContainer.appendChild(sunButton);
themeToggleContainer.appendChild(moonButton);
menu.appendChild(themeToggleContainer);

// Append the menu to the body
document.body.appendChild(menu);

// Set default theme based on localStorage or use light mode by default
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme + '-mode');
updateHeaderBackground();

// Function to update header background color based on theme
function updateHeaderBackground() {
  const header = document.querySelector('header');
  if (document.body.classList.contains('dark-mode')) {
    header.style.backgroundColor = '#121212';
  } else {
    header.style.backgroundColor = '#ffffff';
  }
}

// Toggle menu visibility
let isMenuVisible = false;
menuButton.addEventListener('click', () => {
  isMenuVisible = !isMenuVisible;
  menu.style.transform = isMenuVisible ? 'translateX(0)' : 'translateX(100%)';
  menu.style.visibility = isMenuVisible ? 'visible' : 'hidden';
  menu.style.transition = isMenuVisible ? 'transform 0.3s ease-in-out' : 'transform 0.3s ease-in-out, visibility 0s 0.3s';
});

// Create a "Last Edited" section
const lastEdited = document.createElement('div');
lastEdited.id = 'last-edited';
lastEdited.style.fontSize = '12px';
lastEdited.style.fontStyle = 'italic';
lastEdited.style.textAlign = 'left';
lastEdited.style.padding = '10px';
lastEdited.style.borderTop = '1px solid #ddd';
lastEdited.innerText = 'Last edited: Never'; // Default text
menu.appendChild(lastEdited);

// Function to update the "Last Edited" timestamp
function updateLastEdited() {
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  lastEdited.innerText = `Last edited: ${formattedTime}`;
}

// Listen for keydown events to detect typing
document.addEventListener('keydown', () => {
  updateLastEdited();
});

// Update logo based on theme
function updateLogo() {
  const logo = document.querySelector('#logo');
  if (document.body.classList.contains('dark-mode')) {
    logo.src = 'images/pathways light.png';
  } else {
    logo.src = 'images/pathways.png';
  }
}
sunButton.addEventListener('click', updateLogo);
moonButton.addEventListener('click', updateLogo);
updateLogo();
