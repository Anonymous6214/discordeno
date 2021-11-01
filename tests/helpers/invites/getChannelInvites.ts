import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function getChannelInvitesTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(invite);

  const secondInvite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(secondInvite);

  const invites = await bot.helpers.getChannelInvites(channelId);

  if (invites.size < 2) {
    throw new Error("The function getChannelInvites didn't return all the invites");
  }
}
