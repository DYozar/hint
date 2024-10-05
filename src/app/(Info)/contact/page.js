"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get('verification');
    const prevFullName = searchParams.get('fullName') || '';
    const prevEmail = searchParams.get('email') || '';
    const prevSubject = searchParams.get('subject') || '';
    const prevMessage = searchParams.get('message') || '';

    if (query === 'done') {
      setAlertMessage('Your email has been successfully verified, and your message has been sent successfully. We will contact you via email.');
      setAlertType('success');
      setTimeout(()=>{ router.push('/');}, 3000);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else if (query === 'failed') {
      setAlertMessage('There was an issue verifying your email because the link has expired. Please try again.');
      setAlertType('failed');
      setFullName(prevFullName);
      setEmail(prevEmail);
      setSubject(prevSubject);
      setMessage(prevMessage);
    }
  }, [searchParams, router]);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/emailSendler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          message,
          action: 'sendVerification',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAlertType('panding');
        setAlertMessage('A verification email has been sent to your inbox. Please verify your email before we process your message.');
       
      } else {
        setAlertMessage(result.message || 'Failed to send verification email. Please try again.');
        setAlertType('error');
      }
    } catch (error) {
      setAlertMessage('Failed to send verification email. Please try again.');
      setAlertType('error');
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <main className="flex min-h-screen text-black flex-col items-center justify-center p-24">
      <form onSubmit={sendMail} className="h-full w-1/2 space-y-6">
        {/* Form fields */}
        <div className="flex flex-col items-start w-full justify-start">
          <h1 className="text-xl font-extrabold">Hello! Why are you contacting us today?          </h1>
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="subject" className="text-sm font-light text-gray-500">Subject</label>
          <select
            name="subject"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border-2 border-red-400 p-2"
          >
            <option value="" disabled>Please select</option>
            <option value="I have an editorial tip for the team">I have an editorial tip for the team</option>
            <option value="I need technical support / I want to report a bug">I need technical support / I want to report a bug</option>
            <option value="I want to pitch a story">I want to pitch a story</option>
            <option value="I'm interested in advertising with us">I&apos;m interested in advertising with us</option>
            <option value="I'd like to report an issue with advertising">I&apos;d like to report an issue with advertising</option>
            <option value="I have a question about moderation / I have been banned">I have a question about moderation / I have been banned</option>
            <option value="I have a press inquiry">I have a press inquiry</option>
            <option value="I want to report a security issue">I want to report a security issue</option>
            <option value="I have a personal information request">I have a personal information request</option>
          </select>
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="fullName" className="text-sm font-light text-gray-500">Full Name</label>
          <input
            name="fullName"
            type="text"
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="rounded-lg border-2 border-red-400 p-2"
          />
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-light text-gray-500">Your Email</label>
          <input
            name="email"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="rounded-lg border-2 border-red-400 p-2"
          />
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="message" className="text-sm font-light text-gray-500">Message</label>
          <textarea
            name="message"
            id="message"
            required
            cols={10}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message here"
            className="rounded-lg border-2 border-red-400 p-2"
          />
        </div>
        <button
          type="submit"
          className="ml-auto flex w-1/2 items-center justify-center space-x-3 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            <span>Send Message</span>
          )}
        </button>
      </form>
      {alertMessage && (
        <div
          className={`mt-4 p-2 rounded-lg text-white ${
            alertType === 'success'
            ? 'bg-green-500'
            : alertType === 'failed'
            ? 'bg-red-500'
            : alertType === 'panding'
            ? 'bg-orange-400'
            : ''
          }`}
        >
          {alertMessage}
        </div>
      )}
    </main>
  );
}
