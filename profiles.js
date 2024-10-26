// Profile class definition
class Profile {
    constructor(name, imageSrc, borderColor) {
        this.name = name;
        this.imageSrc = imageSrc;
        this.borderColor = borderColor;
    }

    // Method to render the profile into HTML
    renderProfile() {
        // Create profile div
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        // Create image element
        const img = document.createElement('img');
        img.src = this.imageSrc;
        img.alt = `${this.name}'s Avatar`;
        
        // Set hover effect for profile border
        img.onmouseover = () => img.style.borderColor = this.borderColor;
        img.onmouseout = () => img.style.borderColor = 'transparent';
        
        // Create name element
        const nameElement = document.createElement('h2');
        nameElement.textContent = this.name;

        // Append img and name to the profile div
        profileDiv.appendChild(img);
        profileDiv.appendChild(nameElement);

        return profileDiv;
    }
}

// Function to initialize profiles and add them to the HTML
function initializeProfiles() {
    // Array of profiles (You can add more profiles here if needed)
    const profiles = [
        new Profile('Jahangir', 'Images/avatar.png', '#3a8aff'),
        new Profile('Sansa', 'Images/avatar2.png', '#ff4081')
    ];

    // Get the profiles container from HTML
    const profilesContainer = document.querySelector('.profiles');

    // Add each profile to the container
    profiles.forEach(profile => {
        profilesContainer.appendChild(profile.renderProfile());
    });
}

// Function to show the popup form
function showPopup() {
    const popup = document.getElementById('popupForm');
    popup.style.display = 'flex'; // Show popup
}

// Function to hide the popup form
function hidePopup() {
    const popup = document.getElementById('popupForm');
    popup.style.display = 'none'; // Hide popup
}

// Function to add a new profile
function addNewProfile() {
    const profileName = document.getElementById('profileName').value;
    const profileType = document.getElementById('profileType').value;

    let borderColor = '';
    let imageSrc = '';

    // Set border color and image based on profile type
    if (profileType === 'adult') {
        borderColor = '#3a8aff'; // Blue border for adults
        imageSrc = 'Images/avatar.png';
    } else {
        borderColor = '#ff4081'; // Pink border for kids
        imageSrc = 'Images/avatar2.png';
    }

    const newProfile = new Profile(profileName, imageSrc, borderColor);
    const profilesContainer = document.querySelector('.profiles');
    profilesContainer.appendChild(newProfile.renderProfile());

    // Clear input fields and hide popup
    document.getElementById('profileName').value = '';
    hidePopup();
}

// Initialize profiles when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeProfiles();

    // Event listeners for add profile buttons
    document.getElementById('addAdult').addEventListener('click', showPopup);
    document.getElementById('addKid').addEventListener('click', showPopup);

    // Save and cancel buttons in the popup
    document.getElementById('saveProfile').addEventListener('click', addNewProfile);
    document.getElementById('cancelProfile').addEventListener('click', hidePopup);
});
