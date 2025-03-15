const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchAllAccounts() {
  try {
    // Fetch all accounts with their profiles and modules
    const accounts = await prisma.account.findMany({
      include: {
        profile: true,
        modules: true
      }
    });

    console.log('Accounts with their profiles and modules:');
    console.log(JSON.stringify(accounts, null, 2));
    
    // Print summary
    console.log(`\nTotal accounts retrieved: ${accounts.length}`);
    for (const account of accounts) {
      console.log(`\nAccount: ${account.username} (${account.email})`);
      console.log(`Profile: ${account.profile ? account.profile.firstname + ' ' + account.profile.lastname : 'No profile'}`);
      console.log(`Modules: ${account.modules.length}`);
      
      // List modules if any
      if (account.modules.length > 0) {
        console.log('Modules list:');
        account.modules.forEach((module, index) => {
          console.log(`  ${index + 1}. ${module.moduleCode}: ${module.moduleDetails}`);
        });
      }
    }
    
    return accounts;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
fetchAllAccounts()
  .catch(console.error);