export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .container {
            background: #fff;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
            width: 350px;
            transition: all 0.3s ease-in-out;
        }
        .container:hover {
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        h1 {
            margin-bottom: 25px;
            color: #333;
            font-size: 24px;
        }
        input[type="url"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            width: calc(100% - 20px);
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }
        button:hover {
            background-color: #0056b3;
        }
        .result {
            margin-top: 20px;
        }
        .result p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
        .result a {
            color: #007bff;
            text-decoration: none;
            word-break: break-all;
        }
        .result a:hover {
            text-decoration: underline;
        }
        .error {
            color: red;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>URL Shortener</h1>
        <input type="url" id="originalUrl" placeholder="Enter URL to shorten" required>
        <button onclick="shortenUrl()">Shorten URL</button>
        <div class="result" id="result"></div>
        <div class="error" id="error"></div>
    </div>

    <script>
        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        async function shortenUrl() {
            const original_url = document.getElementById('originalUrl').value;
            const errorElement = document.getElementById('error');
            errorElement.innerText = '';

            if (!original_url) {
                errorElement.innerText = 'Please enter a URL';
                return;
            }

            if (!isValidUrl(original_url)) {
                errorElement.innerText = 'Please enter a valid URL';
                return;
            }

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ original_url })
                });
                const data = await response.json();

                if (response.ok) {
                    document.getElementById('result').innerHTML = \`
                        <p>Shortened URL:</p>
                        <a href="\${data.shortUrl}" target="_blank">\${data.shortUrl}</a>
                    \`;
                } else {
                    document.getElementById('result').innerText = 'Error: ' + data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('result').innerText = 'An error occurred. Please try again.';
            }
        }
    </script>
</body>
</html>
`
