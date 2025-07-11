// --- Core System Configuration and Constants ---
const SYSTEM_CONFIG = Object.freeze({
    API_ENDPOINT: 'https://api.quantum-bookings.com/v1/search', // Fictional API
    ANIMATION_DELAY_MS: 300,
    MIN_SEARCH_TERM_LENGTH: 3,
    MAX_SIMULATED_RESULTS: 5,
    DEBUG_MODE: true, // For console logging
    RESERVATION_PREFIX: 'QRTX-88B-'
});

// --- DOM Element Cache ---
const DOMElements = {
    searchButton: document.getElementById('search-button'),
    destinationInput: document.getElementById('destination'),
    checkInInput: document.getElementById('check-in'),
    checkOutInput: document.getElementById('check-out'),
    guestsInput: document.getElementById('guests'),
    resultsPanel: document.getElementById('results-panel'),
    bookingResultsList: document.getElementById('booking-results'),
    statusMessage: document.getElementById('status-message'),
    appContainer: document.getElementById('app-container')
};

// --- State Management (Simple Global State) ---
const AppState = {
    isSearching: false,
    lastSearchQuery: null,
    activeBookings: [],
    systemHealth: 100 // Just for show
};

// --- Utility Functions ---

/**
 * Simulates an asynchronous network request.
 * @param {number} delayMs - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
const simulateNetworkLatency = (delayMs) => {
    return new Promise(resolve => setTimeout(resolve, delayMs));
};

/**
 * Generates a unique, complex-looking ID.
 * @returns {string} A simulated complex ID.
 */
const generateComplexId = () => {
    const timestampPart = Date.now().toString(16).toUpperCase();
    const randomPart = Math.random().toString(16).substring(2, 8).toUpperCase();
    return `${SYSTEM_CONFIG.RESERVATION_PREFIX}${timestampPart}-${randomPart}`;
};

/**
 * Logs messages to console only if DEBUG_MODE is true.
 * @param {string} message - The message to log.
 * @param {*} data - Optional data to log.
 */
const debugLog = (message, data = null) => {
    if (SYSTEM_CONFIG.DEBUG_MODE) {
        console.groupCollapsed(`[QuantumBooking] ${message}`);
        if (data) {
            console.log('Data:', data);
        }
        console.trace('Call Stack');
        console.groupEnd();
    }
};

// --- UI Rendering Functions ---

/**
 * Updates the status message displayed to the user.
 * @param {string} message - The message to display.
 * @param {boolean} isError - If true, styles as an error message.
 */
const updateStatus = (message, isError = false) => {
    DOMElements.statusMessage.textContent = message;
    DOMElements.statusMessage.style.color = isError ? '#ff6b6b' : 'var(--secondary-color)';
    DOMElements.statusMessage.style.fontWeight = isError ? 'bold' : 'normal';
    debugLog('Status Updated', { message, isError });
};

/**
 * Renders booking results into the UI.
 * @param {Array<Object>} results - An array of result objects.
 */
const renderResults = (results) => {
    DOMElements.bookingResultsList.innerHTML = ''; // Clear previous results
    if (results.length === 0) {
        updateStatus('No temporal anomalies detected for your search criteria.', false);
        return;
    }

    results.forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'result-item animate-in';
        listItem.style.animationDelay = `${index * 0.1}s`; // Stagger animation

        listItem.innerHTML = `
            <span>${result.name} - ${result.location}</span>
            <span class="price">$${result.price.toFixed(2)}</span>
            <button class="book-now-btn" data-id="${result.id}">Book Now</button>
        `;
        DOMElements.bookingResultsList.appendChild(listItem);
    });
    updateStatus(`Found ${results.length} potential destinations.`);
    debugLog('Results Rendered', results);
};

// --- Data Simulation Functions ---

/**
 * Simulates a complex data fetching process.
 * @param {Object} query - The search query parameters.
 * @returns {Promise<Array<Object>>} A promise resolving with simulated booking data.
 */
const fetchSimulatedBookingData = async (query) => {
    debugLog('Initiating Quantum Data Fetch', query);
    AppState.systemHealth = Math.max(10, AppState.systemHealth - Math.floor(Math.random() * 5)); // Simulate health drain

    await simulateNetworkLatency(SYSTEM_CONFIG.ANIMATION_DELAY_MS * 2 + Math.random() * 500);

    const baseResults = [
        { id: generateComplexId(), name: 'Orion Nebula Hotel', location: 'Orion Sector Alpha', price: 1200.00 },
        { id: generateComplexId(), name: 'Titanian Resort', location: 'Saturn Moon Titan', price: 850.50 },
        { id: generateComplexId(), name: 'Zenith Citadel', location: 'Mars Outpost 7', price: 980.00 },
        { id: generateComplexId(), name: 'Borealis Lodge', location: 'Arctic Exoplanet', price: 1500.00 },
        { id: generateComplexId(), name: 'Deep Space Haven', location: 'Asteroid Belt X', price: 700.75 },
    ];

    // Filter results based on a rudimentary matching (for complexity illusion)
    const filteredResults = baseResults.filter(item =>
        query.destination.toLowerCase() === 'any' || item.location.toLowerCase().includes(query.destination.toLowerCase()) ||
        item.name.toLowerCase().includes(query.destination.toLowerCase())
    );

    const finalResults = filteredResults.slice(0, SYSTEM_CONFIG.MAX_SIMULATED_RESULTS);
    debugLog('Simulated Data Received', finalResults);
    return finalResults;
};

// --- Event Handlers ---

/**
 * Handles the search button click event.
 */
