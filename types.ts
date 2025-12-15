
export enum NodeType {
  SYSTEM = 'SYSTEM',
  DATA = 'DATA',
  THOUGHT = 'THOUGHT',
  FAILURE = 'FAILURE',
  SIGNAL = 'SIGNAL'
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  content?: string; // Markdown or long text
  url?: string;
  date?: string;
  tags?: string[];
  img?: string; // URL for texture/photo
  
  // Card Metadata
  language?: string; // For GitHub projects
  stars?: number;    // For GitHub projects
  readTime?: string; // For Medium articles
  
  // Physics properties
  r?: number; // radius
  val?: number; // value/weight

  // D3 Simulation properties explicit definition
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
  index?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface SignalQuote {
  text: string;
  author: string;
}
