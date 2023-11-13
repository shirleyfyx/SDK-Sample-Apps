import React, { useState } from 'react';

const CredentialsForm = ({ onSubmit }) => {
  const [domain, setDomain] = useState('iotum.callbridge.rocks');
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');

  // This function will be called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the passed onSubmit function with the local state values
    onSubmit({ domain, token, hostId });
  };

  return (
    <div className="form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' }}>Iotum Sample Apps</div>
      <form onSubmit={handleSubmit}>
        <label>
          Domain:
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          SSO Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Host ID:
          <input
            type="text"
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CredentialsForm;
