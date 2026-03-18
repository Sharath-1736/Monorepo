// This array acts as in-memory database
let colleges = [
  {
    id: "101",
    name: "ATME College of Engineering",
    location: "Mysuru",
    university: "VTU",
    established: 2010
  },
  {
    id: "102",
    name: "BMS College of Engineering",
    location: "Bengaluru",
    university: "Autonomous",
    established: 1946
  }
];

module.exports = {
  async list() {
    // Returns the array, sorted by most recent first (simulating .sort({ createdAt: -1 }))
    return [...colleges].reverse();
  },

  async create(payload) {
    const newCollege = {
      id: Date.now().toString(), // Generates a unique ID
      ...payload,
      createdAt: new Date()
    };
    
    colleges.push(newCollege);
    return newCollege;
  },
};