import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/api/healthz", async (req, res) => {
  const state = mongoose.connection.readyState === 1;
  res.status(200).json({ ok: state });
});

app.use("/api/pastes", pasteRoutes);

// HTML VIEW
app.get("/p/:id", async (req, res) => {
  try {
    const Paste = (await import("./models/Paste.js")).default;
    const paste = await Paste.findById(req.params.id);

    if (!paste) return res.status(404).send("Not Found");

    const now =
      process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]
        ? new Date(Number(req.headers["x-test-now-ms"]))
        : new Date();

    if (paste.expiresAt && paste.expiresAt < now) {
      return res.status(404).send("Expired");
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).send("View limit exceeded");
    }

    paste.views += 1;
    await paste.save();

    res.status(200).send(`
      <html>
        <body>
          <pre>${paste.content.replace(/</g, "&lt;")}</pre>
        </body>
      </html>
    `);
  } catch {
    res.status(404).send("Not Found");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
