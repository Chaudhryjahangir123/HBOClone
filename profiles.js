const ProfileManager = (() => {
    class Profile {
        constructor(name, imageSrc, borderColor) {
            this.name = name;
            this.imageSrc = imageSrc;
            this.borderColor = borderColor;
        }

        // Method to render the profile with a cross button for deletion
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

            // Add click event to redirect to mainhome.html
            img.onclick = () => {
                window.location.href = 'mainhome.html'; // Redirect to mainhome.html
            };

            // Create name element
            const nameElement = document.createElement('h2');
            nameElement.textContent = this.name;

            // Create delete (cross) button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖'; // Cross symbol
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => {
                profileDiv.remove(); // Remove the profile from the DOM
            };

            // Append image, name, and delete button to the profile div
            profileDiv.appendChild(img);
            profileDiv.appendChild(nameElement);
            profileDiv.appendChild(deleteButton); // Add cross button below

            return profileDiv;
        }
    }

    const profiles = []; // Array to hold profiles
    let selectedImageSrc = ''; // Variable to store the chosen image path

    // Function to initialize profiles and add them to the HTML
    const initializeProfiles = () => {
        // Example profiles (You can add more profiles here if needed)
        const initialProfiles = [
            new Profile('Jahangir', 'Images/avatar.png', '#3a8aff'),
            new Profile('Sansa', 'Images/avatar2.png', '#ff4081')
        ];

        // Get the profiles container from HTML
        const profilesContainer = document.querySelector('.profiles');

        // Add each profile to the container
        initialProfiles.forEach(profile => {
            profilesContainer.appendChild(profile.renderProfile());
            profiles.push(profile); // Store profiles in the array
        });
    };

    // Function to handle profile picture selection
    const selectProfilePicture = (event) => {
        // Remove 'selected' class from all options
        document.querySelectorAll('.profile-pic-option').forEach(pic => {
            pic.classList.remove('selected');
        });

        // Add 'selected' class to clicked image and store its src
        event.target.classList.add('selected');
        selectedImageSrc = event.target.getAttribute('data-src');
    };

    // Function to show the popup form
    const showPopup = () => {
        const popup = document.getElementById('popupForm');
        popup.style.display = 'flex'; // Show popup
    };

    // Function to hide the popup form
    const hidePopup = () => {
        const popup = document.getElementById('popupForm');
        popup.style.display = 'none'; // Hide popup
    };

    // Function to add a new profile with input validation
    const addNewProfile = () => {
        const profileName = document.getElementById('profileName').value.trim();
        const profileType = document.getElementById('profileType').value;
        const namePattern = /^[A-Za-z]+$/; // Only allows alphabets

        // Validate profile name and check if a picture is selected
        if (!profileName || !namePattern.test(profileName)) {
            alert('Please enter a valid profile name using only alphabets.');
            return; // Stop if validation fails
        }
        if (!selectedImageSrc) {
            alert('Please select a profile picture.');
            return; // Stop if no picture is selected
        }

        let borderColor = profileType === 'adult' ? '#3a8aff' : '#ff4081';
        const newProfile = new Profile(profileName, selectedImageSrc, borderColor);
        const profilesContainer = document.querySelector('.profiles');
        profilesContainer.appendChild(newProfile.renderProfile());
        profiles.push(newProfile); // Store the new profile

        // Clear input fields and hide popup
        document.getElementById('profileName').value = '';
        selectedImageSrc = ''; // Reset the selected image
        hidePopup();
    };

    // Function to set up event listeners
    const setupEventListeners = () => {
        // Attach click event to each profile picture option
        document.querySelectorAll('.profile-pic-option').forEach(pic => {
            pic.addEventListener('click', selectProfilePicture);
        });

        // Event listeners for add profile buttons
        document.getElementById('addAdult').addEventListener('click', showPopup);
        document.getElementById('addKid').addEventListener('click', showPopup);

        // Save and cancel buttons in the popup
        document.getElementById('saveProfile').addEventListener('click', addNewProfile);
        document.getElementById('cancelProfile').addEventListener('click', hidePopup);
    };

    // Public method to initialize the profile manager
    const init = () => {
        initializeProfiles();
        setupEventListeners();
    };

    return {
        init
    };
})();

// Initialize profiles when the DOM is ready
document.addEventListener('DOMContentLoaded', ProfileManager.init);
