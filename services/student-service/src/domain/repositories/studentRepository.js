// This array acts as in-memory database
let students = [
  {
    id: "1",
    name: "UnderTaker",
    usn: "4AD22CD026",
    course: "Data Science",
    college: "ATME College of Engineering"
  },
  {
    id: "2",
    name: "John Cena",
    usn: "4AD22CD029",
    course: "Computer Science",
    college: "VTU Belagavi"
  }
];

module.exports = {
  async list() {
    // Returns the array, sorted by most recent first (simulating .sort({ createdAt: -1 }))
    return [...students].reverse();
  },

  async create(payload) {
    const newStudent = {
      id: Date.now().toString(), // Generates a unique ID
      ...payload,
      createdAt: new Date()
    };
    
    students.push(newStudent);
    return newStudent;
  },
};