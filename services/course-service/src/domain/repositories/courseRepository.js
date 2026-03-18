// This array acts as in-memory database
let courses = [
  {
    id: "c1",
    name: "Data Structures and Algorithms",
    code: "CS301",
    credits: 4,
    department: "Computer Science"
  },
  {
    id: "c2",
    name: "Machine Learning Essentials",
    code: "DS402",
    credits: 3,
    department: "Data Science"
  }
];

module.exports = {
  async list() {
    // Returns the array, sorted by most recent first (simulating .sort({ createdAt: -1 }))
    return [...courses].reverse();
  },

  async create(payload) {
    const newCourse = {
      id: Date.now().toString(), // Generates a unique ID
      ...payload,
      createdAt: new Date()
    };
    
    courses.push(newCourse);
    return newCourse;
  },
};