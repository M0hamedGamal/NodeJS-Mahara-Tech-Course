const fs = require("fs/promises");
const path = require("path");

const crudTemplate = require("../templates/crudTemplate");

const generatedCRUDFile = async (resource, baseURL) => {
    try {
        if (!resource || !baseURL) {
            throw new Error("resource and baseURL are required");
        }

        const resourceCRUDCode = crudTemplate(resource, baseURL);

        const routesDir = path.join(__dirname, "../routes");
        const routePath = path.join(routesDir, `${resource.toLowerCase()}s.route.js`);

        // Ensure routes directory exists
        await fs.mkdir(routesDir, { recursive: true });

        // Write file
        await fs.writeFile(routePath, resourceCRUDCode, "utf8");

        console.log(`✅ CRUD route generated: ${routePath}`);
    } catch (error) {
        console.error("❌ Failed to generate CRUD file:", error.message);
    }
};

generatedCRUDFile("Car", "/cars");
