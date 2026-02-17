// Main entry point for the plugin

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        :root {
            --background: #ffffff;
            --foreground: #09090b;
            --muted: #f4f4f5;
            --muted-foreground: #71717a;
            --card: #ffffff;
            --card-foreground: #09090b;
            --border: #e4e4e7;
            --primary: #18181b;
            --primary-foreground: #fafafa;
            --radius: 0.5rem;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        body {
            font-family: var(--font-sans);
            padding: 16px;
            margin: 0;
            background-color: var(--background);
            color: var(--foreground);
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            overflow: hidden; 
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* --- Header & Content --- */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            width: 100%;
            position: relative;
        }
        
        .header-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .header-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .btn-icon {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            color: var(--muted-foreground);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-icon:hover {
            background-color: var(--muted);
            color: var(--foreground);
        }

        .btn-icon svg {
            width: 18px;
            height: 18px;
        }

        .color-preview-large {
            width: 72px;
            height: 72px;
            border-radius: 100%;
            border: 1px solid var(--border);
            margin-bottom: 16px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
        
        .color-preview-large:active {
            transform: scale(0.95);
        }

        .primary-hex {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.05em;
            color: var(--foreground);
        }

        .color-grid {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            /* animation: slideUp 0.4s ease-out 0.1s both; */
        }

        .color-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            background-color: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            transition: all 0.2s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .color-row:hover {
            border-color: #d4d4d8;
            background-color: #fafafa;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .color-label {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--muted-foreground);
            width: 32px;
            letter-spacing: 0.05em;
        }

        .color-value {
            font-family: 'Roboto Mono', monospace;
            font-size: 12px;
            color: var(--foreground);
            flex-grow: 1;
            text-align: right;
            margin-right: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .copy-icon {
            color: var(--muted-foreground);
            opacity: 0.5;
            transition: opacity 0.2s;
        }
        
        .color-row:hover .copy-icon {
            opacity: 1;
            color: var(--primary);
        }

        /* --- Empty State --- */
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            color: var(--muted-foreground);
            padding: 20px;
            animation: fadeIn 0.5s ease-out;
        }
        
        .empty-illustration {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
            color: #e4e4e7;
            /* Simple floating animation */
            animation: float 6s ease-in-out infinite;
        }

        .empty-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--foreground);
            margin-bottom: 8px;
        }

        .empty-desc {
            font-size: 12px;
            line-height: 1.5;
            max-width: 200px;
        }

        /* --- Feedback View --- */
        .feedback-view {
            display: flex;
            flex-direction: column;
            height: 100%;
            animation: slideInRight 0.3s ease-out;
        }

        .feedback-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .feedback-title {
            font-size: 16px;
            font-weight: 600;
            margin-left: 12px;
        }

        .feedback-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            flex-grow: 1;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .form-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--muted-foreground);
        }

        .form-input, .form-textarea {
            padding: 10px;
            font-family: var(--font-sans);
            font-size: 13px;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            outline: none;
            transition: border-color 0.2s;
            resize: none;
        }

        .form-input:focus, .form-textarea:focus {
            border-color: var(--foreground);
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border: none;
            padding: 10px 24px;
            border-radius: 99px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.1s, box-shadow 0.2s;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .btn-primary:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .btn-primary:active:not(:disabled) {
            transform: translateY(0);
        }

        /* --- Onboarding Overlay --- */
        .onboarding-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(4px);
            z-index: 50;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
            box-sizing: border-box;
            transition: opacity 0.3s ease, visibility 0.3s;
        }

        .onboarding-overlay.hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .onboarding-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #FF6B6B 0%, #556270 100%); /* Example gradient */
            border-radius: 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 10px 25px -5px rgba(255, 107, 107, 0.3);
        }

        .onboarding-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
            color: var(--foreground);
            letter-spacing: -0.025em;
        }

        .onboarding-text {
            font-size: 13px;
            color: var(--muted-foreground);
            text-align: center;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        .feature-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            margin-bottom: 32px;
        }

        .feature-item {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: var(--foreground);
        }

        .feature-icon {
            margin-right: 12px;
            color: var(--primary);
            width: 16px;
            height: 16px;
        }

        /* Toast Notification */
        .toast {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background-color: var(--primary);
            color: var(--primary-foreground);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            white-space: nowrap;
            z-index: 100;
        }

        .toast.visible {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        /* Utility */
        .hidden {
            display: none !important;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
    
    <!-- Onboarding Overlay -->
    <div id="onboarding" class="onboarding-overlay hidden">
        <div class="onboarding-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
        </div>
        <div class="onboarding-title">Color Catcher</div>
        <div class="onboarding-text">The professional color utility designed for your workflow.</div>
        
        <div class="feature-list">
            <div class="feature-item">
                <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Instant Hex, RGB, HSL & CSS values
            </div>
            <div class="feature-item">
                <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                One-click clipboard copy
            </div>
            <div class="feature-item">
                <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Works with any solid fill layer
            </div>
        </div>

        <button id="btn-start" class="btn-primary">Get Started</button>
    </div>

    <!-- Main View (Colors) -->
    <div id="main-view">
        <div class="header" style="justify-content: flex-end; margin-bottom: 0;">
             <button id="btn-feedback-open" class="btn-icon" title="Send Feedback">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </button>
        </div>

        <div id="content" class="hidden">
            <div class="header-center">
                <div id="swatch" class="color-preview-large"></div>
                <div id="primary-hex" class="primary-hex">#000000</div>
            </div>

            <div class="color-grid">
                <!-- Color Rows ... -->
                <div class="color-row" role="button" data-target="val-hex">
                    <span class="color-label">HEX</span>
                    <span id="val-hex" class="color-value">#000000</span>
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
                <div class="color-row" role="button" data-target="val-rgb">
                    <span class="color-label">RGB</span>
                    <span id="val-rgb" class="color-value">255, 255, 255</span>
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
                <div class="color-row" role="button" data-target="val-hsl">
                    <span class="color-label">HSL</span>
                    <span id="val-hsl" class="color-value">0, 0%, 100%</span>
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
                <div class="color-row" role="button" data-target="val-css">
                    <span class="color-label">CSS</span>
                    <span id="val-css" class="color-value">rgb(255, 255, 255)</span>
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div id="empty-state" class="empty-state">
            <svg class="empty-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.1" d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z" fill="currentColor"/>
                <path d="M100 45C69.6243 45 45 69.6243 45 100C45 130.376 69.6243 155 100 155C130.376 155 155 130.376 155 100" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <path d="M155 100C155 85 145 80 145 65C145 50 155 45 155 45" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="0 1"/>
                <circle cx="100" cy="100" r="15" fill="currentColor"/>
                <circle cx="70" cy="80" r="6" fill="currentColor" fill-opacity="0.4"/>
                <circle cx="130" cy="80" r="6" fill="currentColor" fill-opacity="0.4"/>
                <circle cx="85" cy="130" r="6" fill="currentColor" fill-opacity="0.4"/>
            </svg>
            <div class="empty-title">No Color Detected</div>
            <div class="empty-desc">Select any shape with a solid fill to instantly capture its palette.</div>
        </div>
    </div>

    <!-- Feedback View -->
    <div id="feedback-view" class="feedback-view hidden">
        <div class="feedback-header">
            <button id="btn-feedback-close" class="btn-icon" title="Go Back">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <span class="feedback-title">Send Feedback</span>
        </div>
        
        <form id="feedback-form" class="feedback-form">
            <div class="form-group">
                <label class="form-label" for="feedback-msg">Your Message</label>
                <textarea id="feedback-msg" class="form-textarea" rows="6" placeholder="Bugs, feature requests, or just love..." required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="feedback-email">Email (Optional)</label>
                <input id="feedback-email" type="email" class="form-input" placeholder="If you'd like a reply">
            </div>
            <div style="flex-grow: 1;"></div>
            <button type="submit" id="btn-submit" class="btn-primary">
                Send Feedback
            </button>
        </form>
    </div>

    <!-- Toast -->
    <div id="toast" class="toast">Copied to clipboard</div>
    
    <!-- Hidden Textarea for Fallback Copy -->
    <textarea id="copy-area" style="position: absolute; left: -9999px;"></textarea>

    <script>
        const els = {
            onboarding: document.getElementById('onboarding'),
            mainView: document.getElementById('main-view'),
            feedbackView: document.getElementById('feedback-view'),
            content: document.getElementById('content'),
            empty: document.getElementById('empty-state'),
            swatch: document.getElementById('swatch'),
            hexPrimary: document.getElementById('primary-hex'),
            valHex: document.getElementById('val-hex'),
            valRgb: document.getElementById('val-rgb'),
            valHsl: document.getElementById('val-hsl'),
            valCss: document.getElementById('val-css'),
            toast: document.getElementById('toast'),
            copyArea: document.getElementById('copy-area'),
            btnStart: document.getElementById('btn-start'),
            btnFeedbackOpen: document.getElementById('btn-feedback-open'),
            btnFeedbackClose: document.getElementById('btn-feedback-close'),
            feedbackForm: document.getElementById('feedback-form'),
            feedbackMsg: document.getElementById('feedback-msg'),
            feedbackEmail: document.getElementById('feedback-email'),
            btnSubmit: document.getElementById('btn-submit')
        };

        // --- View Switching ---
        els.btnFeedbackOpen.onclick = () => {
            els.mainView.classList.add('hidden');
            els.feedbackView.classList.remove('hidden');
        };
        
        els.btnFeedbackClose.onclick = () => {
            els.feedbackView.classList.add('hidden');
            els.mainView.classList.remove('hidden');
        };

        // --- Feedback Submission ---
        els.feedbackForm.onsubmit = async (e) => {
            e.preventDefault();
            const msg = els.feedbackMsg.value;
            const email = els.feedbackEmail.value;

            if (!msg) return;

            els.btnSubmit.disabled = true;
            els.btnSubmit.textContent = 'Sending...';

            try {
                // Production Vercel URL
                const res = await fetch('https://color-catcher-blush.vercel.app/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: msg, email: email })
                });

                if (res.ok) {
                    showToast("Feedback sent!");
                    els.feedbackMsg.value = "";
                    els.feedbackView.classList.add('hidden');
                    els.mainView.classList.remove('hidden');
                } else {
                    throw new Error('Server responded with error');
                }

            } catch (err) {
                console.error(err);
                showToast("Failed to send");
            } finally {
                els.btnSubmit.disabled = false;
                els.btnSubmit.textContent = 'Send Feedback';
            }
        };


        // --- Onboarding Logic ---
        els.btnStart.onclick = () => {
             els.onboarding.classList.add('hidden');
             parent.postMessage({ pluginMessage: { type: 'complete-onboarding' } }, '*');
        };

        // --- Messaging Logic ---
        window.onmessage = (event) => {
            const { type, data } = event.data.pluginMessage;
            
            if (type === 'show-onboarding') {
                els.onboarding.classList.remove('hidden');
            }
            
            if (type === 'update-color') {
                if (data) {
                    renderData(data);
                    showContent(true);
                } else {
                    showContent(false);
                }
            }
        };

        function renderData(data) {
            els.swatch.style.backgroundColor = data.hex;
            els.hexPrimary.textContent = data.hex;
            
            els.valHex.textContent = data.hex;
            els.valRgb.textContent = data.rgb;
            els.valHsl.textContent = data.hsl;
            els.valCss.textContent = data.css;
        }

        function showContent(hasData) {
            if (hasData) {
                els.content.classList.remove('hidden');
                els.empty.classList.add('hidden');
            } else {
                els.content.classList.add('hidden');
                els.empty.classList.remove('hidden');
            }
        }

        // --- Copy Logic ---
        document.querySelectorAll('.color-row').forEach(row => {
            row.addEventListener('click', async (e) => {
                const targetId = row.getAttribute('data-target');
                const targetEl = document.getElementById(targetId);
                const text = targetEl.textContent;

                if (text) {
                    await copyText(text);
                    showToast();
                }
            });
        });

        async function copyText(text) {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    throw new Error("Clipboard API unavailable");
                }
            } catch (err) {
                // Fallback
                els.copyArea.value = text;
                els.copyArea.select();
                try {
                    document.execCommand('copy');
                } catch (e) {
                    console.error("Copy failed", e);
                }
            }
        }

        let toastTimeout;
        function showToast(msg) {
            if(msg) els.toast.textContent = msg;
            else els.toast.textContent = "Copied to clipboard";

            els.toast.classList.add('visible');
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                els.toast.classList.remove('visible');
            }, 2000);
        }
    </script>
