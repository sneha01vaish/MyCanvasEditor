# MyCanvasEditor
Stateless 2D Editor with Shareable Links – A mini Canva-like web app built with React, Fabric.js, and Firebase Firestore. Users can create and edit shapes/text, draw freely, and share editable canvases via a public link without login. Features include auto-save, real-time updates, and scene management via unique URLs.

# Canvas Editor

A React-based drawing application with tools for creating shapes, drawing, and text editing. pLS CLONE IT TO YOUR LOCAL IF YOU WANT.

## How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the application**
   ```bash
   npm start
   ```

3. **Open in browser**
   - Go to `http://localhost:3000`

## How It Works

### Drawing Tools
- **Pencil Tool**: Click pencil icon → draw on canvas with mouse
- **Rectangle**: Click square icon → adds rectangle shapes
- **Circle**: Click circle icon → adds circle shapes  
- **Text**: Click text icon → adds editable text

### Brush Options
- **Color Picker**: Change drawing color
- **Brush Size**: Adjust line thickness (1-20px)
- Brush options appear when pencil tool is active

### Canvas Actions
- **Select Objects**: Click on any shape/text to select
- **Move**: Drag selected objects around
- **Delete**: Select object → click trash icon
- **Clear All**: Click rotate icon → clears entire canvas
- **Export**: Click download icon → saves as PNG image

### Drawing Process
1. Click pencil icon (turns blue when active)
2. Adjust color and brush size
3. Click and drag on canvas to draw
4. Release mouse to complete stroke
5. Click pencil again to stop drawing mode

## Project Structure
```
src/
├── components/Canvas/
│   ├── CanvasEditor.js    # Main canvas component
│   └── Toolbar.js         # Drawing tools
├── hooks/
│   └── useCanvas.js       # Canvas logic
└── App.js                 # Main app
```

## Dependencies
- React
- Fabric.js (canvas library)  
- Lucide React (icons)
