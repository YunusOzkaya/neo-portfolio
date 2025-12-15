# Entropy to Order: Systems Portfolio

> "A developer who builds systems, reflects on failure, and designs meaning — not just interfaces."

This project is a radical departure from traditional static portfolios. Instead of a linear list of projects, it presents a **living, self-organizing knowledge graph**. It models the developer's mind as a system where ideas (nodes) emerge from chaos (entropy) and cluster into meaningful relationships (order) through physics-based interactions.

## 🌌 Conceptual Architecture

The core philosophy of this application is **Emergence**. 

1.  **Entropy:** At initialization, nodes are scattered.
2.  **Physics:** Forces (attraction, repulsion, collision) act upon these nodes.
3.  **Order:** Over time, semantic clusters form naturally. Thoughts connect to Failures, and Systems connect to Data, creating a visual map of the developer's cognitive landscape.

## 🛠 Tech Stack & Engineering

This application is built using a high-performance, component-driven architecture that bridges the gap between 2D DOM interfaces and 3D WebGL rendering.

### Core Framework
*   **React 19:** Component composition and state management.
*   **TypeScript:** Strict typing for graph data structures (`GraphNode`, `GraphLink`) to ensure system stability.
*   **Vite:** High-speed build tool and development server.

### Visualization Engine (The Hybrid Approach)
The visualization logic uses a specialized "Headless Physics, Visual Renderer" pattern:

*   **D3.js (`d3-force`):** Used strictly as a math engine. It calculates the x/y/z coordinates, velocity, and collision physics in the background. It does not manipulate the DOM.
*   **Three.js (`@react-three/fiber`):** Reads the coordinates calculated by D3 and renders the visual representation in a WebGL canvas. This allows for smooth 60fps performance even with complex lighting and post-processing, which standard SVG/Canvas cannot handle.

### UI & Aesthetics
*   **Tailwind CSS:** Utility-first styling for the "Heads-Up Display" (HUD) elements.
*   **Framer Motion:** Handles the complex entrance/exit animations of the Overlay panels.
*   **Lucide React:** Consistent, lightweight iconography.

## 🎨 Design Language

The visual identity is a blend of **Brutalist Data Science** and **Sci-Fi User Interfaces (LCARS)**.

*   **Atmosphere:** A background watermark of the author, heavily transparent and blended, creates depth and a cinematic feel.
*   **Widgets:** The `BioWidget` and `SignalWidget` function as data terminals. They use monospace fonts, technical lines, and "pulse" animations to simulate active system monitoring.
*   **Lighting:** The 3D scene uses warm (Amber) and cool (Sky Blue) point lights to differentiate between "System" nodes and "Failure" nodes.

## 📂 Project Structure

```
├── components/
│   ├── SystemGraph.tsx   # The 3D WebGL Scene & Physics Loop
│   ├── Overlay.tsx       # The sliding detailed info panel
│   ├── BioWidget.tsx     # The "Data Log" profile widget
│   ├── SignalWidget.tsx  # Daily quote generator
│   └── ...
├── constants.ts          # Graph data (Nodes/Links) & Configuration
├── types.ts              # TypeScript interfaces for the Graph
├── App.tsx               # Main layout & composition
└── index.html            # Entry point
```

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🧠 Author

**Nasuhan Yunus Özkaya**  
*Systems Engineer // Chaos Navigator*

Built with intention, structured by logic, driven by curiosity.
