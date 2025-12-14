// pages/api/visits.js
let visitCount = 0;

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ count: visitCount });
  } else if (req.method === 'POST') {
    visitCount++;
    res.status(200).json({ count: visitCount });
  }
}