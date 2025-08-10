// src/components/Canvas/CanvasEditor.js
import React, { useRef, useCallback, useEffect } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import Toolbar from './Toolbar';
import PropertyPanel from './PropertyPanel';

const CanvasEditor = ({ onCanvasChange, canvasState, readOnly = false }) => {
  const canvasRef = useRef(null);

  const handleCanvasChange = useCallback(() => {
    if (onCanvasChange && !readOnly) {
      const currentState = getCanvasState();
      if (currentState) {
        onCanvasChange(currentState);
      }
    }
  }, [onCanvasChange, readOnly]);

  const {
    canvas,
    selectedObject,
    isDrawing,
    addRectangle,
    addCircle,
    addText,
    enableDrawing,
    disableDrawing,
    deleteSelected,
    updateObjectProperty,
    exportCanvas,
    loadCanvasState,
    getCanvasState,
    clearCanvas,
    setBrushColor,
    setBrushWidth
  } = useCanvas(canvasRef, handleCanvasChange);

  // Load canvas state when it changes
  useEffect(() => {
    if (canvasState && canvas && loadCanvasState) {
      loadCanvasState(canvasState);
    }
  }, [canvasState, canvas, loadCanvasState]);

  // Disable interactions in read-only mode
  useEffect(() => {
    if (canvas && readOnly) {
      canvas.selection = false;
      canvas.isDrawingMode = false;
      canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    } else if (canvas && !readOnly) {
      canvas.selection = true;
      canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    }
  }, [canvas, readOnly]);

  // Debug logging
  useEffect(() => {
    if (canvas) {
      console.log('Canvas initialized:', {
        width: canvas.width,
        height: canvas.height,
        isDrawingMode: canvas.isDrawingMode
      });
    }
  }, [canvas]);

  return (
    <div className="canvas-editor">
      {!readOnly && (
        <Toolbar
          onAddRectangle={addRectangle}
          onAddCircle={addCircle}
          onAddText={addText}
          onEnableDrawing={enableDrawing}
          onDisableDrawing={disableDrawing}
          onDelete={deleteSelected}
          onExport={exportCanvas}
          onClear={clearCanvas}
          onSetBrushColor={setBrushColor}
          onSetBrushWidth={setBrushWidth}
          isDrawing={isDrawing}
        />
      )}
      
      <div className="canvas-container">
        <div className="canvas-wrapper" style={{ width: '100%', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <canvas 
            ref={canvasRef} 
            style={{ 
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: 'white'
            }}
          />
        </div>
        
        {selectedObject && !readOnly && (
          <PropertyPanel
            selectedObject={selectedObject}
            onUpdateProperty={updateObjectProperty}
          />
        )}
      </div>
    </div>
  );
};

export default CanvasEditor;