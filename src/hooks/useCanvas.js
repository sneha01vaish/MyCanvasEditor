// src/hooks/useCanvas.js
import { useEffect, useState, useCallback } from 'react';
import { Canvas, Rect, Circle, IText, PencilBrush } from 'fabric';

export const useCanvas = (canvasRef, onCanvasChange) => {
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || canvas) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true
    });

    // Initialize drawing brush
    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = 3;
    fabricCanvas.freeDrawingBrush.color = '#000000';

    // Canvas event listeners
    const handleCanvasChange = () => {
      if (onCanvasChange) {
        // Small delay to ensure canvas state is updated
        setTimeout(() => {
          onCanvasChange();
        }, 10);
      }
    };

    fabricCanvas.on('object:modified', handleCanvasChange);
    fabricCanvas.on('object:added', handleCanvasChange);
    fabricCanvas.on('object:removed', handleCanvasChange);
    fabricCanvas.on('path:created', handleCanvasChange); // For drawing paths

    fabricCanvas.on('selection:created', (e) => {
      if (e.selected && e.selected[0]) {
        setSelectedObject(e.selected[0]);
      }
    });

    fabricCanvas.on('selection:updated', (e) => {
      if (e.selected && e.selected[0]) {
        setSelectedObject(e.selected[0]);
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // Add debugging for drawing events
    fabricCanvas.on('mouse:down', (e) => {
      if (fabricCanvas.isDrawingMode) {
        console.log('Drawing started');
      }
    });

    fabricCanvas.on('mouse:up', (e) => {
      if (fabricCanvas.isDrawingMode) {
        console.log('Drawing ended');
      }
    });

    fabricCanvas.on('path:created', (e) => {
      console.log('Path created:', e.path);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [canvasRef]); // Removed onCanvasChange from dependencies as requested by ESLint warning

  const addRectangle = useCallback(() => {
    if (!canvas) return;
    
    const rect = new Rect({
      left: Math.random() * 200 + 100,
      top: Math.random() * 200 + 100,
      width: 100,
      height: 100,
      fill: '#3498db',
      stroke: '#2980b9',
      strokeWidth: 2,
      selectable: true,
      evented: true
    });
    
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }, [canvas]);

  const addCircle = useCallback(() => {
    if (!canvas) return;
    
    const circle = new Circle({
      left: Math.random() * 200 + 100,
      top: Math.random() * 200 + 100,
      radius: 50,
      fill: '#e74c3c',
      stroke: '#c0392b',
      strokeWidth: 2,
      selectable: true,
      evented: true
    });
    
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  }, [canvas]);

  const addText = useCallback(() => {
    if (!canvas) return;
    
    const text = new IText('Click to edit', {
      left: Math.random() * 200 + 100,
      top: Math.random() * 200 + 100,
      fontSize: 20,
      fill: '#2c3e50',
      fontFamily: 'Arial',
      selectable: true,
      evented: true,
      editable: true
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }, [canvas]);

  const enableDrawing = useCallback(() => {
    if (!canvas) return;
    
    console.log('Enabling drawing mode');
    
    // Disable object selection when drawing
    canvas.selection = false;
    canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
    
    canvas.isDrawingMode = true;
    
    // Ensure brush is properly initialized
    if (!canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush = new PencilBrush(canvas);
    }
    
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = '#000000';
    
    console.log('Drawing mode enabled:', canvas.isDrawingMode);
    console.log('Brush:', canvas.freeDrawingBrush);
    
    setIsDrawing(true);
  }, [canvas]);

  const disableDrawing = useCallback(() => {
    if (!canvas) return;
    
    console.log('Disabling drawing mode');
    
    canvas.isDrawingMode = false;
    
    // Re-enable object selection
    canvas.selection = true;
    canvas.forEachObject((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });
    
    setIsDrawing(false);
  }, [canvas]);

  const deleteSelected = useCallback(() => {
    if (!canvas) return;
    
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      canvas.remove(...activeObjects);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [canvas]);

  const updateObjectProperty = useCallback((property, value) => {
    if (selectedObject && canvas) {
      selectedObject.set(property, value);
      canvas.renderAll();
      if (onCanvasChange) {
        onCanvasChange();
      }
    }
  }, [selectedObject, canvas, onCanvasChange]);

  const exportCanvas = useCallback((format = 'png') => {
    if (!canvas) return null;
    
    // Temporarily disable selection to get clean export
    const wasDrawingMode = canvas.isDrawingMode;
    canvas.isDrawingMode = false;
    canvas.discardActiveObject();
    
    let result;
    if (format === 'png') {
      result = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2 // Higher resolution
      });
    } else if (format === 'svg') {
      result = canvas.toSVG();
    }
    
    // Restore drawing mode if it was enabled
    canvas.isDrawingMode = wasDrawingMode;
    
    return result;
  }, [canvas]);

  const loadCanvasState = useCallback((state) => {
    if (!canvas || !state) return;
    
    canvas.loadFromJSON(state, () => {
      canvas.renderAll();
      // Ensure all objects are selectable after loading
      canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    });
  }, [canvas]);

  const getCanvasState = useCallback(() => {
    if (!canvas) return null;
    
    // Temporarily disable drawing mode to get clean state
    const wasDrawingMode = canvas.isDrawingMode;
    canvas.isDrawingMode = false;
    canvas.discardActiveObject();
    
    const state = canvas.toJSON();
    
    // Restore drawing mode
    canvas.isDrawingMode = wasDrawingMode;
    
    return state;
  }, [canvas]);

  const clearCanvas = useCallback(() => {
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  }, [canvas]);

  const setBrushColor = useCallback((color) => {
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = color;
      console.log('Brush color set to:', color);
    }
  }, [canvas]);

  const setBrushWidth = useCallback((width) => {
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = parseInt(width);
      console.log('Brush width set to:', width);
    }
  }, [canvas]);

  return {
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
  };
};