</body>
</html>
`;

figma.showUI(htmlContent, { width: 280, height: 420 });

/**
 * Converts Figma's 0-1 RGB values to standard HEX format
 * Figma uses 0-1 range, but HEX uses 0-255, so we multiply by 255
 * @example rgbToHex(1, 0, 0) => "#FF0000" (red)
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex; // Pad single digits
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to HSL (Hue, Saturation, Lightness)
 * HSL is often more intuitive for designers than RGB
 * @example rgbToHsl(1, 0, 0) => "hsl(0, 100%, 50%)" (red)
 */
function rgbToHsl(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  // Only calculate hue and saturation if the color isn't grayscale
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    // Calculate hue based on which channel is dominant
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convert to standard HSL format (degrees, percentages)
  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return `hsl(${hDeg}, ${sPct}%, ${lPct}%)`;
}

/**
 * Processes a color into all formats we support
 * Takes Figma's 0-1 RGB and returns HEX, RGB, HSL, and CSS formats
 */
function processColor(r: number, g: number, b: number) {
  const hex = rgbToHex(r, g, b);
  const r255 = Math.round(r * 255);
  const g255 = Math.round(g * 255);
  const b255 = Math.round(b * 255);

  return {
    hex: hex,
    rgb: `${r255}, ${g255}, ${b255}`,
    css: `rgb(${r255}, ${g255}, ${b255})`,
    hsl: rgbToHsl(r, g, b)
  };
}

/**
 * Finds the first visible solid fill in a layer
 * Figma layers can have multiple fills, but we only care about solid colors
 * @returns Color data object or null if no solid fill found
 */
function findSolidFill(node: SceneNode) {
  // Check if this node type supports fills (not all do!)
  if ("fills" in node) {
    const fills = node.fills as Paint[];
    const solidFill = fills.find(
      (fill) => fill.type === "SOLID" && fill.visible !== false
    ) as SolidPaint;

    if (solidFill) {
      const { r, g, b } = solidFill.color;
      return processColor(r, g, b);
    }
  }
  return null;
}

/**
 * Checks if the user has completed onboarding
 * Uses Figma's clientStorage to persist across sessions
 * If they haven't, we show the welcome overlay
 */
async function checkOnboarding() {
  try {
    const hasOnboarded = await figma.clientStorage.getAsync("hasOnboarded");
    if (!hasOnboarded) {
      figma.ui.postMessage({ type: "show-onboarding" });
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
}

/**
 * Updates the UI with color data from the current selection
 * Called whenever the user selects/deselects layers
 */
function updateUI() {
  const selection = figma.currentPage.selection;
  if (selection.length > 0) {
    // Extract color from the first selected layer
    const colorData = findSolidFill(selection[0]);
    figma.ui.postMessage({ type: "update-color", data: colorData });
  } else {
    // No selection - show empty state
    figma.ui.postMessage({ type: "update-color", data: null });
  }
}

// Listen for messages from the UI (like "onboarding complete")
figma.ui.onmessage = async (msg) => {
  if (msg.type === "complete-onboarding") {
    await figma.clientStorage.setAsync("hasOnboarded", true);
  }
};

// Listen for selection changes and update UI in real-time
figma.on("selectionchange", updateUI);

// Initialize the plugin
(async () => {
  await checkOnboarding();  // Check if we should show onboarding
  updateUI();               // Show current selection (if any)
})();
