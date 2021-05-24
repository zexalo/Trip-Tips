import active from "./active.env";

const envs = {
    staging: {
        DEV_API: "https://backend-triptips.herokuapp.com/api",
    },
    dev: {
        DEV_API: "http://localhost:9000/api",
    }

};

export default envs[active];
