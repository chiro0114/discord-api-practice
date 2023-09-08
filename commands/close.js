import { SlashCommandBuilder } from "discord.js";
import { client } from "../index.js";

export default {
  data: new SlashCommandBuilder()
    .setName("close")
    .setDescription("質問完了後、このコマンドを流し投稿をクローズする"),
  async execute({ channelId }) {
    client.channels.fetch(channelId).then((channel) => {
      channel.messages.fetch().then((a) => {
        const contentArray = a.map((e) => ({
          content: e.content,
          userName: e.author.globalName
            ? e.author.globalName
            : e.author.username,
        }));
        channel.setName(`【解決済】${channel.name}`).then(() => {
          channel.setArchived(true);
        });
      });
    });
  },
};
