import { z } from "zod";

const question = z.object({
	question: z.string(),
	response: z.object({
		title: z.string(),
		color: z.string().optional(),
		description: z.string(),
		image: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
		thumbnail: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
	}),
});

const configSchema = z.object({
	token: z.string(),
	owners: z.array(z.string()),
	log_channel_id: z.string().optional(),
	presence_activity: z.object({
		activity1: z.string(),
		activity2: z.string(),
		activity3: z.string(),
		activity_type: z.number(),
		custom_status: z.string().optional(),
		status: z.string().optional(),
		stream_url: z.string().optional(),
	}),
	embed1_content: z.object({
		title: z.string(),
		desc: z.string(),
		color: z
			.string()
			.refine((color) => !isNaN(parseInt(color, 16)), { message: "The color property is not a valid hex color. It cannot contain a #." }),
		footer: z.string(),
		image: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
		thumbnail: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
	}),
	embed2_content: z.object({
		title: z.string(),
		color: z
			.string()
			.refine((color) => !isNaN(parseInt(color, 16)), { message: "The color property is not a valid hex color. It cannot contain a #." }),
		image: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
		thumbnail: z.object({ enabled: z.boolean(), url: z.string().optional() }).default({ enabled: false }),
		addfields: z.object({
			enabled: z.boolean(),
			fields: z.array(z.object({
				name: z.string(),
				value: z.string(),
				inline: z.boolean()
			}))
		}).default({
			enabled: false,
			fields: []
		})
	}),
	questions: z.array(question).min(1).max(25).default([]),
});

export default configSchema;
export type Config = z.infer<typeof configSchema>;
export type ConfigQuestion = z.infer<typeof question>;
