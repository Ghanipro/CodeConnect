const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Keep your existing hi route
app.get('/hi/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hi, ${name}!` });
});

// Enhanced problems data with more details
const problems = [
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
  }
];

// IMPORTANT: Put the stats route BEFORE the :id route to avoid conflicts
app.get('/api/stats', (req, res) => {
  try {
    console.log('Stats endpoint called'); // Debug log
    
    const stats = {
      total: problems.length,
      easy: problems.filter(p => p.difficulty === 'Easy').length,
      medium: problems.filter(p => p.difficulty === 'Medium').length,
      hard: problems.filter(p => p.difficulty === 'Hard').length,
      totalSubmissions: problems.reduce((sum, p) => sum + p.submissions, 0),
      averageAcceptanceRate: (problems.reduce((sum, p) => sum + p.acceptance_rate, 0) / problems.length).toFixed(1)
    };
    
    console.log('Sending stats:', stats); // Debug log
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch statistics'
    });
  }
});

// Enhanced problems endpoint with filtering
app.get('/api/problems', (req, res) => {
  try {
    console.log('Problems endpoint called with query:', req.query); // Debug log
    
    const { difficulty, search, page = 1, limit = 50 } = req.query;
    
    let filteredProblems = [...problems];
    
    // Filter by difficulty if specified
    if (difficulty && difficulty !== 'All') {
      filteredProblems = filteredProblems.filter(
        problem => problem.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }
    
    // Filter by search term if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProblems = filteredProblems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm) ||
        problem.description.toLowerCase().includes(searchTerm) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // For now, we'll return all problems without pagination to keep it simple
    res.json({
      problems: filteredProblems,
      totalCount: filteredProblems.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(filteredProblems.length / limit)
    });
    
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch problems'
    });
  }
});

// Get a specific problem by ID - MUST come after /api/stats
app.get('/api/problems/:id', (req, res) => {
  try {
    console.log('Single problem endpoint called for ID:', req.params.id); // Debug log
    
    const problemId = parseInt(req.params.id);
    const problem = problems.find(p => p.id === problemId);
    
    if (!problem) {
      return res.status(404).json({
        error: 'Problem not found',
        message: `Problem with ID ${problemId} does not exist`
      });
    }
    
    res.json(problem);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch problem'
    });
  }
});

// Test endpoint to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/problems - Get all problems',
      'GET /api/problems/:id - Get specific problem',
      'GET /api/stats - Get statistics',
      'GET /api/test - This endpoint'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/api/test`);
  console.log(`Stats endpoint: http://localhost:${PORT}/api/stats`);
});