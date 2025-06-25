import { app, port } from "./app.js";

app.listen(port, () => {
    console.info(`Hope hub is running on http://localhost:${port} in ${app.settings.env} mode`);
})