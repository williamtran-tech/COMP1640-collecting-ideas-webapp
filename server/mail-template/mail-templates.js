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

exports.commentIdea = (creator, content) => {

}

exports.registration = (user, token) => {
    const html =`
    <html>
        <body style="color: black; margin-left: 20%; margin-right: 30%">
        <img src="https://cdn.discordapp.com/attachments/1084789058305269773/1084789117461737482/black_logo.png" alt="logo" width="100">
        <h2>Dear ${user.fullName},</h2> 
        
        <p>Thank you for choosing Gre Ideas! Welcome to your new and shiny Gre Ideas ID. You can use your new account to submit or contribute ideas and participate in the online Gre Ideas Community. Plus, it easy to update your account information at any time.</p>
        
        <p>To complete your Account set-up just click on the link below to confirm the email address associated with your Gre Ideas ID. The link will expire in 3 days, so please confirm as soon as possible.</p>
        
        <p>Username: ${user.email}</p>
        <button style="background-color: rgb(0, 197, 0); border-radius: 10px; padding: 10px"><a href="http://localhost:5000/accounts/verify/${token}" style="text-decoration: none; color: #ffffff;"> Verify here</button>
        <form method="POST" action="http://localhost:5000/accounts/verify">
            <input type="hidden" name="token" value="${token}">
            <button type="submit" style="background-color: rgb(0, 197, 0); border-radius: 10px; padding: 10px">Verify</button>
        </form>

        </body>
    </html>
    `

    return html;
}

