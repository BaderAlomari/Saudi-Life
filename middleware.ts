export {default} from "next-auth/middleware"

export const config = {
    matcher:[
        "/booking",
        "/favorites",
        "/myActivites",
        "/reservation",
        "/settings",
    ]
}