import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("info about the user"),
  async execute(interaction) {
    await interaction.replay(
      `this comman was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`
    );
  },
};
