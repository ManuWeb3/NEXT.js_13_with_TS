import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    price: z.number().min(1).max(100)  // no restriction for no. to be an integer + chaining (range) possible
})

export default schema