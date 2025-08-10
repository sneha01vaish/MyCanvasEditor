// src/components/Canvas/Toolbar.js
import React, { useState } from 'react';
import { Square, Circle, Type, Pen, Trash2, Download, RotateCcw, Palette } from 'lucide-react';

const Toolbar = ({
  onAddRectangle,
  onAddCircle,
  onAddText,
  onEnableDrawing,
  onDisableDrawing,
  onDelete,
  onExport,
  onClear,
  onSetBrushColor,
  onSetBrushWidth,
  isDrawing = false
}) => {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(3);
  const [showBrushOptions, setShowBrushOptions] = useState(false);

  const handleDrawingToggle = () => {
    if (isDrawing) {
      onDisableDrawing();
      setShowBrushOptions(false);
    } else {
      onEnableDrawing();
      setShowBrushOptions(true);
    }
  };

  const handleExport = () => {
    const dataUrl = onExport('png');
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `canvas-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color);
    if (onSetBrushColor) {
      onSetBrushColor(color);
    }
  };

  const handleBrushWidthChange = (width) => {
    setBrushWidth(width);
    if (onSetBrushWidth) {
      onSetBrushWidth(width);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      if (onClear) {
        onClear();
      }
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button onClick={onAddRectangle} title="Add Rectangle" className="tool-btn">
          <Square size={20} />
        </button>
        
        <button onClick={onAddCircle} title="Add Circle" className="tool-btn">
          <Circle size={20} />
        </button>
        
        <button onClick={onAddText} title="Add Text" className="tool-btn">
          <Type size={20} />
        </button>
      </div>
      
      <div className="toolbar-divider" />
      
      <div className="toolbar-section">
        <button 
          onClick={handleDrawingToggle} 
          className={`tool-btn ${isDrawing ? 'active' : ''}`}
          title="Pen Tool"
        >
          <Pen size={20} />
        </button>
        
        {showBrushOptions && (
          <div className="brush-options">
            <input
              type="color"
              value={brushColor}
              onChange={(e) => handleBrushColorChange(e.target.value)}
              title="Brush Color"
              className="brush-color"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={brushWidth}
              onChange={(e) => handleBrushWidthChange(e.target.value)}
              title="Brush Width"
              className="brush-width"
            />
            <span className="brush-width-label">{brushWidth}px</span>
          </div>
        )}
      </div>
      
      <div className="toolbar-divider" />
      
      <div className="toolbar-section">
        <button onClick={onDelete} title="Delete Selected" className="tool-btn">
          <Trash2 size={20} />
        </button>
        
        <button onClick={handleClear} title="Clear Canvas" className="tool-btn clear-btn">
          <RotateCcw size={20} />
        </button>
      </div>
      
      <div className="toolbar-divider" />
      
      <div className="toolbar-section">
        <button onClick={handleExport} title="Export as PNG" className="tool-btn export-btn">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;