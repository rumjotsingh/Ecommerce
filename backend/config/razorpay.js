import Razorpay from "razorpay";

export const getRazorpayConfig = () => ({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const createRazorpayInstance = () => {
  const { key_id, key_secret } = getRazorpayConfig();
  if (!key_id || !key_secret) {
    throw new Error("KEY_ID and KEY_SECRET are missing in .env");
  }
  return new Razorpay({ key_id, key_secret });
};

/** Call on server start — logs a clear warning if keys are invalid */
export const verifyRazorpayKeys = async () => {
  const { key_id, key_secret } = getRazorpayConfig();
  if (!key_id || !key_secret) {
    console.warn(
      "[Razorpay] KEY_ID / KEY_SECRET not set — payments will not work."
    );
    return false;
  }

  try {
    const instance = createRazorpayInstance();
    await instance.orders.create({
      amount: 100,
      currency: "INR",
      receipt: `healthcheck_${Date.now()}`,
    });
    console.log("[Razorpay] API keys verified (test order created).");
    return true;
  } catch (error) {
    if (error?.statusCode === 401) {
      console.error(
        "[Razorpay] Authentication failed — your KEY_ID / KEY_SECRET are invalid or revoked."
      );
      console.error(
        "  → Get new Test keys: https://dashboard.razorpay.com/app/keys"
      );
      console.error("  → Update backend/.env and restart the server.");
    } else {
      console.warn("[Razorpay] Health check:", error?.error?.description || error?.message);
    }
    return false;
  }
};

export default createRazorpayInstance;
