"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token'); // Get token from query parameters

      if (!token) {
        setStatus('Invalid token.');
        setLoading(false);
        return;
      }
      
      const prevFullName = searchParams.get('fullName') || '';
      const prevEmail = searchParams.get('email') || '';
      const prevSubject = searchParams.get('subject') || '';
      const prevMessage = searchParams.get('message') || '';

      try {
        let response = await fetch('/api/emailSendler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, action: 'verify' }),
        });

        let result = await response.json();

        // If the initial request returns a 429, show a processing message
        if (response.status === 429) {
          setStatus('Request is being processed. Please wait.');
          // Do not proceed with redirection; just show the processing status
        } else if (response.ok) {
          setStatus(result.message || 'Email successfully verified.');
          router.push(`/contact?verification=done`);
        } else {
          setStatus(result.message || 'Failed to verify email.');
          router.push(`/contact?verification=failed&fullName=${encodeURIComponent(prevFullName)}&email=${encodeURIComponent(prevEmail)}&subject=${encodeURIComponent(prevSubject)}&message=${encodeURIComponent(prevMessage)}`);
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        setStatus('An error occurred during verification.');
      } finally {
          setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-24">
      {loading ? <p>Loading...</p> : <p>{status}</p>}
    </div>
  );
}
