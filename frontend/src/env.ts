import active from "./active.env";

const envs = {
    staging: {
        DEV_API: "https://backend-triptips.herokuapp.com/api",
    },
    dev: {
        DEV_API: "http://localhost:8080/api",
    }

};

export default envs[active];
