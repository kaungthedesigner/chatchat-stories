# ChatChat · Before the Rain Ends

A chat-based story game in the style of *Seen*, set in a small town in Myanmar. Min Htet and May Thiri meet over a broken umbrella in the monsoon of 2018. The ending is fixed; your replies change how it feels.

ChatChat is meant to hold more stories later, each with small side-quest mini games between the chats.

## What's playable

- **Prologue** · November 2020
- **Chapter 1 · The First Rain** · June 2018
- **Chapter 2 · Monsoon Season** · July to October 2018, with the Photo walk side quest
- **Chapter 3 · Thingyan** · March to December 2019, with the Water street side quest

## Run it

It's a single static page. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

The Dev bar at the top is a temporary timeline scrubber for jumping to any beat.

## Structure

- `index.html` · the whole game: UI, step engine and script
- `img/` · webtoon-style scene art, photos and avatars (WebP)
- `fonts/` · Phosphor Light icon font

## Deploying to Vercel

Vercel runs `build-vercel.sh` (set in `vercel.json`), which copies the game into `public/` with the dev timeline turned off (`DEV_ON=false`). The Claude artifact keeps the dev timeline.
