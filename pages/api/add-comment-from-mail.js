// File: pages/api/contacts.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let { content } = req.body;

  res.status(200).json({
    content: content,
  });
}
