const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe Checkout Session for Pro Subscriptions.
 */
const createCheckoutSession = async (userId, userEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CareerForge Pro Subscription',
              description: 'Unlimited Resumes + AI Rewriting + Premium Templates',
            },
            unit_amount: 1900, // $19.00
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard?status=success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing?status=cancel`,
      customer_email: userEmail,
      metadata: { userId },
    });

    return session.url;
  } catch (error) {
    console.error("Stripe Session Error:", error);
    throw error;
  }
};

/**
 * Handles Stripe Webhooks for subscription lifecycle updates.
 */
const handleWebhook = async (sig, body) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Upgrade user role in DB here
    console.log(`Payment successful for user: ${session.metadata.userId}`);
  }

  return { received: true };
};

module.exports = {
  createCheckoutSession,
  handleWebhook
};
