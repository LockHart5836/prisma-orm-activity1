const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Create Account with Profile
async function createAccountWithProfile() {
  try {
    const accountData = {
      email: 'jakelegada@gmail.com',
      username: 'jakeekaj',
      password: 'nopass123',
      profile: {
        create: {
          lastname: 'Legada',
          middlename: 'N',
          firstname: 'Jake Alan',
          suffix: '',
          bio: 'Software developer passionate about web technologies',
          picture: 'default1.jpg'
        }
      }
    };

    const newAccount = await prisma.account.create({
      data: accountData,
      include: {
        profile: true
      }
    });

    console.log('1. Account and Profile created successfully:');
    console.log(JSON.stringify(newAccount, null, 2));
    return newAccount;
  } catch (error) {
    console.error('Error creating account and profile:', error);
    throw error;
  }
}

// 2. Add Module to an Existing Account
async function addModuleToAccount(accountId) {
  try {
    const moduleData = {
      accountCode: accountId,
      moduleCode: 'MOD002',
      moduleDetails: 'Dashboard',
      moduleDesc: 'Main dashboard with analytics and user statistics'
    };

    const newModule = await prisma.module.create({
      data: moduleData
    });

    console.log('\n2. Module added successfully:');
    console.log(JSON.stringify(newModule, null, 2));
    return newModule;
  } catch (error) {
    console.error('Error adding module to account:', error);
    throw error;
  }
}

// 3. Fetch and Display Accounts with Profiles and Modules
async function fetchAllAccounts() {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        profile: true,
        modules: true
      }
    });

    console.log('\n3. Accounts with their profiles and modules:');
    console.log(JSON.stringify(accounts, null, 2));
    return accounts;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

// Run all actions in sequence
async function runAllActions() {
  try {
    // Create account with profile
    const account = await createAccountWithProfile();
    
    // Add module to this account
    if (account) {
      await addModuleToAccount(account.id);
    }
    
    // Fetch all accounts with their profiles and modules
    await fetchAllAccounts();
  } catch (error) {
    console.error('Error running actions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute all actions
runAllActions()
  .catch(console.error);