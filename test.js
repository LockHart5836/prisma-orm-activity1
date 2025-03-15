const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to create an Account with Profile
async function createAccountWithProfile() {
  try {
    const account = await prisma.account.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        profile: {
          create: {
            lastname: 'test',
            middlename: 'T',
            firstname: 'Test',
            suffix: 'Jr',
            bio: 'A test user',
            picture: 'default.jpg'
          }
        }
      },
      include: {
        profile: true
      }
    });

    console.log('Created account with profile:', account);
    return account;
  } catch (error) {
    console.error('Error creating account with profile:', error);
  }
}

// Function to add a Module to an Account
async function addModuleToAccount(accountId) {
  try {
    const module = await prisma.module.create({
      data: {
        accountCode: accountId,
        moduleCode: 'MOD001',
        moduleDetails: 'Test Module',
        moduleDesc: 'This is a test module'
      }
    });

    console.log('Added module to account:', module);
  } catch (error) {
    console.error('Error adding module to account:', error);
  }
}

// Function to fetch all accounts with profiles and modules
async function fetchAllAccounts() {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        profile: true,
        modules: true
      }
    });

    console.log('All accounts with profiles and modules:');
    console.log(JSON.stringify(accounts, null, 2));
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
}

// Run all functions in sequence
async function runTest() {
  try {
    const account = await createAccountWithProfile();
    if (account) {
      await addModuleToAccount(account.id);
    }
    await fetchAllAccounts();
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();