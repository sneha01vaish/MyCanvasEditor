// src/components/UI/ShareButton.js
import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

const ShareButton = ({ canvasId }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const editUrl = `${window.location.origin}/canvas/${canvasId}`;
  const viewOnlyUrl = `${window.location.origin}/canvas/${canvasId}?viewOnly=true`;

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="share-button"
      >
        <Share2 size={16} />
        Share
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Share Canvas</h3>
            
            <div className="share-option">
              <label>Edit Link:</label>
              <div className="url-container">
                <input type="text" value={editUrl} readOnly />
                <button onClick={() => copyToClipboard(editUrl)}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="share-option">
              <label>View Only Link:</label>
              <div className="url-container">
                <input type="text" value={viewOnlyUrl} readOnly />
                <button onClick={() => copyToClipboard(viewOnlyUrl)}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;