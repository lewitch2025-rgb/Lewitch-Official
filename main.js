// --- CONFIGURATION ---
const API_URL = "/chat";

// --- DOM ELEMENTS ---
const chatContainer = document.querySelector('.terminal-section'); // Where we will insert messages
const commandForm = document.getElementById('commandForm');
const userInput = document.querySelector('input[type="text"]');
const promptLabel = document.querySelector('.prompt');

// --- STATE MANAGEMENT ---
let isProcessing = false;

// --- EVENT LISTENERS ---
commandForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const text = userInput.value.trim();
    if (!text || isProcessing) return;

    // 1. Lock Input
    isProcessing = true;
    userInput.disabled = true;
    const originalPlaceholder = userInput.placeholder;
    userInput.placeholder = "TRANSMITTING TO SWARM...";

    // 2. Add User Command to UI (Mimic Terminal History)
    addLogEntry("USER", text);
    userInput.value = "";

    try {
        // 3. Send Request to Python Server
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: `User: ${text}\nAssistant:`, // Simple prompt formatting
                max_tokens: 512,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        
        // 4. Display AI Response
        // Note: The backend returns { "response": "..." }
        addLogEntry("LEWITCH_CORE", data.response);

    } catch (error) {
        console.error(error);
        addLogEntry("SYSTEM_ERR", "Connection to Neural Core failed. Ensure main.py is running.");
    } finally {
        // 5. Reset Input
        isProcessing = false;
        userInput.disabled = false;
        userInput.placeholder = originalPlaceholder;
        userInput.focus();
        
        // Auto-scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// --- HELPER FUNCTIONS ---

function addLogEntry(agent, message) {
    // Create the container for the new log
    const logDiv = document.createElement('div');
    logDiv.className = 'input-group';
    logDiv.style.marginTop = '10px';
    logDiv.style.alignItems = 'flex-start'; // Align text to top if multi-line

    // Determine color based on agent
    let colorClass = "dim";
    if (agent === "LEWITCH_CORE") colorClass = "accent"; // You'll need to define .accent in CSS or use inline style
    if (agent === "SYSTEM_ERR") colorClass = "error";

    // Style specifically for the agent name
    const agentSpan = document.createElement('span');
    agentSpan.className = 'prompt mono';
    agentSpan.style.color = agent === "LEWITCH_CORE" ? "#00ff41" : (agent === "SYSTEM_ERR" ? "red" : "#888");
    agentSpan.style.minWidth = "120px"; // Fixed width for alignment
    agentSpan.textContent = `${agent}:~$`;

    // The message content
    const msgSpan = document.createElement('span');
    msgSpan.className = 'mono';
    msgSpan.style.padding = "20px 0";
    msgSpan.style.color = "#fff";
    msgSpan.style.whiteSpace = "pre-wrap"; // Preserve formatting from AI
    msgSpan.textContent = message;

    logDiv.appendChild(agentSpan);
    logDiv.appendChild(msgSpan);

    // Insert before the current input form
    chatContainer.insertBefore(logDiv, commandForm);
}