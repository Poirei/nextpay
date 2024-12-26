import { Server } from "http";
import express, { Response } from "express";
import db from "@repo/db";
import z from "zod";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Hello from Webhook server!👋🏻" });
});

const PaymentInformationSchema = z.object({
  token: z.string(),
  userId: z.string(),
  amount: z.string(),
});

type PaymentInformation = z.infer<typeof PaymentInformationSchema>;

app.post("/hdfcWebhook", async (req, res) => {
  const result = PaymentInformationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: `Invalid request body: ${result.error?.errors[0]?.message}`,
    });
  } else {
    const paymentInformation: PaymentInformation = {
      token: result.data.token,
      userId: result.data.userId,
      amount: result.data.amount,
    };

    try {
      await db.$transaction([
        db.balances.updateMany({
          where: {
            userId: +paymentInformation.userId,
          },
          data: {
            amount: {
              increment: +paymentInformation.amount,
            },
          },
        }),
        db.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "SUCCESS",
          },
        }),
      ]);

      res.json({
        message: "Captured",
      });
    } catch (error) {
      console.log(error);

      res.status(411).json({
        message: "Error while processing transaction: " + error,
      });
    }
  }
});

let server: Server;
const startServer = () => {
  server = app.listen(3000, () => {
    console.log("Webhook server is listening on port 3000");
  });

  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      console.log("Port 3000 is busy, retrying in 1 second...");
      setTimeout(() => {
        server.close();
        startServer();
      }, 1000);
    }
  });
};

startServer();

const gracefulShutdown = (signal: string) => {
  console.log(
    `Received termination signal: ${signal}. Shutting down gracefully...`
  );

  try {
    server.close(() => {
      console.log("Webhook server has been shut down.");

      process.exit(0);
    });

    setTimeout(() => {
      console.log(
        "Foring shutdown as the server did not shut down gracefully in time."
      );
      process.exit(1);
    }, 10000);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
