const { Router } = require('express');

const router = Router();
const { isAuthenticated } = require('../helpers/helpers');

router.get('/', isAuthenticated, (req, res) => {
  res.status(200).send(
    `<h1>${req.flash('info')} this is index</h1>
     <ul>
     <li>userID: ${req.user.idusuario}</li>
     <li>Name: ${req.user.nombre_u}</li>
     <li>Last Name: ${req.user.apellido_u}</li>
     <li>unitID: ${req.user.idundg}</li>
     <li>Email: ${req.user.correo}</li>
     <li>SessionID: ${req.sessionID}</li>
     </ul>
     <h4><a href="/users/logout">Logout</a></h4>`,
  );
});

module.exports = router;
