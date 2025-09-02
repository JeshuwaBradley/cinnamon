// netlify/functions/check-price.js
exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);

        // Official product price list (secure data, not exposed in frontend)
        const products = {
            "cinnamon-oil-100": 7.70,
            "cinnamon-oil-250": 19.25,
            "cinnamon-oil-500": 38.50,
            "cinnamon-oil-1000": 77.00
        };

        let total = 0;

        // Validate each cart item
        for (const item of body.cart) {
            const officialPrice = products[item.id];

            if (!officialPrice) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Invalid product: " + item.id })
                };
            }

            // Calculate using server's price, not client price
            total += officialPrice * item.quantity;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ verifiedTotal: total.toFixed(2) })
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
    }
};
