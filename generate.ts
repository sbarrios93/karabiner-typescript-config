import {
	KarabinerComplexModifications,
	Key,
} from "./deno_karabiner/lib/karabiner.ts";

import { hyper, hyperCmd } from "./utils/hyper.ts";
import { ifApp, notApp } from "./utils/conditions.ts";

const mods = new KarabinerComplexModifications();

mods.addRule({
	description: "Hyper key",
	manipulators: [
		{
			from: { key_code: "tab", modifiers: { optional: ["any"] } },
			to: [
				{
					key_code: "right_shift",
					modifiers: ["right_control", "right_option"],
				},
			],
			type: "basic",
			to_if_alone: [
				{
					key_code: "tab",
				},
			],
		},
	],
});

// Vim Key Bindings
mods.addRule({
	description: "Vim Key Bindings",
	manipulators: [
		// Arrows
		hyper("h", "left_arrow"),
		hyper("l", "right_arrow"),
		hyper("k", "up_arrow"),
		hyper("j", "down_arrow"),
	],
});

const vimTuples: [Key, Key][] = [
	["k", "up_arrow"],
	["j", "down_arrow"],
	["h", "left_arrow"],
	["l", "right_arrow"],
];

vimTuples.forEach(([keyFrom, keyTo]) => {
	mods.addRule({
		description: `Vim Key Bindings ${keyFrom} -> ${keyTo}`,
		manipulators: [
			// Arrows
			hyper(keyFrom, keyTo),
			hyperCmd(keyFrom, keyTo, { modifiers: ["left_shift"] }),
		],
	});
});

// Symbols
mods.addRule({
	description: `Brackets`,
	manipulators: [
		// Parenthesis
		hyper("e", "9", { modifiers: ["left_shift"] }),
		hyper("r", "0", { modifiers: ["left_shift"] }),
		hyper("i", "open_bracket", { modifiers: ["left_shift"] }),
		hyper("o", "close_bracket", { modifiers: ["left_shift"] }),
		hyperCmd("i", "open_bracket"),
		hyperCmd("o", "close_bracket"),
	],
});

mods.addRule({
	description: `Semicolon / Colon`,
	manipulators: [
		// Semicolon
		hyper("q", "semicolon", { modifiers: ["left_shift"] }),
		hyper("w", "semicolon"),
	],
});

mods.addRule({
	description: `Quote / Double Quote`,
	manipulators: [
		// Quote / Double Quote
		hyper("t", "quote"),
		hyper("y", "quote", { modifiers: ["left_shift"] }),
	],
});

mods.addRule({
	description: `hyphen / Underscore`,
	manipulators: [
		// Quote / Double Quote
		hyper("f", "hyphen"),
		hyper("g", "hyphen", { modifiers: ["left_shift"] }),
	],
});

// Block left-handed shift + left handed key
const leftHandedKeys: Key[] = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"q",
	"w",
	"e",
	"r",
	"t",
	"a",
	"s",
	"d",
	"f",
	"g",
	"z",
	"x",
	"c",
	"v",
	"grave_accent_and_tilde",
];
leftHandedKeys.forEach((element) => {
	mods.addRule({
		description: `Block left-handed shift + ${element}`,
		manipulators: [
			{
				from: {
					key_code: element,
					modifiers: { mandatory: ["left_shift"] },
				},
				to: [{ key_code: "vk_none" }],
				type: "basic",
			},
		],
	});
});

// Block left-handed shift + left handed key
const rightHandedKeys: Key[] = [
	"7",
	"8",
	"9",
	"0",
	"hyphen",
	"equal_sign",
	"semicolon",
	"quote",
	"open_bracket",
	"backslash",
	"close_bracket",
	"slash",
	"period",
	"comma",
	"slash",
	"non_us_backslash",
	"u",
	"i",
	"o",
	"p",
	"j",
	"k",
	"l",
	"n",
	"m",
];

rightHandedKeys.forEach((element) => {
	mods.addRule({
		description: `Block right-handed shift + ${element}`,
		manipulators: [
			{
				from: {
					key_code: element,
					modifiers: { mandatory: ["right_shift"] },
				},
				to: [{ key_code: "vk_none" }],
				type: "basic",
			},
		],
	});
});

mods.writeToProfile("main");
