// src/pages/CanvasPage.js
import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CanvasEditor from '../components/Canvas/CanvasEditor';
import ShareButton from '../components/UI/ShareButton';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useFirestore } from '../hooks/useFirestore';
import { useDebounce } from '../hooks/useDebounce';

const CanvasPage = () => {
  const { id: canvasId } = useParams();
  const [searchParams] = useSearchParams();
  const isViewOnly = searchParams.get('viewOnly') === 'true';
  
  const [localCanvasState, setLocalCanvasState] = useState(null);
  const debouncedCanvasState = useDebounce(localCanvasState, 1000); // 1 second debounce
  
  const { canvasState, loading, error, saveCanvas } = useFirestore(canvasId);

  // Save debounced changes to Firestore
  useEffect(() => {
    if (debouncedCanvasState && !isViewOnly) {
      saveCanvas(debouncedCanvasState);
    }
  }, [debouncedCanvasState, saveCanvas, isViewOnly]);

  const handleCanvasChange = useCallback((newCanvasState) => {
    if (!isViewOnly) {
      setLocalCanvasState(newCanvasState);
    }
  }, [isViewOnly]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading canvas: {error.message}</div>;

  return (
    <div className="canvas-page">
      <header className="canvas-header">
        <h1>Canvas Editor</h1>
        <ShareButton canvasId={canvasId} />
      </header>
      
      <CanvasEditor
        canvasState={canvasState}
        onCanvasChange={handleCanvasChange}
        readOnly={isViewOnly}
      />
    </div>
  );
};

export default CanvasPage;