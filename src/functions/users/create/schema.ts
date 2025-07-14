const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      password: { type: "string" },
      email: { type: "string" },
      role: { type: "string" },
      
    },
    required: ["name","password","email"],
  };
  
  export default schema;
  