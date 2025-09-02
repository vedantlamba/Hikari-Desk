import { query } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not Authenticated");
    }
    const ordId = identity.orgId as string;
    if (!ordId) {
      throw new Error("Missing Organization");
    }

    // throw new Error("Tracking Test");
    const users = await ctx.db.query("users").collect();

    return users;
  },
});
