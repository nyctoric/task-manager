const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const router =new express.Router();
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'));
    }
    cb(undefined, true);
  },
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }

});


router.post('/users/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({user, token});
  } catch (e) {
      res.status(400).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
      res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
      res.status(500).send();
  }
});

router.post('/users/me/avatar',  auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).png().resize({width: 250, height: 250}).toBuffer()
  req.user.avatar = buffer;
  await req.user.save();
  res.send() ;
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send() ;
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});


// ****not needed
// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id ;
//
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//       res.status(500).send();
//   }
// });



router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});   ***This line replaced by next 3 to utilize mongoose middleware ***
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

//OLD ROUTE WHERE WE PROVIDE ID VIA POSTMAN, REPLACED BELOW
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelEmail(req.user.email, req.user.name);
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
