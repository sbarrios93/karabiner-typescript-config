// deno-lint-ignore-file camelcase
// from https://github.com/denolfe/dotfiles/blob/master/karabiner/lib/conditions.ts
import { Condition } from '../deno_karabiner/lib/karabiner.ts';

type FrontmostApp = 'chrome' | 'vscode' | 'slack' | 'safari'

const bundleMap: Record<FrontmostApp, string> = {
  chrome: 'com.google.Chrome',
  vscode: 'com.microsoft.VSCode',
  slack: 'com.tinyspeck.slackmacgap',
  safari: 'com.apple.Safari',
}

export function ifApp(app: FrontmostApp): Condition {
  return {
    type: 'frontmost_application_if',
    bundle_identifiers: [bundleMap[app]],
  }
}

export function notApp(app: FrontmostApp): Condition {
  return {
    type: 'frontmost_application_unless',
    bundle_identifiers: [bundleMap[app]],
  }
}

export const nonAppleDevice: Condition = {
  type: 'device_unless',
  identifiers: [
    {
      vendor_id: 1452,
    },
  ],
}