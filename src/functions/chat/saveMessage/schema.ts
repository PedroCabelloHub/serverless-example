const schema = {
    type: "object",
    properties: {
      content: { type: "string" },
      senderId: { type: "number" },
      recipientId: { type: "number" },
    },
    required: ["content","senderId","recipientId"],
  };
  
  export default schema;
  