// src/components/Canvas/PropertyPanel.js
import React from 'react';

const PropertyPanel = ({ selectedObject, onUpdateProperty }) => {
  if (!selectedObject) return null;

  const handleColorChange = (e) => {
    onUpdateProperty('fill', e.target.value);
  };

  const handleOpacityChange = (e) => {
    onUpdateProperty('opacity', parseFloat(e.target.value));
  };

  const handleFontSizeChange = (e) => {
    onUpdateProperty('fontSize', parseInt(e.target.value));
  };

  return (
    <div className="property-panel">
      <h3>Properties</h3>
      
      <div className="property-group">
        <label>Fill Color:</label>
        <input
          type="color"
          value={selectedObject.fill || '#000000'}
          onChange={handleColorChange}
        />
      </div>
      
      <div className="property-group">
        <label>Opacity:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={selectedObject.opacity || 1}
          onChange={handleOpacityChange}
        />
        <span>{Math.round((selectedObject.opacity || 1) * 100)}%</span>
      </div>
      
      {selectedObject.type === 'i-text' && (
        <div className="property-group">
          <label>Font Size:</label>
          <input
            type="number"
            min="8"
            max="100"
            value={selectedObject.fontSize || 20}
            onChange={handleFontSizeChange}
          />
        </div>
      )}

      {selectedObject.type === 'rect' && (
        <>
          <div className="property-group">
            <label>Width:</label>
            <input
              type="number"
              value={Math.round(selectedObject.width * selectedObject.scaleX) || 100}
              onChange={(e) => onUpdateProperty('width', parseInt(e.target.value))}
            />
          </div>
          <div className="property-group">
            <label>Height:</label>
            <input
              type="number"
              value={Math.round(selectedObject.height * selectedObject.scaleY) || 100}
              onChange={(e) => onUpdateProperty('height', parseInt(e.target.value))}
            />
          </div>
        </>
      )}

      {selectedObject.type === 'circle' && (
        <div className="property-group">
          <label>Radius:</label>
          <input
            type="number"
            value={Math.round(selectedObject.radius * selectedObject.scaleX) || 50}
            onChange={(e) => onUpdateProperty('radius', parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyPanel;