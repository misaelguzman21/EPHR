// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Asegúrate de que no intentas resolver módulos propios del servidor en el cliente
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
};