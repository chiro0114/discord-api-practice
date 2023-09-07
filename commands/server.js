import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("info about the server"),
  async execute(interaction) {
    await interaction.reply(
      `this server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`
    );
  },
};
