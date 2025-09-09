// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

export const paymentService = {
    // createRazorpayOrder: async (amount: number, receipt: string) => {
    //     return razorpay.orders.create({
    //         amount: amount,
    //         currency: "INR",
    //         receipt,
    //     });
    // },
    // verifySignature: (
    //     razorpay_order_id: string,
    //     razorpay_payment_id: string,
    //     razorpay_signature: string
    // ) => {
    //     const body = razorpay_order_id + "|" + razorpay_payment_id;
    //     const expectedSignature = crypto
    //         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    //         .update(body.toString())
    //         .digest("hex");
    //     return expectedSignature === razorpay_signature;
    // },
};
