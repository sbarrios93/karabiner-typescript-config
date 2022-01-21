import {
	KarabinerComplexModifications,
	Key,
} from "./deno_karabiner/lib/karabiner.ts";

import { hyper, hyperCmd } from "./utils/hyper.ts";
import { ifApp, notApp } from "./utils/conditions.ts";

console.log(Key)

const mods = new KarabinerComplexModifications();

mods.addRule({
	description: "Hyper key",
	manipulators: [
		{
			from: { key_code: "caps_lock", modifiers: { optional: ["any"] } },
			to: [
				{
					key_code: "right_shift",
					modifiers: ["right_control", "right_option"],
				},
			],
	type: "basic",
      to_if_alone: [
        {
          key_code: "escape",
        }
      ]
		},
	],
});

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

mods.addRule({
	description: `Parenthesis`,
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


// Block left-handed shift + left handed key
const leftHandedKeys: Key[] = ["1", "2", "3", "4", "5", "q", "w", "e", "r", "t", "a", "s", "d", "f", "g", "z", "x", "c", "v", "grave_accent_and_tilde"]
leftHandedKeys.forEach(element => {
	mods.addRule({
		description: `Block left-handed shift + ${element}`,
		manipulators: [
			{
				from: { key_code: element, modifiers: { mandatory: ["left_shift"] } },
				to: [
					{ key_code: "vk_none" },
				],
				type: "basic",
				},
		]
});
});

// Block left-handed shift + left handed key
const rightHandedKeys: Key[] = ["7", "8", "9", "0", "hyphen", "equal_sign", "semicolon", "quote", "open_bracket", "backslash", "close_bracket", "slash", "period", "comma", "slash", "non_us_backslash", "u", "i", "o", "p", "j", "k", "l", "n", "m"]

rightHandedKeys.forEach(element => {
	mods.addRule({
		description: `Block right-handed shift + ${element}`,
		manipulators: [
			{
				from: { key_code: element, modifiers: { mandatory: ["right_shift"] } },
				to: [
					{ key_code: "vk_none" },
				],
				type: "basic",
				},
		]
});
});


// mods.addRule({
// 	description: "Block left-handed shift + left handed key",
// 	manipulators: [
// 		{
// 			from: { key_code: "left_shift", modifiers: { optional: ["any"] } },


// VSCODE
// mods.addRule({
// 	  description: "VSCode",
// 	  manipulators: [

// const hyperTab = new HyperKey({
// 	id: "hyperTab",
// 	description: "Tab",
// 	from: {
// 		key_code: "tab",
// 		modifiers: {
// 			optional: ["any"],
// 	},
// },
// 	to_if_alone: [
// 		{
// 			// if pressed alone, act as tab
// 			key_code: "tab",
// 		},
// 	],
// });

// // Hyper Tab

// hyperTab.bindKey({
// 	description: "SemiColon",

// 	key: "o",
// 	to: {
// 		key_code: "semicolon",
// 	},
// });

// hyperTab.bindKey({
// 	description: "Colon",

// 	key: "i",
// 	to: {
// 		key_code: "semicolon",
// 		modifiers: ["right_shifrigrighth
// 	},
// });

// hyperCaps.bindKey({
// 	description: "Open parentheses",

// 	// combine the hyper key with the key 'd'
// 	key: "u",

// 	to: {
// 		key_code: "9",
// 		modifiers: ["right_shiftrigrighth
// 	},
// });

// hyperCaps.bindKey({
// 	description: "Close parentheses",

// 	// combine the hyper key with the key 'd'
// 	key: "i",

// 	to: {
// 		key_code: "0",
// 		modifiers: ["right_shiftrigrighth
// 	},
// });

// hyperCaps.bindKey({
// 	description: "Open curly Brackets",

// 	// combine the hyper key with the key 'd'
// 	key: "o",

// 	to: {
// 		key_code: "open_bracket",
// 	},
// });

// hyperCaps.bindKey({
// 	description: "Open curly Brackets",

// 	// combine the hyper key with the key 'd'
// 	key: "p",

// 	to: {
// 		key_code: "close_bracket",
// 	},
// });

mods.writeToProfile("main");