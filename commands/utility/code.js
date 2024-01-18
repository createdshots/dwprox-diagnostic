const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const criteria = [
    { name: 'Published', values: ['⚠️ No ⚠️', 'Yes'] },
    { name: 'Creator Type', values: ['Error', 'User', 'Group'] },
    { name: 'Turnstile License', values: ['Doesn\'t own', 'Owns', 'Error'] },
    { name: 'AutoPro License', values: ['Doesn\'t own', 'Owns', 'Error'] },
    { name: 'HTTP Requests', values: ['⚠️ Previously not enabled, auto-enabled ⚠️', 'Were enabled'] },
    { name: 'Axon Check', values: ['Error', 'Licenses tabled'] },
    { name: 'Mainbanks', values: ['System installed with license', '⚠️ System with no license ⚠️'] },
    { name: 'ATM', values: ['System installed with license', '⚠️ System with no license ⚠️'] },
    { name: 'CafePOS', values: ['System installed with license', '⚠️ System with no license ⚠️'] },
    { name: 'SCO', values: ['System installed with license', '⚠️ System with no license ⚠️'] },
    { name: 'EAS', values: ['System installed with license', '⚠️ System with no license ⚠️'] },
    { name: 'SCO Terminal', values: ['Under 50 installed or system isn\'t installed', '⚠️ Over 50 installed ⚠️'] },
    { name: 'Weld Issues', values: ['No issues found', '⚠️ Issues found ⚠️'] },
    { name: 'Collision Issues', values: ['No issues found', '⚠️ Issues found ⚠️'] },
];

const codeCommand = new SlashCommandBuilder()
    .setName('code')
    .setDescription('Checks the status based on a support code')
    .addStringOption(option => 
        option.setName('code')
            .setDescription('The code provided by the user')
            .setRequired(true)
    );

async function handleCodeCommand(interaction) {
    const code = interaction.options.getString('code');
    if (code.length < 13 || code.length > 16 || !/^\d+$/.test(code)) {
        await interaction.reply('Invalid code. Please provide a code that is between 13 and 16 digits long.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Code Analysis');

    for (let i = 0; i < code.length; i++) {
        const digit = parseInt(code[i]);
        const field = criteria[i];
        const value = field.values[digit % field.values.length];
        embed.addFields({ name: field.name, value: value });
    }

    await interaction.reply({ embeds: [embed] });
}

module.exports = {
    data: codeCommand,
    execute: handleCodeCommand
};