import Path from "path"
import { defineConfig, loadEnv } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load ENV for vite.config.js
    const ENV = loadEnv(mode, process.cwd())

    return {
        base: ENV.VITE_BASE_PATH,
        plugins: [reactRefresh(), svgr()],
        resolve: {
            alias: {
                "@app": Path.resolve(__dirname, "src"),
                "@packages": Path.resolve(__dirname, "src/packages"),
                "@components": Path.resolve(__dirname, "src/components"),
                "@hooks": Path.resolve(__dirname, "src/hooks"),
                "@views": Path.resolve(__dirname, "src/views"),
                "@styles": Path.resolve(__dirname, "src/styles"),
                "@utils": Path.resolve(__dirname, "src/utils"),
            },
        },
    }
})
