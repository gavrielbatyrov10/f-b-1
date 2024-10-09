const prisma = require("../prisma");

/** Seeds the database with an admin user and a regular user, along with tasks */
const seed = async () => {
  // Seed an admin user
  await prisma.user.upsert({
    where: {
      username: "admin", // Unique username for the admin user
    },
    update: {},
    create: {
      username: "admin", // Username for the admin user
      password: "adminPassword", // Password for the admin user (hash it in production)
      isAdmin: true, // Set isAdmin to true
      tasks: {
        create: [
          { description: "Admin task 1" },
          { description: "Admin task 2" },
        ],
      },
    },
  });

  // Seed a regular user
  await prisma.user.upsert({
    where: {
      username: "foo", // Unique username for the regular user
    },
    update: {},
    create: {
      username: "foo", // Username for the regular user
      password: "bar", // Password for the regular user (hash it in production)
      isAdmin: false, // Set isAdmin to false for regular users
      tasks: {
        create: [
          { description: "task 1" },
          { description: "task 2" },
          { description: "task 3" },
        ],
      },
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
