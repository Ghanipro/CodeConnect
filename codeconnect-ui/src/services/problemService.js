// Mock data for problems - no server dependency
const mockProblems = [
  { 
    id: 1, 
    title: "Two Sum", 
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
    acceptance_rate: 45.2,
    submissions: 1234567,
    likes: 8932,
    dislikes: 234
  },
  { 
    id: 2, 
    title: "Merge Intervals", 
    difficulty: "Medium",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    tags: ["Array", "Sorting"],
    acceptance_rate: 38.7,
    submissions: 567890,
    likes: 5643,
    dislikes: 456
  },
  { 
    id: 3, 
    title: "Word Ladder", 
    difficulty: "Hard",
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList.",
    tags: ["Hash Table", "String", "Breadth-First Search"],
    acceptance_rate: 27.3,
    submissions: 234567,
    likes: 3421,
    dislikes: 789
  },
  { 
    id: 4, 
    title: "Valid Parentheses", 
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ["String", "Stack"],
    acceptance_rate: 38.9,
    submissions: 2345678,
    likes: 12345,
    dislikes: 567
  },
  { 
    id: 5, 
    title: "Binary Tree Level Order Traversal", 
    difficulty: "Medium",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    tags: ["Tree", "Breadth-First Search", "Binary Tree"],
    acceptance_rate: 55.2,
    submissions: 789012,
    likes: 6789,
    dislikes: 234
  },
  { 
    id: 6, 
    title: "Longest Substring Without Repeating Characters", 
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    tags: ["String", "Sliding Window"],
    acceptance_rate: 33.1,
    submissions: 987654,
    likes: 5432,
    dislikes: 321
  },
  { 
    id: 7, 
    title: "Palindrome Number", 
    difficulty: "Easy",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    tags: ["Math"],
    acceptance_rate: 52.4,
    submissions: 1456789,
    likes: 7654,
    dislikes: 123
  },
  { 
    id: 8, 
    title: "Regular Expression Matching", 
    difficulty: "Hard",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    tags: ["String", "Dynamic Programming"],
    acceptance_rate: 18.7,
    submissions: 345678,
    likes: 2345,
    dislikes: 567
  }
];

// Simple function that returns mock data immediately
export const getProblems = async () => {
  // Simulate a small delay to make it feel like a real API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    problems: mockProblems,
    totalCount: mockProblems.length,
    currentPage: 1,
    totalPages: 1
  };
};

// Get a specific problem by ID
export const getProblemById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const problem = mockProblems.find(p => p.id === parseInt(id));
  if (!problem) {
    throw new Error('Problem not found');
  }
  return problem;
};

// Get statistics
export const getProblemsStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    total: mockProblems.length,
    easy: mockProblems.filter(p => p.difficulty === 'Easy').length,
    medium: mockProblems.filter(p => p.difficulty === 'Medium').length,
    hard: mockProblems.filter(p => p.difficulty === 'Hard').length,
    totalSubmissions: mockProblems.reduce((sum, p) => sum + p.submissions, 0),
    averageAcceptanceRate: (mockProblems.reduce((sum, p) => sum + p.acceptance_rate, 0) / mockProblems.length).toFixed(1)
  };
};

// Test function
export const testAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { 
    message: 'Mock API is working!', 
    timestamp: new Date().toISOString(),
    dataSource: 'Mock Data'
  };
};