import * as yup from "yup";
import yupEnv from "yup-env";

const envSchema = yup.object().noUnknown().shape({
    nodeEnv: yup.string().required(),
    nodePort: yup.number().required(),
});

export const crashIfEnvKO = (): void => {
    try {
        // parse and validate environment variables (return an object of type env not used !)
        yupEnv({ schema: envSchema });
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            console.log(".env not valid");
            console.log("yup.ValidationError " + JSON.stringify(e.errors));
            for (const inner of e.inner) if (inner.type === "oneOf") inner.errors.forEach((str) => console.log(str));
        }
    }
};

export const isLocalOrDev = (): boolean => {
    if (!process || !process.env || !process.env.NODE_ENV) {
        return false;
    }
    if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
        return true;
    }
    return false;
};