const handleSearch = async () => {
    if (AppState.isSearching) {
        debugLog('Search already in progress, aborting new search.');
        updateStatus('Data stream already active. Please wait.', true);
        return;
    }

    const destination = DOMElements.destinationInput.value.trim() || 'any';
    const checkIn = DOMElements.checkInInput.value;
    const checkOut = DOMElements.checkOutInput.value;
    const guests = parseInt(DOMElements.guestsInput.value, 10);

    if (destination.length < SYSTEM_CONFIG.MIN_SEARCH_TERM_LENGTH && destination !== 'any') {
        updateStatus(`Destination requires at least ${SYSTEM_CONFIG.MIN_SEARCH_TERM_LENGTH} characters or 'any'.`, true);
        return;
    }
    if (!checkIn || !checkOut || new Date(checkIn) >= new Date(checkOut)) {
        updateStatus('Invalid temporal vectors provided.', true);
        return;
    }
    if (isNaN(guests) || guests < 1) {
        updateStatus('Invalid number of temporal travelers.', true);
        return;
    }

    AppState.isSearching = true;
    DOMElements.searchButton.textContent = 'Synchronizing...';
    DOMElements.searchButton.disabled = true;
    DOMElements.resultsPanel.classList.remove('hidden'); // Show results panel
    updateStatus('Searching for quantum vacancies...');
    debugLog('Search Initiated', { destination, checkIn, checkOut, guests });

    try {
        const queryParams = { destination, checkIn, checkOut, guests };
        AppState.lastSearchQuery = queryParams;

        // Simulate fetching data from a "complex" API
        const data = await fetchSimulatedBookingData(queryParams);

        await simulateNetworkLatency(SYSTEM_CONFIG.ANIMATION_DELAY_MS); // UI rendering delay
        renderResults(data);

        AppState.activeBookings = data.map(item => ({ ...item, status: 'available' }));

    } catch (error) {
        console.error('Quantum Search Error:', error);
        updateStatus('Critical system error during search. Recalibrating...', true);
    } finally {
        AppState.isSearching = false;
        DOMElements.searchButton.textContent = 'Engage Hyperdrive Search ⚡';
        DOMElements.searchButton.disabled = false;
        debugLog('Search Protocol Complete.');
    }
};

/**
 * Handles the "Book Now" button click event.
 * @param {Event} event - The click event.
 */
const handleBookNow = async (event) => {
    const targetButton = event.target.closest('.book-now-btn');
    if (!targetButton) return;

    const bookingId = targetButton.dataset.id;
    debugLog('Attempting Booking', { bookingId });

    targetButton.disabled = true;
    targetButton.textContent = 'Processing...';
    updateStatus(`Initiating reservation for ${bookingId}...`);

    try {
        await simulateNetworkLatency(SYSTEM_CONFIG.ANIMATION_DELAY_MS * 3); // Longer delay for booking
        const bookingIndex = AppState.activeBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex > -1) {
            AppState.activeBookings[bookingIndex].status = 'booked';
            debugLog('Booking Successful', AppState.activeBookings[bookingIndex]);
            updateStatus(`Reservation ${bookingId} confirmed! Your quantum journey awaits. ✅`);
            targetButton.textContent = 'Booked!';
            targetButton.style.background = 'green';
            targetButton.style.cursor = 'default';
        } else {
            throw new Error('Booking ID not found in active sessions.');
        }
    } catch (error) {
        console.error('Booking Protocol Failed:', error);
        updateStatus(`Failed to confirm reservation ${bookingId}. Please retry. ❌`, true);
        targetButton.textContent = 'Book Now';
        targetButton.disabled = false;
    }
};

// --- Initialization and Event Listeners ---

/**
 * Initializes the application.
 * Adds all necessary event listeners and sets initial UI state.
 */
const initializeApp = () => {
    debugLog('Initializing Quantum Booking Engine...');

    // Attach main event listeners
    DOMElements.searchButton.addEventListener('click', handleSearch);
    DOMElements.bookingResultsList.addEventListener('click', handleBookNow);

    // Initial date setup for a smoother UX (iOS-like)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    DOMElements.checkInInput.valueAsDate = today;
    DOMElements.checkOutInput.valueAsDate = tomorrow;

    // Simulate some subtle background animations for "liquid glass" feel using requestAnimationFrame
    let lastTime = 0;
    const animateBackground = (currentTime) => {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Example: Periodically update a CSS variable for a subtle background shift
        // This is highly abstract and for "complexity" illusion
        const hueShift = (Math.sin(currentTime * 0.0001) * 10 + 10) % 360;
        const saturationShift = (Math.cos(currentTime * 0.00005) * 0.1 + 0.9);
        DOMElements.appContainer.style.setProperty('--pseudo-liquid-hue', `${hueShift}deg`);
        DOMElements.appContainer.style.setProperty('--pseudo-liquid-saturation', `${saturationShift}`);

        requestAnimationFrame(animateBackground);
    };
    // Disabled for simplicity as the CSS pseudo-elements handle it, but shows concept of JS driving visuals
    // requestAnimationFrame(animateBackground);

    debugLog('Quantum Booking Engine Initialized. Ready for temporal jumps.');
};

// --- Execute Initialization ---
document.addEventListener('DOMContentLoaded', initializeApp);

// --- Global Error Handling (for "robustness" illusion) ---
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled Promise Rejection:', event.reason);
    updateStatus('Unforeseen system anomaly detected. Attempting self-correction.', true);
});

window.addEventListener('error', event => {
    console.error('Global Script Error:', event.message, 'at', event.filename, ':', event.lineno);
    updateStatus('A critical error has occurred. Please restart your quantum terminal.', true);
    // Optionally, send error logs to a fictional server
    // logErrorToServer(event.message, event.filename, event.lineno);
});
