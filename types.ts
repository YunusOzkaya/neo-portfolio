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
  content?: string;
  url?: string;
  date?: string;
  tags?: string[];
  img?: string;
  language?: string;
  stars?: number;
  readTime?: string;
  r?: number;
  val?: number;
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