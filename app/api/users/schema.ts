import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),  // no syntax/specs for email from our side, just the regular check by zod
    // age: z.number()
})

export default schema