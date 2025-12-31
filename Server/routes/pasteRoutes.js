import express from "express";
import Paste from "../models/Paste.js";

const router = express.Router();

// CREATE PASTE
router.post("/", async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "Invalid content" });
    }

    if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
      return res.status(400).json({ error: "Invalid ttl_seconds" });
    }

    if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
      return res.status(400).json({ error: "Invalid max_views" });
    }

    const expiresAt = ttl_seconds
      ? new Date(Date.now() + ttl_seconds * 1000)
      : null;

    const paste = await Paste.create({
      content,
      expiresAt,
      maxViews: max_views ?? null,
    });

    res.status(201).json({
      id: paste._id,
      url: `${req.protocol}://${req.get("host")}/p/${paste._id}`,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// FETCH PASTE (API)
router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).json({ error: "Not found" });

    const now =
      process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]
        ? new Date(Number(req.headers["x-test-now-ms"]))
        : new Date();

    if (paste.expiresAt && paste.expiresAt < now) {
      return res.status(404).json({ error: "Expired" });
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).json({ error: "View limit exceeded" });
    }

    paste.views += 1;
    await paste.save();

    res.json({
      content: paste.content,
      remaining_views:
        paste.maxViews === null ? null : paste.maxViews - paste.views,
      expires_at: paste.expiresAt,
    });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
