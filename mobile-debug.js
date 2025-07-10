// Mobile Debug Console - Add to help troubleshoot issues on mobile devices
function initMobileDebugConsole() {
    // Only show debug console on mobile or when URL has debug parameter
    const showDebug = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.location.search.includes('debug=true');
    
    if (!showDebug) return;
    
    // Create debug console
    const debugConsole = document.createElement('div');
    debugConsole.id = 'mobile-debug-console';
    debugConsole.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        background: rgba(0,0,0,0.9);
        color: #00ff00;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        overflow-y: auto;
        padding: 10px;
        box-sizing: border-box;
        display: none;
    `;
    
    const debugOutput = document.createElement('div');
    debugOutput.id = 'debug-output';
    debugConsole.appendChild(debugOutput);
    
    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '🐛';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10001;
        background: #333;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 18px;
    `;
    
    toggleBtn.addEventListener('click', () => {
        debugConsole.style.display = debugConsole.style.display === 'none' ? 'block' : 'none';
    });
    
    document.body.appendChild(debugConsole);
    document.body.appendChild(toggleBtn);
    
    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    function addToDebug(type, ...args) {
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        
        const logEntry = document.createElement('div');
        logEntry.style.color = type === 'error' ? '#ff6b6b' : type === 'warn' ? '#ffa726' : '#00ff00';
        logEntry.textContent = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        debugOutput.appendChild(logEntry);
        debugOutput.scrollTop = debugOutput.scrollHeight;
        
        // Keep only last 50 entries
        if (debugOutput.children.length > 50) {
            debugOutput.removeChild(debugOutput.firstChild);
        }
    }
    
    console.log = function(...args) {
        originalLog.apply(console, args);
        addToDebug('log', ...args);
    };
    
    console.error = function(...args) {
        originalError.apply(console, args);
        addToDebug('error', ...args);
    };
    
    console.warn = function(...args) {
        originalWarn.apply(console, args);
        addToDebug('warn', ...args);
    };
    
    // Capture window errors
    window.addEventListener('error', (e) => {
        addToDebug('error', `Uncaught Error: ${e.message} at ${e.filename}:${e.lineno}`);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        addToDebug('error', `Unhandled Promise Rejection: ${e.reason}`);
    });
    
    console.log('Mobile debug console initialized');
}

// Initialize debug console
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDebugConsole);
} else {
    initMobileDebugConsole();
}
