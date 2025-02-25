import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure: true,
    auth :{
        user:"amirconcept12@gmail.com",
        pass: "itwbgnxthpeefthq",
    },
});

export default transporter


















// const sendWelcomeEmail = async (email, username) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'smtp.gmail.com',
//             secure: true,
//             port: 465,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Welcome to Our App!',
//             text: `Hello ${username},\n\nThank you for registering! We're excited to have you on board.\n\nBest Regards,\n facebook project`
//         };

//         await transporter.sendMail(mailOptions);
//         console.log('✅ Welcome email sent successfully to', email);
//     } catch (error) {
//         console.log('❌ Error sending welcome email:', error);
//     }
// };

// export default sendWelcomeEmail;
