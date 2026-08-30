#!/usr/bin/env node
// `npx cap sync ios` regenerates ios/App/CapApp-SPM/Package.swift, writing
// local Swift package paths (to @capacitor/* inside node_modules) using the
// host OS's path separator. On Windows that means backslashes, e.g.
// "..\..\..\node_modules\@capacitor\device" — but backslash isn't a path
// separator in Swift Package Manager on macOS/Linux, so a project synced on
// a Windows dev machine fails to resolve packages on the Mac that actually
// builds it (and in CI). Run this after every `cap sync` (see the
// `postcap:sync` hook in package.json) to normalize those paths back to
// forward slashes, which work identically on all three platforms.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const files = ['ios/App/CapApp-SPM/Package.swift'];

for (const file of files) {
  if (!existsSync(file)) continue;
  const original = readFileSync(file, 'utf8');
  const fixed = original.replace(/\\/g, '/');
  if (fixed !== original) {
    writeFileSync(file, fixed);
    console.log(`[fix-capacitor-spm-paths] normalized path separators in ${file}`);
  }
}
