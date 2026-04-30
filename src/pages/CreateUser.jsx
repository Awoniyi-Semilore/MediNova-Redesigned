import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './CreateUser.css';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [creating, setCreating] = useState(false);

  const generateAutoFields = (nameInput, emailInput) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // "2026-04-29"

    return {
      name: nameInput.trim(),
      email: emailInput.trim().toLowerCase(),
      patientsCreated: 0,
      lastActivityDate: dateStr,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setStatus({ type: 'error', message: 'Please enter both name and email.' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setCreating(true);
    setStatus({ type: '', message: '' });

    try {
      const userData = generateAutoFields(name, email);

      const docRef = await addDoc(
        collection(db, 'hospital', 'main', 'care_users'),
        userData
      );

      setStatus({
        type: 'success',
        message: `User created successfully! Document ID: ${docRef.id}`,
      });

      // Clear form
      setName('');
      setEmail('');

    } catch (error) {
      console.error('Error creating user:', error);
      setStatus({
        type: 'error',
        message: `Failed to create user: ${error.message}`,
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="create-user-page">
      <div className="create-user-card">
        <h1 className="create-user-title">Create Care User</h1>
        <p className="create-user-subtitle">Enter details to auto-generate user record</p>

        <form onSubmit={handleCreate} className="create-user-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monju Agnes"
              disabled={creating}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. monjuagnes423@gmail.com"
              disabled={creating}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="create-btn"
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create User'}
          </button>
        </form>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <div className="auto-fields-info">
          <p>Auto-filled fields:</p>
          <ul>
            <li>patientsCreated: <span>0</span></li>
            <li>lastActivityDate: <span>today's date</span></li>
            <li>createdAt: <span>server timestamp</span></li>
            <li>lastLogin: <span>server timestamp</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}