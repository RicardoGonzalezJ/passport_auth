const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('<h1>this is index</h1>');
});

module.exports = router;
