const emailTemplate = (name, email) => {
  return `
    <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px;">
        
        <h2 style="color: #4CAF50;">Welcome, ${name}</h2>
        
        <p>Your account has been created successfully.</p>
        
        <table style="width: 100%; margin-top: 10px;">
          <tr>
            <td><strong>Email:</strong></td>
            <td>${email}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          You can now login and start using our platform.
        </p>

        <hr />

        <p style="font-size: 12px; color: gray;">
          This is an automated message. Please do not reply.
        </p>

      </div>
    </div>
  `;
};

module.exports = { emailTemplate };