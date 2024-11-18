// import express from "express";
// import cors from "cors";
// import path from "path";
// import url, { fileURLToPath } from "url";
// import ImageKit from "imagekit";
// import mongoose from "mongoose";
// import Chat from "./models/chat.js";
// import UserChats from "./models/userChats.js";
// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// const port = process.env.PORT || 3000;
// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());

// const connect = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/");
//     // mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/
//     // mongodb+srv://computerfundamentalsem1:shobhitsingh123@cluster0.wzkac.mongodb.net/
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log(err);
//   } 
// };

// // const imagekit = new ImageKit({
// //   urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
// //   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
// //   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
// // });

// app.get("/api/upload", (req, res) => {
//   const result = imagekit.getAuthenticationParameters();
//   res.send(result);
// });

// app.post("/api/chats", async (req, res) => {
//   // const userId = req.auth.userId;
//   const { text } = req.body;
//   console.log("saiyam" , text);
//   res.send("saiyam")
//   try {
//     // CREATE A NEW CHAT
//     const newChat = new Chat({
//       userId: userId,
//       history: [{ role: "user", parts: [{ text }] }],
//     });

//     const savedChat = await newChat.save();

//     // CHECK IF THE USERCHATS EXISTS
//     const userChats = await UserChats.find({ userId: userId });

//     // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
//     if (!userChats.length) {
//       const newUserChats = new UserChats({
//         userId: userId,
//         chats: [
//           {
//             _id: savedChat._id,
//             title: text.substring(0, 40),
//           },
//         ],
//       });

//       await newUserChats.save();
//     } else {
//       // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
//       await UserChats.updateOne(
//         { userId: userId },
//         {
//           $push: {
//             chats: {
//               _id: savedChat._id,
//               title: text.substring(0, 40),
//             },
//           },
//         }
//       );

//       res.status(201).send(newChat._id);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating chat!");
//   }
// });

// // app.get("/api/userchats", async (req, res) => {
// //   // const userId = req.auth.userId;

// //   try {
// //     // const userChats = await UserChats.find({ userId });

// //     res.status(200).send(userChats[0].chats);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).send("Error fetching userchats!");
// //   }
// // });

// // app.get("/api/chats/:id", async (req, res) => {
// //   // const userId = req.auth.userId;

// //   try {
// //     const chat = await Chat.findOne({ _id: req.params.id });

// //     res.status(200).send(chat);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).send("Error fetching chat!");
// //   }
// // });

// // app.put("/api/chats/:id", async (req, res) => {
// //   // const userId = req.auth.userId;

// //   const { question, answer, img } = req.body;

// //   const newItems = [
// //     ...(question
// //       ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
// //       : []),
// //     { role: "model", parts: [{ text: answer }] },
// //   ];

// //   try {
// //     const updatedChat = await Chat.updateOne(
// //       { _id: req.params.id },
// //       {
// //         $push: {
// //           history: {
// //             $each: newItems,
// //           },
// //         },
// //       }
// //     );
// //     res.status(200).send(updatedChat);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).send("Error adding conversation!");
// //   }
// // });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(401).send("Unauthenticated!");
// });

// // PRODUCTION
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// app.listen(port, () => {
//   connect();
//   console.log("Server running on 3000");
// });





// import express from "express";
// import cors from "cors";
// import path from "path";
// import url, { fileURLToPath } from "url";
// import mongoose from "mongoose";
// import Chat from "./models/chat.js";
// import UserChats from "./models/userChats.js";
// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// const port = process.env.PORT || 3000;
// const app = express();

// // Path utilities for production build
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware to handle CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,  // Ensure this is set in your .env file
//     credentials: true,
//   })
// );

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Connect to MongoDB
// const connect = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/");
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Chat model and UserChats model

// // Route to handle chat creation (question-answer pairs)
// app.post("/api/chats", async (req, res) => {
//   const { userId, text } = req.body;  // Assume `userId` is passed in request body

//   try {
//     // Create a new Chat document with history
//     const newChat = new Chat({
//       userId: userId,  // Assuming userId is provided in the request
//       history: [{ role: "user", parts: [{ text }] }],
//     });

//     const savedChat = await newChat.save();

//     // Check if the user already has a "UserChats" document
//     const userChats = await UserChats.findOne({ userId });

//     if (!userChats) {
//       // If no user chats, create a new document for the user
//       const newUserChats = new UserChats({
//         userId: userId,
//         chats: [
//           {
//             _id: savedChat._id,
//             title: text.substring(0, 40),
//           },
//         ],
//       });
//       await newUserChats.save();
//     } else {
//       // If user chats exist, add the new chat to the user's chat list
//       await UserChats.updateOne(
//         { userId },
//         {
//           $push: {
//             chats: {
//               _id: savedChat._id,
//               title: text.substring(0, 40),
//             },
//           },
//         }
//       );
//     }

