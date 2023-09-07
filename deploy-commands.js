import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];

const __filename = fileURLToPath(import.meta.url);
const foldersPath = path.dirname(__filename) + "/commands/";
const commandFolders = fs.readdirSync(foldersPath);

const getCommnads = commandFolders.map((folder) => {
  const commandsPath = foldersPath + folder;

  return import(commandsPath).then((command) => {
    const result = command.default;
    if (result.data && result.execute) {
      commands.push(result.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${commandsPath} is missing a required "data" or "execute" property.`
      );
    }
  });
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
Promise.all(getCommnads).then(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
});
