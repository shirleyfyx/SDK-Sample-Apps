// CredentialsForm.jsx
import React from 'react';

const CredentialsForm = ({ title, domain, token, hostId, onDomainChange, onTokenChange, onHostIdChange, onSubmit }) => {
  return (
    <div className="form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
      <form onSubmit={onSubmit}>
        <label>
          Domain:
          <input type="text" value={domain} onChange={onDomainChange} required />
        </label>
        <br />
        <label>
          SSO Token:
          <input type="text" value={token} onChange={onTokenChange} required />
        </label>
        <br />
        <label>
          Host ID:
          <input type="text" value={hostId} onChange={onHostIdChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CredentialsForm;