//     res.status(201).json({ chatId: savedChat._id });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating chat!");
//   }
// });

// // Fetch all chats for a user
// app.get("/api/userchats", async (req, res) => {
//   // const { userId } = req.query;  // Assume userId is passed in the query string

//   try {
//     const userChats = await UserChats.findOne({ userId });
//     if (!userChats) {
//       return res.status(404).send("No chats found for this user");
//     }

//     res.status(200).json(userChats.chats);  // Return the list of chats for the user
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching user chats!");
//   }
// });

// // Fetch a specific chat's history
// app.get("/api/chats/:id", async (req, res) => {
//   const chatId = req.params.id;

//   try {
//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send("Chat not found");
//     }

//     res.status(200).json(chat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching chat!");
//   }
// });

// // Route to handle chat updates (e.g., adding answers)
// app.put("/api/chats/:id", async (req, res) => {
//   const { question, answer } = req.body;
//   const chatId = req.params.id;

//   try {
//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send("Chat not found");
//     }

//     // Add question-answer pair to the chat history
//     const newItems = [
//       ...(question ? [{ role: "user", parts: [{ text: question }] }] : []),
//       { role: "model", parts: [{ text: answer }] },
//     ];

//     // Update the chat with new history
//     chat.history.push(...newItems);
//     await chat.save();

//     res.status(200).send("Chat updated successfully");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error updating chat!");
//   }
// });

// // Default Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Production: Serve static files from the client build folder
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// // Start the server and connect to MongoDB
// app.listen(port, () => {
//   connect();
//   console.log(`Server running on port ${port}`);
// });








// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import Chat from "./models/chat.js"; // Make sure this model file exists

// const port = process.env.PORT || 3000;
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connect = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/");
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log("Error connecting to MongoDB:", err);
//   }
// };

// // Route to add a chat to the database
// app.post("/api/chats", async (req, res) => {
//   const { text } = req.body;

//   try {
//     // Create a new chat document
//     const newChat = new Chat({
//       history: [{ role: "user", parts: [{ text }] }],
//     });

//     // Save the new chat to MongoDB
//     const savedChat = await newChat.save();

//     res.status(201).json(savedChat);
//   } catch (err) {
//     console.log("Error saving chat:", err);
//     res.status(500).send("Error saving chat!");
//   }
// });

// // Route to retrieve all chats from the database
// app.get("/api/chats", async (req, res) => {
//   try {
//     const chats = await Chat.find();
//     res.status(200).json(chats);
//   } catch (err) {
//     console.log("Error retrieving chats:", err);
//     res.status(500).send("Error retrieving chats!");
//   }
// });

// // Start the server and connect to MongoDB
// app.listen(port, () => {
//   connect();
//   console.log(`Server running on port ${port}`);
// });


// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import Chat from "./models/chat.js"; // Make sure this model file exists

// const port = process.env.PORT || 3000;
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connect = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/");
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log("Error connecting to MongoDB:", err);
//   }
// };

// // Route to add a question-answer pair to the database
// app.post("/api/chats", async (req, res) => {
//   const { question, answer } = req.body;

//   try {
//     // Create a new chat document
//     const newChat = new Chat({ question, answer });

//     // Save the new chat to MongoDB
//     const savedChat = await newChat.save();

//     res.status(201).json(savedChat);
//   } catch (err) {
//     console.log("Error saving chat:", err);
//     res.status(500).send("Error saving chat!");
//   }
// });

// // Route to retrieve all question-answer pairs from the database
// app.get("/api/chats", async (req, res) => {
//   try {
//     const chats = await Chat.find();
//     res.status(200).json(chats);
//   } catch (err) {
//     console.log("Error retrieving chats:", err);
//     res.status(500).send("Error retrieving chats!");
//   }
// });

// // Start the server and connect to MongoDB
// app.listen(port, () => {
//   connect();
//   console.log(`Server running on port ${port}`);
// });


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js"; // Make sure this model file exists

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://saiyam:Kanpur%408787@saiyam.sh4p1jw.mongodb.net/");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

// Route to add a question-answer pair to the database
app.post("/api/chats", async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Create a new chat document
    const newChat = new Chat({ question, answer });

    // Save the new chat to MongoDB
    const savedChat = await newChat.save();

    res.status(201).json(savedChat);
  } catch (err) {
    console.log("Error saving chat:", err);
    res.status(500).send("Error saving chat!");
  }
});

// Route to retrieve all question-answer pairs from the database
app.get("/api/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (err) {
    console.log("Error retrieving chats:", err);
    res.status(500).send("Error retrieving chats!");
  }
});

// Route to retrieve a specific chat by its ID
app.get("/api/chats/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.log("Error retrieving chat:", err);
    res.status(500).send("Error retrieving chat!");
  }
});

// Start the server and connect to MongoDB
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
