// worker.js

// Listen for messages from the main thread
self.onmessage = function (event) {
    const { type, payload } = event.data;

    if (type === "validateProfile") {
        const { newProfile, existingProfiles } = payload;
        // Check for unique profile name
        const isUnique = !existingProfiles.some(profile => profile.name === newProfile.name);
        self.postMessage({
            type: "validationResult",
            isValid: isUnique,
        });
    }
};
