const express = require('express');
const RecipeRequest = require('../models/RecipeRequest');
const RecipeResponse = require('../models/RecipeResponse');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    // simple join by last 20
    const requests = await RecipeRequest.find(userId ? { userId } : {}).sort({ createdAt: -1 }).limit(20).lean();
    const responses = await RecipeResponse.find({ requestId: { $in: requests.map(r => r._id) } }).lean();
    const respMap = new Map(responses.map(r => [String(r.requestId), r]));
    const items = requests.map(r => ({
      request: r,
      response: respMap.get(String(r._id)) || null
    }));
    res.json({ items });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
