import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory store for processing status
const processingMap = new Map();

export async function POST(request) {
    const { fullName, email, subject, message, action, token } = await request.json();

    // Unique key based on token or email to manage processing
    const key = token || email;

    // Check if the request is already being processed
    if (processingMap.has(key)) {
        return NextResponse.json({ message: 'Request is already being processed' }, { status: 429 });
    }

    // Set the request as processing
    processingMap.set(key, true);

    try {
        if (action === 'sendVerification') {
            // Generate a verification token
            const verificationToken = jwt.sign({ email, fullName, subject, message }, process.env.JWT_SECRET, { expiresIn: '1m' });

            // Send verification email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Please verify your email address',
                html: `
                    <h3>Email Verification</h3>
                    <p>Thank you for contacting us, ${fullName}!</p>
                    <p>To verify your email and complete your message submission, please click the link below:</p>
                    <p><a href="${process.env.APP_URL}/verify-email?token=${verificationToken}&fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}">Verify Email</a></p>
                    <p>If you did not make this request, please ignore this email.</p>
                `
            };

            await transporter.sendMail(mailOptions);

            return NextResponse.json({ message: 'Verification email sent successfully' }, { status: 200 });

        } else if (action === 'verify') {
            if (!token) {
                return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
            }

            try {
                // Verify the token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Send the actual message email
                const messageMailOptions = {
                    from: email,
                    to: 'aouidyyoussef@gmail.com',
                    subject: decoded.subject,
                    html: `
                        <h3>New message from Contact Us form</h3>
                        <ul>
                            <li><strong>Full Name:</strong> ${decoded.fullName}</li>
                            <li><strong>Email:</strong> ${decoded.email}</li>
                            <li><strong>Subject:</strong> ${decoded.subject}</li>
                            <li><strong>Message:</strong> ${decoded.message}</li>
                        </ul>
                    `
                };

                await transporter.sendMail(messageMailOptions);

                // Send confirmation email to the user
                const userMailOptions = {
                    from: process.env.EMAIL_USER,
                    to: decoded.email,
                    subject: 'We received your message!',
                    html: `
                        <h3>Thank you for contacting us, ${decoded.fullName}!</h3>
                        <p>We have received your message and our team will get back to you shortly.</p>
                        <p><strong>Your Message:</strong></p>
                        <p>${decoded.message}</p>
                        <br>
                        <p>Best regards,</p>
                        <p>Your Company Name</p>
                    `
                };

                await transporter.sendMail(userMailOptions);

                return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

            } catch (error) {
                console.error('Token verification failed:', error);
                return NextResponse.json({ message: 'Failed to verify token', error: error.message }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }

    } catch (error) {
        console.error('Error in /api/emailSender:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    } finally {
        // Always remove the request from processing
        processingMap.delete(key);
    }
}
