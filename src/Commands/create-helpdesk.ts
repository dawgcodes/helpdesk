import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { CommandError } from "nhandler";

import BaseCommand from "../Classes/BaseCommand";

export default class extends BaseCommand {
	name = "helpdesk";
	description = "Create the help desk.";
	
	emojis = [
		"<:m_1:1126897950019309680>",
		"<:m_2:1126897950019309680>",
		"<:m_3:1126897950019309680>",
		"<:m_4:1126897950019309680>",
		"<:m_5:1126897950019309680>",
		"<:m_6:1126897950019309680>",
		"<:m_7:1126897950019309680>",
		"<:m_8:1126897950019309680>",
		"<:m_9:1126897950019309680>",
		"<:m_10:1126897950019309680>",
	];

	async run(interaction: ChatInputCommandInteraction): Promise<void> {
		if (!interaction.guild) throw new CommandError("This command can only be used in a server.");
		if (!this.client.config.owners.includes(interaction.user.id)) throw new CommandError("You are not allowed to use this command.");
		if (!this.client.config.questions.length) throw new CommandError("There aren't any questions set up in the bot config.");

		const desc = this.client.config.questions
			.map(({ question }: { question: string }, idx: number) => {
				return `${this.emojis[idx]} ${question}`;
			})
			.join("\n\n");

		const embed2 = new EmbedBuilder();
		embed2.setTitle(this.client.config.embed2_content.title);
		embed2.setColor(parseInt(this.client.config.embed2_content.color, 16));
		if (this.client.config.embed2_content.thumbnail.enabled && this.client.config.embed2_content.thumbnail.url)
			embed2.setThumbnail(this.client.config.embed2_content.thumbnail.url);
		if (this.client.config.embed2_content.image.enabled && this.client.config.embed2_content.image.url)
			embed2.setImage(this.client.config.embed2_content.image.url);
		embed2.setDescription(desc);
		if (this.client.config.embed2_content.addfields.enabled) {
			this.client.config.embed2_content.addfields.fields.forEach(field => {
				embed2.addFields({
					name: field.name,
					value: field.value,
					inline: field.inline
				});
			});
		}		
			  

		const embed1 = new EmbedBuilder();
		embed1.setTitle(this.client.config.embed1_content.title);
		embed1.setDescription(this.client.config.embed1_content.desc);
		embed1.setFooter({ text: this.client.config.embed1_content.footer });
		embed1.setColor(parseInt(this.client.config.embed1_content.color, 16));
		if (this.client.config.embed1_content.thumbnail.enabled && this.client.config.embed1_content.thumbnail.url)
			embed1.setThumbnail(this.client.config.embed1_content.thumbnail.url);
		if (this.client.config.embed1_content.image.enabled && this.client.config.embed1_content.image.url)
			embed1.setImage(this.client.config.embed1_content.image.url);


		let rows = [];
		for (let rowOffset = 0; rowOffset < this.client.config.questions.length; rowOffset += 5) {
			const row = new ActionRowBuilder<ButtonBuilder>();
			const components = [];
			for (let colIdx = 0; colIdx < 5; colIdx++) {
				const idx = rowOffset + colIdx;
				if (this.client.config.questions[idx]) {
					components.push(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(this.emojis[idx]).setCustomId(`helpdesk-${idx}`));
				}
			}
			row.addComponents(components);
			rows.push(row);
		}
		await interaction.channel!.send({ embeds: [embed1] });
		await interaction.channel!.send({ embeds: [embed2], components: rows });

		interaction.reply({ content: "Help desk created.", ephemeral: true });
	}
}
