// const fetch = require("node-fetch");

// Replace with your sheet ID
const SHEET_ID = "1wzAMYBm8WwPxWnHasli1LyZ4tcrH7Uin5VNLmhB7bDw";

exports.handler = async () => {
    try {
        // Fetch products from Google Sheets (published to web)
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
        const response = await fetch(url);
        let text = await response.text();

        // Clean Google’s weird JSON wrapper
        text = text.substring(47, text.length - 2);
        const data = JSON.parse(text);

        // Parse into a nice array of objects
        let productList = data.table.rows.map(row => {
            return {
                id: row.c[0]?.v,
                name: row.c[1]?.v,
                price: parseFloat(row.c[2]?.v),
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ products: productList })
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
