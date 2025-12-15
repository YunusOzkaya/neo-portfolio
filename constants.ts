import { GraphNode, NodeType, SignalQuote } from './types';

export const COLORS = {
  [NodeType.SYSTEM]: '#38bdf8',
  [NodeType.DATA]: '#a78bfa',
  [NodeType.THOUGHT]: '#94a3b8',
  [NodeType.FAILURE]: '#f87171',
  [NodeType.SIGNAL]: '#fbbf24',
};

export const SIGNAL_QUOTES: SignalQuote[] = [
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "He who has a why to live can bear almost any how.", author: "Nietzsche" },
  { text: "To understand the world, one must not be content with mere appearances.", author: "Spinoza" },
  { text: "Do not feel lonely, the entire universe is inside you.", author: "Rumi" },
  { text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", author: "Nikola Tesla" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Knowing others is intelligence; knowing yourself is true wisdom.", author: "Laozi" },
];

export const getTodaysSignal = (): SignalQuote => {
  const dateStr = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SIGNAL_QUOTES.length;
  return SIGNAL_QUOTES[index];
};

export const INITIAL_NODES: GraphNode[] = [
  {
    id: 'sys-core',
    label: 'Yunus Özkaya',
    type: NodeType.SYSTEM,
    description: 'Systems Engineer. Chaos Navigator. Builder.',
    img: '/Images/image.png',
    val: 5
  },
  {
    id: 'thought-cod',
    label: 'My Story with COD',
    type: NodeType.THOUGHT,
    description: 'A narrative on identity, failure, and discipline.',
    img: '/Images/image (1).png',
    url: 'https://medium.com/@nasuhan.yunus.ozkaya/my-story-with-cod-66e370c5fb7a',
    tags: ['identity', 'growth', 'personal'],
    readTime: '6 min read',
    val: 2
  },
  {
    id: 'thought-react',
    label: 'React Cheatsheet',
    type: NodeType.THOUGHT,
    description: 'Structuring knowledge for complex frontend systems.',
    url: 'https://medium.com/@nasuhan.yunus.ozkaya/react-cheatsheet-p-5935be2c4232',
    tags: ['technical', 'react', 'frontend'],
    readTime: '12 min read',
    val: 2
  },
  {
    id: 'thought-complexity',
    label: 'Complexity & Learning',
    type: NodeType.THOUGHT,
    description: 'Why simple linear learning fails in complex software environments.',
    tags: ['systems', 'learning'],
    readTime: '4 min read',
    val: 1.5
  },
  {
    id: 'sys-foodbot',
    label: 'FoodBot',
    type: NodeType.SYSTEM,
    description: 'An automated culinary bot for simplifying food-related workflows.',
    url: 'https://github.com/YunusOzkaya/FoodBot',
    language: 'Python',
    stars: 4,
    val: 2
  },
  {
    id: 'sys-kitchen',
    label: "Rienalyn's Kitchen",
    type: NodeType.SYSTEM,
    description: 'A dedicated recipe platform built with React.',
    url: 'https://rienalynskitchen.netlify.app/',
    tags: ['React', 'Frontend', 'UX'],
    language: 'React',
    stars: 9,
    val: 2.5
  },
  {
    id: 'sys-ishare',
    label: 'iShare',
    type: NodeType.SYSTEM,
    description: 'A digital sharing platform connecting users via content exchange.',
    url: 'https://i-share-iota.vercel.app/',
    tags: ['Social', 'Web App'],
    language: 'JavaScript',
    stars: 6,
    val: 2.5
  },
  {
    id: 'sys-planets-ar',
    label: 'Planets AR',
    type: NodeType.DATA,
    description: 'Augmented Reality project visualizing planetary bodies.',
    url: 'https://github.com/YunusOzkaya/planets-ar',
    tags: ['AR', 'Mobile', 'Computer Vision'],
    language: 'C#',
    stars: 15,
    val: 3
  },
  {
    id: 'sys-streamlit',
    label: 'Personnel Analytics',
    type: NodeType.DATA,
    description: 'Streamlit dashboard for visualizing regional personnel averages.',
    url: 'https://github.com/YunusOzkaya/B-lge-B-lge-Personel-Ortalamalar----Streamlit',
    tags: ['Data Science', 'Streamlit', 'Python'],
    language: 'Python',
    stars: 5,
    val: 2
  },
  {
    id: 'sys-portfolio-v1',
    label: 'Legacy Portfolio',
    type: NodeType.SYSTEM,
    description: 'The previous iteration. Static, traditional, outdated.',
    url: 'https://yunusozkaya.netlify.app/',
    language: 'HTML/SCSS',
    stars: 12,
    val: 1.5
  },
  {
    id: 'sys-github',
    label: 'GitHub Profile',
    type: NodeType.SYSTEM,
    description: 'The central code repository. 38 repositories.',
    url: 'https://github.com/YunusOzkaya',
    language: 'Hub',
    stars: 84,
    val: 4
  },
  {
    id: 'sys-visualization',
    label: 'Data Visualization',
    type: NodeType.DATA,
    description: 'Experiments with D3 and Three.js to render invisible logic.',
    img: '/Images/image (3).png',
    language: 'TypeScript',
    stars: 45,
    val: 2.5
  },
  {
    id: 'fail-early-startup',
    label: 'Failed Startup Attempt',
    type: NodeType.FAILURE,
    description: 'Attempted to build a social graph tool. Failed due to lack of market fit.',
    tags: ['business', 'failure'],
    val: 2
  },
  {
    id: 'fail-overengineering',
    label: 'Trap of Abstraction',
    type: NodeType.FAILURE,
    description: 'A project lost to infinite abstraction layers. Lesson: YAGNI.',
    tags: ['engineering', 'refactoring'],
    val: 1.5
  },
  { id: 'con-entropy', label: 'Entropy', type: NodeType.DATA, description: 'The tendency toward disorder.', val: 1 },
  { id: 'con-order', label: 'Order', type: NodeType.SYSTEM, description: 'Emergent structure from chaos.', val: 1 },
  { id: 'con-resilience', label: 'Resilience', type: NodeType.THOUGHT, description: 'Bouncing back from system shock.', val: 1 },
];

export const INITIAL_LINKS = [
  { source: 'sys-github', target: 'sys-core', value: 3 },
  { source: 'thought-cod', target: 'sys-core', value: 2 },
  { source: 'sys-visualization', target: 'sys-core', value: 2 },
  { source: 'thought-cod', target: 'fail-early-startup', value: 1 },
  { source: 'thought-cod', target: 'con-resilience', value: 2 },
  { source: 'sys-foodbot', target: 'sys-github', value: 1 },
  { source: 'sys-kitchen', target: 'sys-github', value: 1 },
  { source: 'sys-ishare', target: 'sys-github', value: 1 },
  { source: 'sys-planets-ar', target: 'sys-visualization', value: 2 },
  { source: 'sys-streamlit', target: 'sys-visualization', value: 1 },
  { source: 'sys-kitchen', target: 'thought-react', value: 2 },
  { source: 'sys-portfolio-v1', target: 'sys-github', value: 1 },
  { source: 'sys-visualization', target: 'sys-github', value: 2 },
  { source: 'thought-react', target: 'sys-visualization', value: 1 },
  { source: 'fail-overengineering', target: 'thought-complexity', value: 2 },
  { source: 'con-entropy', target: 'con-order', value: 1 },
];