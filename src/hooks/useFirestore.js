// src/hooks/useFirestore.js
import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useFirestore = (canvasId) => {
  const [canvasState, setCanvasState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasId) return;

    const canvasDoc = doc(db, 'canvases', canvasId);
    
    const unsubscribe = onSnapshot(canvasDoc, 
      (doc) => {
        if (doc.exists()) {
          setCanvasState(doc.data().canvasData);
        } else {
          setCanvasState({
            version: '5.3.0',
            objects: []
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading canvas:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [canvasId]);

  const saveCanvas = async (canvasData) => {
    if (!canvasId) return;

    try {
      const canvasDoc = doc(db, 'canvases', canvasId);
      await setDoc(canvasDoc, {
        canvasData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  return { canvasState, loading, error, saveCanvas };
};