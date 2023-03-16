const { checkPassword } = require("../middleware/validateInput");

// Mail template for submit contribution
exports.ideaSubmit = (idea, creator, topic) => {
    const html = `
    <h2>${idea.name}</h2>
    <p>Topic: ${topic.name}</p>
    <p>Creator: ${creator.fullName}</p>
    <p>Email: ${creator.email}</p>
    <p>Created at: ${idea.createdAt}</p>
    `;

    return html;
};

exports.commentIdea = (idea, comment, creator) => {
    const html = `
    <html>
        <body style="color: black; margin-left: 20%; margin-right: 30%">
            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"></span>
            <img src="https://cdn.discordapp.com/attachments/1084789058305269773/1084789117461737482/black_logo.png" alt="logo" width="100">
            <h2>Dear ${idea.User.fullName},</h2> 
            
            <p>Your idea has new comment</p>
            
            <p>User: ${creator.fullName}</p>
            
            <p>Content: ${comment.content}</p>
            <p>Commented at: ${comment.createdAt}</p>
            <p>View detail <a href="http://localhost:5000/ideas/${idea.id}" style="text-decoration: none; color:rgb(0, 2, 102)0;">Your idea</a></p>

            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"> ${Date.now()} </span>
        </body>
    </html>
    `

    return html
}

// Mail templates for user creation - reset
exports.registration = (user, password, token) => {
    const html =`
    <html>
        <body style="color: black; margin-left: 20%; margin-right: 30%">
            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"></span>
            <img src="https://cdn.discordapp.com/attachments/1084789058305269773/1084789117461737482/black_logo.png" alt="logo" width="100">
            <h2>Dear ${user.fullName},</h2> 
            
            <p>Thank you for choosing Gre Ideas! Welcome to your new and shiny Gre Ideas ID. You can use your new account to submit or contribute ideas and participate in the online Gre Ideas Community. Plus, it easy to update your account information at any time.</p>
            
            <p>To complete your Account set-up just click on the link below to confirm the email address associated with your Gre Ideas ID. The link will expire in 3 days, so please confirm as soon as possible.</p>
            
            <p>Username: ${user.email}</p>
            <p>Password: ${password}</p>
            <button style="background-color: rgb(0, 197, 0); border-radius: 10px; padding: 10px"><a href="http://localhost:5000/accounts/verify?token=${token}" style="text-decoration: none; color: #ffffff;"> Verify here</button>

            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"> ${Date.now()} </span>
        </body>
    </html>
    `

    return html;
}

exports.reset_password = (user, token) => {
    const html = `
    <html>
        <body style="color: black; margin-left: 20%; margin-right: 30%">
            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"></span>
            <img src="https://cdn.discordapp.com/attachments/1084789058305269773/1084789117461737482/black_logo.png" alt="logo" width="100">
            <h2>Dear ${user.fullName},</h2> 
            
            <p>Thank you for choosing Gre Ideas! Welcome to your new and shiny Gre Ideas ID. You can use your new account to submit or contribute ideas and participate in the online Gre Ideas Community. Plus, it easy to update your account information at any time.</p>
            
            <p>To complete reset your Account password just click on the link below to create new password. The link will expire in 3 days, so please access as soon as possible.</p>
            
            <button style="background-color: rgb(0, 197, 0); border-radius: 10px; padding: 10px"><a href="http://localhost:5000/accounts/reset-password?token=${token}" style="text-decoration: none; color: #ffffff;"> Reset Password</button>

            <!-- this ensures Gmail doesn't trim the email -->
            <span style="opacity: 0"> ${Date.now()} </span>
        </body>
    </html>
    `

    return html;
}

