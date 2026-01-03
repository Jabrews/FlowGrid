import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
	},
	
	// later for specifying test location
    //include: [
      //'src/**/*.{test,spec}.{ts,tsx}',
      //'tests/**/*.{test,spec}.{ts,tsx}',
   // ], 
	
});