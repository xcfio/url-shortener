export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinkShrink - Modern URL Shortener</title>
    <style>
        :root {
            /* Light theme */
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --card-bg: rgba(255, 255, 255, 0.95);
            --text-primary: #333;
            --text-secondary: #666;
            --input-bg: rgba(255, 255, 255, 0.8);
            --input-border: #e0e6ed;
            --input-focus: #667eea;
            --button-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --result-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --history-gradient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            --shadow-color: rgba(0, 0, 0, 0.1);
            --border-color: rgba(255, 255, 255, 0.3);
        }

        [data-theme="dark"] {
            /* Dark theme */
            --bg-gradient: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            --card-bg: rgba(30, 30, 50, 0.95);
            --text-primary: #e2e8f0;
            --text-secondary: #a0aec0;
            --input-bg: rgba(45, 55, 75, 0.8);
            --input-border: #4a5568;
            --input-focus: #667eea;
            --button-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --result-gradient: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
            --history-gradient: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
            --shadow-color: rgba(0, 0, 0, 0.3);
            --border-color: rgba(255, 255, 255, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--bg-gradient);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow-x: hidden;
            transition: all 0.3s ease;
        }

        /* Animated background elements */
        body::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: float 20s infinite linear;
            z-index: 0;
        }

        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }

        .container {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 25px 50px var(--shadow-color);
            width: 100%;
            max-width: 600px;
            position: relative;
            z-index: 1;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .logo {
            text-align: left;
        }

        .logo h1 {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease infinite;
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .logo p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 300;
        }

        .theme-toggle {
            background: var(--input-bg);
            border: 2px solid var(--input-border);
            border-radius: 50px;
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            width: 80px;
            height: 40px;
        }

        .theme-toggle:hover {
            transform: scale(1.05);
        }

        .theme-toggle::before {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 32px;
            height: 32px;
            background: var(--button-gradient);
            border-radius: 50%;
            transition: transform 0.3s ease;
            z-index: 1;
        }

        [data-theme="dark"] .theme-toggle::before {
            transform: translateX(38px);
        }

        .theme-icon {
            font-size: 1.2rem;
            z-index: 2;
            position: relative;
        }

        .input-section {
            margin-bottom: 2rem;
        }

        .input-group {
            position: relative;
            margin-bottom: 1.5rem;
        }

        .input-group input {
            width: 100%;
            padding: 1rem 1.5rem;
            border: 2px solid var(--input-border);
            border-radius: 16px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: var(--input-bg);
            backdrop-filter: blur(10px);
            color: var(--text-primary);
        }

        .input-group input:focus {
            outline: none;
            border-color: var(--input-focus);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .input-group input::placeholder {
            color: var(--text-secondary);
        }

        .shorten-btn {
            width: 100%;
            padding: 1rem 2rem;
            background: var(--button-gradient);
            color: white;
            border: none;
            border-radius: 16px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            disabled: false;
        }

        .shorten-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .shorten-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }

        .shorten-btn:hover:not(:disabled)::before {
            left: 100%;
        }

        .shorten-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .shorten-btn:active:not(:disabled) {
            transform: translateY(-1px);
        }

        .result-section {
            display: none;
            margin-top: 2rem;
        }

        .result-card {
            background: var(--result-gradient);
            padding: 2rem;
            border-radius: 20px;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .result-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 0.3; }
        }

        .result-label {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .result-url {
            font-size: 1.3rem;
            font-weight: 600;
            word-break: break-all;
            background: rgba(255, 255, 255, 0.2);
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
        }

        .copy-btn {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 0.8rem 2rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            position: relative;
            z-index: 1;
        }

        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .error-section {
            display: none;
            margin-top: 1rem;
        }

        .error-card {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
            padding: 1.5rem;
            border-radius: 16px;
            color: white;
            text-align: center;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .history-section {
            margin-top: 2rem;
            display: none;
        }

        .history-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
            text-align: center;
        }

        .history-item {
            background: var(--history-gradient);
            padding: 1.5rem;
            border-radius: 16px;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid var(--border-color);
        }

        .history-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px var(--shadow-color);
        }

        .history-short {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }

        .history-original {
            color: var(--text-secondary);
            font-size: 0.9rem;
            opacity: 0.8;
            word-break: break-all;
        }

        .loading {
            display: none;
            text-align: center;
            margin: 1rem 0;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--input-border);
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            color: var(--text-secondary);
        }

        .github-section {
            margin-top: 2rem;
        }

        .github-link {
            text-decoration: none;
            display: block;
        }

        .github-card {
            background: linear-gradient(135deg, #24292e 0%, #2f363d 100%);
            padding: 1.5rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .github-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s;
        }

        .github-card:hover::before {
            left: 100%;
        }

        .github-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(36, 41, 46, 0.3);
        }

        [data-theme="dark"] .github-card {
            background: linear-gradient(135deg, #1a1a2e 0%, #2f363d 100%);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .github-icon {
            font-size: 2rem;
            background: linear-gradient(45deg, #ffb347, #ffcc02);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: starPulse 2s infinite;
        }

        @keyframes starPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .github-content {
            flex: 1;
        }

        .github-title {
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
        }

        .github-subtitle {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
        }

        .github-arrow {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            transition: transform 0.3s ease;
        }

        .github-card:hover .github-arrow {
            transform: translateX(5px);
        }

        @media (max-width: 768px) {
            .container {
                margin: 1rem;
                padding: 2rem;
            }
            
            .logo h1 {
                font-size: 2rem;
            }

            .header {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            .logo {
                text-align: center;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .container {
            animation: fadeInUp 0.8s ease forwards;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <h1>LinkShrink</h1>
                <p>Transform long URLs into short, shareable links</p>
            </div>
            <div class="theme-toggle" onclick="toggleTheme()">
                <span class="theme-icon">🌙</span>
                <span class="theme-icon">☀️</span>
            </div>
        </div>

        <div class="input-section">
            <div class="input-group">
                <input type="url" id="urlInput" placeholder="Enter your long URL here..." required>
            </div>
            <button class="shorten-btn" onclick="shortenUrl()" id="shortenBtn">
                ✨ Shorten URL
            </button>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p class="loading-text">Creating your short link...</p>
        </div>

        <div class="error-section" id="errorSection">
            <div class="error-card">
                <p id="errorMessage"></p>
            </div>
        </div>

        <div class="result-section" id="resultSection">
            <div class="result-card">
                <div class="result-label">Your shortened URL</div>
                <div class="result-url" id="shortUrl"></div>
                <button class="copy-btn" onclick="copyToClipboard()">
                    📋 Copy Link
                </button>
            </div>
        </div>

        <div class="history-section" id="historySection">
            <div class="history-title">📚 Recent Links</div>
            <div id="historyList"></div>
        </div>

        <div class="github-section">
            <a href="https://github.com/xcfio/url-shortener" target="_blank" class="github-link">
                <div class="github-card">
                    <div class="github-icon">⭐</div>
                    <div class="github-content">
                        <div class="github-title">Star us on GitHub!</div>
                        <div class="github-subtitle">Help us grow by giving a star ⭐</div>
                    </div>
                    <div class="github-arrow">→</div>
                </div>
            </a>
        </div>
    </div>

    <script>
        let urlHistory = JSON.parse(localStorage.getItem('urlHistory') || '[]');

        // Theme management
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        function showError(message) {
            document.getElementById('errorMessage').textContent = message;
            document.getElementById('errorSection').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('errorSection').style.display = 'none';
            }, 5000);
        }

        function hideError() {
            document.getElementById('errorSection').style.display = 'none';
        }

        async function shortenUrl() {
            const urlInput = document.getElementById('urlInput');
            const shortenBtn = document.getElementById('shortenBtn');
            const url = urlInput.value.trim();

            if (!url) {
                showError('Please enter a URL');
                return;
            }

            if (!isValidUrl(url)) {
                showError('Please enter a valid URL');
                return;
            }

            // Hide previous results and errors
            hideError();
            document.getElementById('resultSection').style.display = 'none';

            // Show loading and disable button
            document.getElementById('loading').style.display = 'block';
            shortenBtn.disabled = true;
            shortenBtn.textContent = 'Shortening...';

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ original_url: url })
                });

                const data = await response.json();

                if (response.status === 200 && data.short && data.original) {
                    // Success - show result
                    const shortUrl = \`\${window.location.origin}/\${data.short}\`;
                    document.getElementById('shortUrl').textContent = shortUrl;
                    document.getElementById('resultSection').style.display = 'block';

                    // Add to history
                    const historyItem = {
                        short: data.short,
                        original: data.original,
                        timestamp: Date.now()
                    };
                    
                    urlHistory.unshift(historyItem);
                    if (urlHistory.length > 10) {
                        urlHistory = urlHistory.slice(0, 10);
                    }
                    
                    localStorage.setItem('urlHistory', JSON.stringify(urlHistory));
                    updateHistoryDisplay();

                    // Clear input
                    urlInput.value = '';
                } else {
                    // Error from API
                    showError(data.error || 'Failed to shorten URL. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                showError('Network error. Please check your connection and try again.');
            } finally {
                // Hide loading and re-enable button
                document.getElementById('loading').style.display = 'none';
                shortenBtn.disabled = false;
                shortenBtn.textContent = '✨ Shorten URL';
            }
        }

        function updateHistoryDisplay() {
            const historySection = document.getElementById('historySection');
            const historyList = document.getElementById('historyList');

            if (urlHistory.length === 0) {
                historySection.style.display = 'none';
                return;
            }

            historySection.style.display = 'block';
            historyList.innerHTML = '';

            urlHistory.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.onclick = () => copyToClipboard(\`\${window.location.origin}/\${item.short}\`);
                
                historyItem.innerHTML = \`
                    <div class="history-short">\${window.location.origin}/\${item.short}</div>
                    <div class="history-original">\${item.original}</div>
                \`;
                
                historyList.appendChild(historyItem);
            });
        }

        async function copyToClipboard(text = null) {
            const textToCopy = text || document.getElementById('shortUrl').textContent;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                const copyBtn = document.querySelector('.copy-btn');
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '✅ Copied!';
                copyBtn.style.background = 'rgba(72, 187, 120, 0.3)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showError('Text copied to clipboard!');
            }
        }

        // Handle Enter key press
        document.getElementById('urlInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                shortenUrl();
            }
        });

        // Initialize on load
        window.addEventListener('load', () => {
            initTheme();
            updateHistoryDisplay();
        });
    </script>
</body>
</html>
`
