const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Route to create an Account with Profile
app.post('/accounts', async (req, res) => {
  try {
    const { email, username, password, profile } = req.body;
    
    const account = await prisma.account.create({
      data: {
        email,
        username,
        password,
        profile: {
          create: {
            lastname: profile.lastname,
            middlename: profile.middlename,
            firstname: profile.firstname,
            suffix: profile.suffix,
            bio: profile.bio,
            picture: profile.picture
          }
        }
      },
      include: {
        profile: true
      }
    });
    
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to add a Module to an existing Account
app.post('/accounts/:accountId/modules', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { moduleCode, moduleDetails, moduleDesc } = req.body;
    
    const module = await prisma.module.create({
      data: {
        accountCode: accountId,
        moduleCode,
        moduleDetails,
        moduleDesc
      }
    });
    
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all Accounts with their Profiles and Modules
app.get('/accounts', async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        profile: true,
        modules: true
      }
    });
    
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});