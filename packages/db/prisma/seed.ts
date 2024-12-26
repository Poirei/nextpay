import bcrypt from "bcrypt";
import prisma from "..";

async function main() {
  const alice = await prisma.user.upsert({
    where: { phoneNumber: "1111111111" },
    update: {},
    create: {
      phoneNumber: "1111111111",
      password: await bcrypt.hash("password", 10),
      name: "Alice",
      Balances: {
        create: [
          {
            amount: 200000,
            locked: 0,
            timestamp: new Date(),
          },
        ],
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "SUCCESS",
          amount: 200000,
          provider: "HDFC Bank",
          token: "token_1",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { phoneNumber: "2222222222" },
    update: {},
    create: {
      phoneNumber: "2222222222",
      password: await bcrypt.hash("password", 10),
      name: "Bob",
      Balances: {
        create: [
          {
            amount: 200000,
            locked: 0,
            timestamp: new Date(),
          },
        ],
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "FAILURE",
          amount: 200000,
          provider: "HDFC Bank",
          token: "token_2",
        },
      },
    },
  });
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);

    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
