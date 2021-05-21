import active from "./active.env";

const envs = {
    staging: {
        DEV_API: "https://backend-triptips.herokuapp.com",
    },
    dev: {
        DEV_API: "http://localhost:9000",
    }

};

export default envs[active];