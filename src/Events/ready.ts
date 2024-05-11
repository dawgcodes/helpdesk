import { PresenceStatusData } from "discord.js";
import { Event } from "nhandler";

import Client from "../Classes/Client";
import Logger from "../Classes/Logger";
export default class implements Event {
    client!: Client;
    name = "ready";

    async run() {
        let message = `The bot is ready in ${Date.now() - this.client.initDate}ms as ${this.client.user?.tag}.`;
        Logger.startup(message);

        const activities = [
            `${this.client.config.presence_activity.activity1}`,
            `${this.client.config.presence_activity.activity2}`,
            `${this.client.config.presence_activity.activity3}`,
        ];

        setInterval(() => {
            const randomActivity =
                activities[Math.floor(Math.random() * activities.length)];
            const activityObj: {
                name: string;
                type: number;
                url: string;
                state?: string;
            } = {
                name: `${randomActivity}`,
                type: this.client.config.presence_activity.activity_type,
                url: `${this.client.config.presence_activity.stream_url}`,
            };

            if (this.client.config.presence_activity.activity_type === 4) {
                activityObj.state = `${this.client.config.presence_activity.custom_status}`;
            }

            if (this.client.user) {
                this.client.user.setPresence({
                    activities: [activityObj],
                    status: this.client.config.presence_activity.status as PresenceStatusData,
                });
            }
        }, 15000);

        Client.commandHandler.updateApplicationCommands();
        Logger.startup("Updated application commands.");
    }
}
