const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAccountWithProfile() {
  try {
    // Sample data - you can modify this as needed
    const accountData = {
      id: '69',
      email: 'jakelegada@gmail.com',
      username: 'jakejake',
      password: 'nopass123',
      profile: {
        create: {
          lastname: 'Legada',
          middlename: 'Nente',
          firstname: 'Jake Alan',
          suffix: 'N/A',
          bio: 'Software developer passionate about web technologies',
          picture: 'profile1.jpg'
        }
      }
    };

    // Create the account and profile in a single transaction
    const newAccount = await prisma.account.create({
      data: accountData,
      include: {
        profile: true // Include the profile in the returned data
      }
    });

    console.log('Account and Profile created successfully:');
    console.log(JSON.stringify(newAccount, null, 2));
    return newAccount;
  } catch (error) {
    console.error('Error creating account and profile:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
createAccountWithProfile()
  .catch(console.error);