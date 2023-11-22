import { SlashCommandBuilder } from 'discord.js';
import { client } from '../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('質問完了後、このコマンドを流し投稿をクローズする'),
  async execute(interaction) {
    const channel = await client.channels.fetch(interaction.channelId);
    const messages = await channel.messages.fetch();
    const faqItems = messages
      .filter((message) => !message.author.bot)
      .map((message) => {
        const attachments = message.attachments.map((attachment) => ({
          id: attachment.id,
          url: attachment.url,
          contentType: attachment.contentType,
        }));
        return {
          content: message.content,
          userName: message.author.globalName
            ? message.author.globalName
            : message.author.username,
          attachments,
        };
      });
    const faqData = {
      id: channel.id,
      title: channel.name,
      contents: [...faqItems.reverse()],
    };
    channel.setName(`【解決済】${channel.name}`).then(() => {
      channel.setArchived(true);
    });
    await interaction.reply('このチャットは終了しました');
  },
};
