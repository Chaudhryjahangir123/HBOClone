const ProfileManager = (() => {
    // Singleton instance
    let instance;

    class Profile {
        constructor(name, imageSrc, borderColor) {
            this.name = name;
            this.imageSrc = imageSrc;
            this.borderColor = borderColor;
        }

        renderProfile() {
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');

            const img = document.createElement('img');
            img.src = this.imageSrc;
            img.alt = `${this.name}'s Avatar`;
            img.onmouseover = () => img.style.borderColor = this.borderColor;
            img.onmouseout = () => img.style.borderColor = 'transparent';
            img.onclick = () => {
                window.location.href = 'mainhome.html';
            };

            const nameElement = document.createElement('h2');
            nameElement.textContent = this.name;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => {
                profileDiv.remove();
            };

            profileDiv.appendChild(img);
            profileDiv.appendChild(nameElement);
            profileDiv.appendChild(deleteButton);

            return profileDiv;
        }
    }

    class ProfileManagerClass {
        constructor() {
            if (!instance) {
                instance = this;
            }
            this.profiles = [];
            this.selectedImageSrc = '';
            this.observers = [];
            return instance;
        }

        // Observer pattern methods
        addObserver(observer) {
            this.observers.push(observer);
        }

        removeObserver(observer) {
            this.observers = this.observers.filter(obs => obs !== observer);
        }

        notifyObservers(profile) {
            this.observers.forEach(observer => observer.update(profile));
        }

        initializeProfiles() {
            const initialProfiles = [
                new Profile('Jahangir', 'Images/avatar.png', '#3a8aff'),
                new Profile('Sansa', 'Images/avatar2.png', '#ff4081')
            ];

            const profilesContainer = document.querySelector('.profiles');
            initialProfiles.forEach(profile => {
                profilesContainer.appendChild(profile.renderProfile());
                this.profiles.push(profile);
            });
        }

        selectProfilePicture(event) {
            document.querySelectorAll('.profile-pic-option').forEach(pic => {
                pic.classList.remove('selected');
            });

            event.target.classList.add('selected');
            this.selectedImageSrc = event.target.getAttribute('data-src');
        }

        showPopup() {
            const popup = document.getElementById('popupForm');
            popup.style.display = 'flex';
        }

        hidePopup() {
            const popup = document.getElementById('popupForm');
            popup.style.display = 'none';
        }

        addNewProfile() {
            const profileName = document.getElementById('profileName').value.trim();
            const profileType = document.getElementById('profileType').value;
            const namePattern = /^[A-Za-z]+$/;

            if (!profileName || !namePattern.test(profileName)) {
                alert('Please enter a valid profile name using only alphabets.');
                return;
            }
            if (!this.selectedImageSrc) {
                alert('Please select a profile picture.');
                return;
            }

            let borderColor = profileType === 'adult' ? '#3a8aff' : '#ff4081';
            const newProfile = new Profile(profileName, this.selectedImageSrc, borderColor);
            const profilesContainer = document.querySelector('.profiles');
            profilesContainer.appendChild(newProfile.renderProfile());
            this.profiles.push(newProfile);

            this.notifyObservers(newProfile);

            document.getElementById('profileName').value = '';
            this.selectedImageSrc = '';
            this.hidePopup();
        }

        setupEventListeners() {
            document.querySelectorAll('.profile-pic-option').forEach(pic => {
                pic.addEventListener('click', (event) => this.selectProfilePicture(event));
            });

            document.getElementById('addAdult').addEventListener('click', () => this.showPopup());
            document.getElementById('addKid').addEventListener('click', () => this.showPopup());
            document.getElementById('saveProfile').addEventListener('click', () => this.addNewProfile());
            document.getElementById('cancelProfile').addEventListener('click', () => this.hidePopup());
        }

        init() {
            this.initializeProfiles();
            this.setupEventListeners();
        }
    }

    // Singleton return
    return new ProfileManagerClass();
})();

// Example observer (you can add any observer to respond to new profiles)
const profileObserver = {
    update(profile) {
        console.log('New profile added:', profile.name);
    }
};

// Register the observer and initialize profiles when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProfileManager.addObserver(profileObserver);
    ProfileManager.init();
});
