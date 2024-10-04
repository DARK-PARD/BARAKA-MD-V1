// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU0xMlA2VVVaZFlMVkZhMks2RytSdU9uRnp4T2tQQnp0YXhaczBwZWhWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZm93Unptdzd1d1ZsZG1oQkJTN3U4eXdOTTRsZmJFVksxMTZYditBcWxGND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RW5wZ2tDdHEzak9Ua1k0ZWxvaU1aeVFqMGJ2UkR2dXRvNXplcU9DcVZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIycVVrMmhrWE5rVDhjQ082a3FhOXIyV2V0UXVTWlAzNHc4NmhNby9hMWxVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1BMDB2bCtXb3dhUElWOVFKUTNDVGVRU0xTM00vSUJCa0kxT0s2c1hPVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik85dVRlQjdZaVI4MEpDK1RDT2ZDZ3pPa2ZUaGh3VjU5dlFySllYRjk3RXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU45SVpNTzRmVmtaR0tjRDlRZG1DSi81YXh5VjhJN3ZpYlVHUmJJMWJHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjNXVTZuN2ROMm91aEJnOWl0M3dxd2JBVThkWm13MFNNd08yOUJlMnBEYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN2OTdEclI1R2FsTCt5WXFPMEx6Wk9mK0Yyamo2NkZtWFJmWkVhZ2JmajgzM2NQVGFIclV6aDhmR0hjRjZoT2Fiem1tT1phNmo4NXV3MTNxWmIzQWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJvYll1RzlPNlBFMkx3cTdDTENsdnI5VndzN09YTWh3aUt5MFQrMjFjU2hFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2amNPSkotb1RqLURkcW1oNUY4ZjFnIiwicGhvbmVJZCI6ImQ4ZDU3NDQ4LWZkYjktNGJkYS04ZWVhLWQxMGE2OTZiOTYzNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSitYaFgvaEpCOHFHWmpqNGpJVG5sRVE1TTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1pPS1FxRkdEcHp1ZndVaGxpcDlUSmFHalFZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRaVjlCVDM5IiwibWUiOnsiaWQiOiIyNjM3ODk0MzI5NDA6NTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0o2V3ppVVFyZkQrdHdZWVFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkR3aDNHSXhsWlU3am1FK0NscnhTMDVLNHFCOThSMFpwZ09HQzNuTUE0Z1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdGTG95WVN5OG9aZFN3WHpJZUJURmFENFIzUlNDTkVKcnVxZkhpNE1XTDZZZVZtVjZuaU9Ob1Z3WlA3RkNQNUFIZnloOTJMaU9aaGdrNld1b1VvK0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI4aHBCWEpUTitCeTF2RCsyYWhuSVBwNllqNWE3NjRQandGZHQzWFBYN1dsSVptdGpyVTN0eHJ2T2VlT0lKcFRSdXE3WWRrVjdNYVZJNEtHbjJWaTNnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTQzMjk0MDo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJROElkeGlNWldWTzQ1aFBncGE4VXRPU3VLZ2ZmRWRHYVlEaGd0NXpBT0lFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MDM0ODc1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVB0eiJ9",
  PREFIX: process.env.PREFIX || ';',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©MAGICAL-KX",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "263789432949",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
