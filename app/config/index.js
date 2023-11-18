const config = {
    app: {
        port: 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://nhutb1910428:Minhnhut27052001@cluster0.goa5uls.mongodb.net/Few?retryWrites=true&w=majority"
    }
};
module.exports = config;