const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addModuleToAccount(accountId) {
  try {
    // Verify that the account exists
    const account = await prisma.account.findUnique({
      where: { id: accountId }
    });

    if (!account) {
      console.error(`Account with ID ${accountId} not found`);
      return null;
    }

    // Sample module data - you can modify this as needed
    const moduleData = {
      accountCode: accountId,
      moduleCode: 'MOD001',
      moduleDetails: 'User Management',
      moduleDesc: 'Handles user registration, authentication, and profile management'
    };

    // Create the module
    const newModule = await prisma.module.create({
      data: moduleData
    });

    console.log('Module added successfully:');
    console.log(JSON.stringify(newModule, null, 2));
    return newModule;
  } catch (error) {
    console.error('Error adding module to account:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
