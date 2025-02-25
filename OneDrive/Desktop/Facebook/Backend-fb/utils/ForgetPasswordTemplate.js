const HtmlTemplate = ({username,otp}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>OTP Verification</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 500px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 30px;
                text-align: center;
            }
            h2 { color: #007bff; }
            .otp-box {
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                background: #007bff;
                padding: 14px 28px;
                display: inline-block;
                border-radius: 8px;
                margin: 15px 0;
                letter-spacing: 6px;
                cursor: pointer;
                transition: background 0.3s;
            }
            .otp-box:hover { background: #0056b3; }
            .verify-btn {
                display: inline-block;
                background: #28a745;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 30px;
                font-size: 18px;
                border-radius: 8px;
                margin-top: 20px;
                transition: 0.3s;
            }
            .verify-btn:hover { background: #218838; }
            .footer {
                margin-top: 25px;
                font-size: 12px;
                color: #777;
                
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>🔐 OTP Verification</h2>
            <p>Hello <strong>${username}</strong>,</p>
            <p>Your One-Time Password OTP for verification is:</p>

            <div class="otp-box" id="otp-code">${otp}</div>
            <p class="footer">This otp is valid for 10 minutes</p>
            <p class="footer">If you didn’t request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;
};

export default HtmlTemplate;
