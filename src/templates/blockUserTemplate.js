const blockUserTemplate = (name, email) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background-color: #f40a0a;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .header h2 {
            margin: 0;
            font-size: 22px;
        }

        .content {
            padding: 25px 30px;
        }

        .content h3 {
            color: #f40a0a;
            margin-top: 0;
        }

        .details {
            background-color: #f2f4f6;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }

        .details p {
            margin: 8px 0;
        }

        .btn {
            display: inline-block;
            background-color: #f40a0a;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
        }

        .btn:hover {
            background-color: #f40a0a;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Account Blocked!!</h2>
        </div>

        <div class="content">
            <h3>Hello ${name},</h3>
           <p style="font-size: 16px; color: #555;">
                Your account has been temporarily <strong>blocked</strong> due to multiple unsuccessful login attempts.
            </p>

            <div class="details">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Username:</strong> ${name}</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = { blockUserTemplate };
