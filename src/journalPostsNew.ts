import type { JournalPost } from "./journalPosts";

// Four cornerstone Journal posts (June 2026), authored from Rebecca's drafts. Only the blog
// body is used (not the meta or repurposing notes). Rendered through the same BlogArticle
// template with the richer editorial blocks so they blend with the rest of the Journal.

export const NEW_POSTS: JournalPost[] = [
  // ───────────────────────── Pillar 1: The Calm Antidote ─────────────────────────
  {
    path: "/blog/you-dont-have-to-do-all-of-this/",
    slug: "you-dont-have-to-do-all-of-this",
    category: "Reflections",
    title: "You Don't Have to Do All of This",
    subtitle: "A quiet permission slip for couples planning a New Zealand wedding from across the world",
    date: "2026-06-24",
    dateDisplay: "June 2026",
    hero: "/assets/images/slide-17.webp",
    excerpt:
      "A quiet permission slip for couples planning from across the world. You do not have to do all of this, not by yourself, not at midnight on a Wednesday with a half-cold cup of tea.",
    blocks: [
      { type: "lede", text: `If you are reading this, you are probably tired.` },
      { type: "p", text: `Maybe a different kind of tired than usual. The kind that comes from having 47 tabs open in your browser, three Pinterest boards titled "maybe?", a wedding spreadsheet you swore you would not need, and a creeping sense that something about all of this is supposed to feel more joyful than it currently does.` },
      { type: "p", text: `I want to begin by saying something gentle.` },
      { type: "pullquote", text: `You do not have to do all of this.` },
      { type: "p", text: `Not the spreadsheet. Not the 12-step planning guide. Not the timeline that has you booking a videographer 14 months out and an arch rental 9 months out. Not the comparison between three caterers, four florists, and an invitation suite designer in Melbourne who has a six-month waiting list.` },
      { type: "p", text: `Not all of it. Not by yourself. Not at midnight on a Wednesday with a half-cold cup of tea.` },
      { type: "p", text: `I am writing this post because every single couple who has ever booked Fantail Weddings has, somewhere in our first conversation, said some version of the same sentence. Different words. Same meaning.` },
      { type: "quote", text: `We just want it to feel calm.` },
      { type: "p", text: `And I want to take a moment, before any logistics, recommendations, or links to anything, to say that this wish is not too much to ask.` },

      { type: "h", text: `The internet has a wedding problem` },
      { type: "p", text: `I have been planning weddings for over fifteen years. I have watched the industry shift, beautifully and not-so-beautifully, into what it is now.` },
      { type: "p", text: `And here is the truth: planning a wedding has never been easier in terms of access, and never harder in terms of noise.` },
      { type: "p", text: `You can find a thousand venues in a single afternoon. You can be inspired, intimidated, comparison-spiralled, and quietly destabilised in the same scroll. You can read 14 articles about "things every bride forgets," each one designed to remind you of something you had not thought about and now cannot stop thinking about.` },
      { type: "p", text: `The algorithm does not know you. It does not know that you are flying from Singapore and have never been to New Zealand. It does not know that the noise it is feeding you is making you anxious rather than informed.` },
      { type: "p", text: `So somewhere along the way, planning a wedding stopped feeling like the loveliest project of your life and started feeling like a job you did not apply for. I want to interrupt that, gently.` },

      { type: "h", text: `What calm actually looks like` },
      {
        type: "statements",
        items: [
          `Calm is not the absence of decisions. It is the presence of someone who can hold them with you.`,
          `Calm is voice notes you can listen to while you are walking the dog, instead of email chains that pile up in your inbox like overdue homework.`,
          `Calm is a Loom video your planner sent you on Tuesday afternoon, walking you through the venue layout while you sit on the sofa with your partner and a glass of wine.`,
          `Calm is a welcome guide that reads like a love letter rather than a brief.`,
          `Calm is knowing that someone, on the other side of the world, is awake and emailing your celebrant on a Tuesday morning while you sleep on a Monday night.`,
          `Calm is the moment, six weeks out, when you have a small wobble at 3 am, and your planner not only expects it but has gently, wordlessly already planned for it.`
        ]
      },
      { type: "p", text: `I expect that wobble. Every couple has one. Sometimes a small wobble, sometimes a wee freak-out. Some need a long phone call. Some need a voice note that says, "everything is in hand, take the day, ring me tomorrow if you want."` },
      { type: "p", text: `I have seen it enough to know it is part of the journey, not a sign you have done something wrong. The calm I am building this entire business around is partly about that very moment.` },

      { type: "h", text: `What calm is not` },
      { type: "p", text: `Calm is not me being precious or detached. It is not avoidance. It is not the absence of urgency when urgency is needed.` },
      { type: "p", text: `Calm is not pretending that nothing ever goes sideways at a wedding. Things shift. The wind picks up. A flight gets delayed. Florists run late. None of this is a crisis. All of this is, in a quiet way, expected.` },
      { type: "p", text: `Calm is not me promising you a perfect day. I promise you a deeply present one. There is a difference, and the difference is the entire point.` },
      { type: "p", text: `And calm is absolutely not the same as boring. The couples I work with want their weddings to feel cinematic, considered, deeply personal, and full of joy. The calm is what makes the joy possible. It is the structure underneath.` },

      { type: "h", text: `Three small permissions, before you go any further` },
      {
        type: "steps",
        steps: [
          { n: "01", title: "To stop researching for a minute", body: `If you have been deep in the wedding internet for weeks, the most useful thing you can do today is close your laptop. Make a cup of tea. Ask each other one question only: when we imagine our wedding day, what does the morning feel like? Not the venue. Not the dress. The morning. That answer is the entire brief. Everything else is logistics in service of that morning.` },
          { n: "02", title: "To choose smaller", body: `Couples are choosing smaller, on purpose. Not because they cannot afford bigger, but because smaller is, often, the more luxurious choice. A wedding of thirty people, in a country your guests will fall in love with, over a weekend they will remember in their bones. That is not a downgrade. That is a re-prioritisation. Your wedding day is not an obligation slot. It is a love letter to the very few.` },
          { n: "03", title: "To not do this alone", body: `The most exhausted couple I ever met booked me 11 weeks out. They had been trying to plan it themselves for over a year, from two countries, both working full-time. By the time we spoke, they were starting to resent each other. Eleven weeks later, they had a wedding that felt completely unhurried. Doing this alone, while also working, planning travel, and building a life, is sometimes more than the human nervous system can carry.` }
        ]
      },

      { type: "h", text: `What I quietly believe about weddings` },
      {
        type: "statements",
        items: [
          `I believe a wedding day should feel like the most beautiful version of your real life, not a performance of someone else's.`,
          `I believe the planning months should feel as good as the day itself. If they do not, something is wrong, and that something is fixable.`,
          `I believe that hospitality is one of the most romantic things you can offer your guests. They have flown a long way. They deserve to be looked after.`,
          `I believe in the slightly imperfect, deeply real, generously held celebration over the perfectly styled, hollowly executed one. Every time.`,
          `I believe in the South Island of Aotearoa. I believe in landscapes that need no decorating, in mountains that do not care about your timeline.`,
          `And I believe that you do not have to do all of this. That is not a weakness. That is wisdom.`
        ]
      },
      { type: "pullquote", text: `Take a deep breath. You have already done the hardest thing; you have decided what kind of celebration you want.` },
      { type: "p", text: `If any of this resonated, if you exhaled even a little while reading, if something in you said "yes, that, please" then we should probably talk. I take a small handful of weddings each year so I can give them my whole heart. There is no script, no funnel, no automated reply. Just me, a cup of Earl Grey, and your note read carefully.` }
    ]
  },

  // ───────────────────────── Pillar 2: Aotearoa as Character ─────────────────────────
  {
    path: "/blog/why-the-south-island-doesnt-need-decorating/",
    slug: "why-the-south-island-doesnt-need-decorating",
    category: "Destination Wedding",
    title: "Why the South Island Doesn't Need You to Decorate It",
    subtitle: "An honest love letter to Aotearoa for couples choosing it for their wedding day",
    date: "2026-06-17",
    dateDisplay: "June 2026",
    hero: "/assets/images/slide-19.webp",
    excerpt:
      "An honest love letter to Aotearoa: the South Island regions worth choosing, when to come season by season, and why this land needs noticing rather than decorating.",
    blocks: [
      { type: "lede", text: `There is a moment, driving the Crown Range from Queenstown to Wanaka, where the road climbs and turns and suddenly drops into a view that does not look real.` },
      { type: "p", text: `On either side, mountains. Below, a long valley falling toward Lake Wanaka, the colour of which keeps changing depending on what the sky is doing that hour. Tussock catching the light. Sheep moving slowly. Air so clear it hurts your throat a little when you breathe in.` },
      { type: "p", text: `I have driven that road probably two hundred times. It still makes me stare just a little bit longer. And every time I do, I think the same thing: this place does not need decorating.` },
      { type: "pullquote", text: `Some destinations need decorating. Aotearoa needs noticing.` },
      { type: "p", text: `I want to write this post for the couple sitting somewhere far away, maybe Brooklyn, maybe Singapore, trying to figure out whether New Zealand is really worth the 12-hour flight, the time zone, and the planning from the other side of the world. Yes. It is. Here is why.` },

      { type: "h", text: `First, a small but important note` },
      { type: "p", text: `Before I tell you anything about the landscapes, I want to tell you about the country you are coming to.` },
      { type: "p", text: `Aotearoa is the Māori name for New Zealand. It is older than the English one. It translates, most commonly, as "land of the long white cloud." When you come here, you are coming to a place with a deep, complicated, beautiful indigenous heritage. The mountain ranges, rivers, forests, and islands all have Māori names that carry centuries of meaning. Many of the venues where I work sit on land with iwi (tribal) connections that long predate European settlement.` },
      { type: "p", text: `I am still learning, always. I am not Māori myself. But where it is appropriate and welcomed, I bring this awareness into how we plan, how we name a place, how we acknowledge the land. Some couples want to incorporate a karakia (blessing) into their ceremony. Some choose to acknowledge tangata whenua (the people of the land) in their welcome. None of this is performative. All of it is led by the couple, in conversation, with care.` },
      { type: "p", text: `I tell you this not to make planning more complicated, but because you should know what kind of country you are getting married in. The land has its own story. Yours sits gently inside it.` },

      { type: "h", text: `The South Island, broken into the regions I love most` },
      {
        type: "steps",
        steps: [
          { title: "Central Otago — Wanaka, Queenstown, Glenorchy, Arrowtown", body: `If New Zealand is the destination on your bucket list, Central Otago is probably the reason. Long lakes. Sharp mountain ranges. Vineyards in valleys. Wanaka feels slower than Queenstown. Queenstown is for couples who want a little buzz. Glenorchy is for couples who want to disappear into a landscape wedding. Arrowtown is the storybook in autumn. This is where most of my couples gravitate. The catch: it books up early, especially February through April. Plan 14 to 18 months ahead.` },
          { title: "The Mackenzie Country — Aoraki/Mt Cook, Lake Tekapo, Twizel", body: `If you have ever seen a turquoise lake with a snow-capped mountain behind it, you have probably seen the Mackenzie. It is one of the best places in the world for stargazing; the Aoraki Mackenzie International Dark Sky Reserve covers the entire region. It suits couples who want grandeur without crowds, ideal for guest counts under 30. Aoraki, the highest mountain in the country, has deep cultural significance for Ngāi Tahu, the local iwi.` },
          { title: "Marlborough Sounds & Nelson Tasman — the warmer, softer top of the South", body: `If your couple-energy is more sun-drenched than alpine, sailboats, vineyards, golden-sand beaches that feel almost Mediterranean, the top of the South Island is your match. The Marlborough Sounds are still water, deep green forest, hidden bays; many venues here are reachable only by boat, which I find quietly romantic. Nelson Tasman is for vineyard weddings without the crowds of the more famous wine regions.` },
          { title: "The West Coast & Fiordland — the wild, sacred edge", body: `This is the part of the country most visitors do not see. Glaciers. Rainforest. Black-sand beaches. Milford Sound, a place with such a cinematic, ancient, almost religious atmosphere that I struggle to describe it without sounding overwrought. Fiordland is for elopements, mostly: the infrastructure is small and the weather is dramatic, which makes it perfect for the two of you, a celebrant, and a witness or two.` }
        ]
      },

      { type: "h", text: `When to come` },
      { type: "p", text: `New Zealand's seasons are upside down compared to the Northern Hemisphere. Our summer is your winter. Our autumn is your spring. Here are the four seasons, honestly, from a planner who has worked in all of them.` },
      {
        type: "steps",
        steps: [
          { title: "February to early April — the sweet spot", body: `Long days. Settled weather. Warm but not hot. The colour of the country in late February through early April is, to my eye, unmatched. This is when most of my intimate weddings happen. Book 14 to 18 months ahead.` },
          { title: "Late April to May — the underrated season", body: `Autumn in Central Otago is its own argument for visiting. The poplars and oaks turn impossibly golden. Tourism slows a little. The light becomes soft and long. If you want fewer crowds and more atmosphere, look here.` },
          { title: "October to early December — spring and early summer", body: `Wildflowers and lupins. Lambs. Snow still on the highest peaks. Days lengthening. Weather a little less settled than autumn, but generally beautiful. Some venues open only from October onward.` },
          { title: "Winter — June through September", body: `Snow weddings. Cold-weather elopements. Crisp, sparkling days when the conditions are right. Not for everyone, but for the right couple, unforgettable. The trade-off is that some vendors and venues close for the season, so plan accordingly.` }
        ]
      },

      { type: "h", text: `What it actually feels like to be here` },
      { type: "p", text: `When your guests fly twelve, fourteen, sixteen hours to come to your wedding, something shifts in them by the time they arrive. They cannot just dip into the celebration on a Saturday afternoon and be home for Sunday dinner. They have to come. To stay. To be present in a way that modern life does not often allow.` },
      { type: "p", text: `I see it at every Fantail wedding. The way guests arrive a little frazzled and, by the welcome dinner, are already softer. The way phones disappear. The way conversations stretch. The way someone you have known for twenty years suddenly tells you a story you have never heard, because you are sitting on a stone wall in tussock with a glass of wine and the light is doing that thing it does at 8 pm in late February.` },
      { type: "p", text: `That is the South Island as a wedding venue. It is not just beautiful. It is slowing.` },

      { type: "h", text: `What I would tell you if we were sitting in my kitchen` },
      {
        type: "steps",
        steps: [
          { title: "Do not try to see all of it", body: `Choose one region. Maybe two. Build your celebration there. Trust that your guests will fall in love with what they see, even if it is just a small slice.` },
          { title: "Build a multi-day experience", body: `A welcome dinner the night before. The wedding day itself. A farewell brunch the morning after. Optional extras for guests who want to extend: vineyard tours, an alpine walk, a Milford Sound cruise, a stargazing dinner in the Mackenzie.` },
          { title: "Work with someone local", body: `I am biased, of course. But the time zone alone makes this exponentially easier. A planner who lives in Aotearoa can be talking to your celebrant before you wake up.` },
          { title: "Trust the land. Do not over-style", body: `The instinct to add more, to fill the space, to bring in elaborate decor, will quietly compete with the place itself. The most beautiful weddings are the ones that lean into what is already here.` },
          { title: "Come a few days early", body: `Walk the venue without your wedding hat on. Drive somewhere remote. Let the country make its case to you. By the time the celebration arrives, you will already be in love with it.` }
        ]
      },
      { type: "p", text: `If you are dreaming of a wedding in the South Island of Aotearoa and would like a quiet conversation about whether it is right for you, I would love to hear from you. Tell me a little about the two of you and what made you start dreaming of this country.` }
    ]
  },

  // ───────────────────────── Pillar 3: Guest-First as a Movement ─────────────────────────
  {
    path: "/blog/most-romantic-thing-for-your-guests/",
    slug: "most-romantic-thing-for-your-guests",
    category: "Guest Experience",
    title: "The Most Romantic Thing You Can Do for Your Wedding Guests",
    subtitle: "A manifesto for hospitality at the modern, intimate wedding",
    date: "2026-06-10",
    dateDisplay: "June 2026",
    hero: "/assets/images/guests-enjoying-lunch.webp",
    excerpt:
      "A manifesto for hospitality at the modern, intimate wedding, and twelve quiet decisions that make the people who flew across the world to be there feel truly held.",
    blocks: [
      { type: "lede", text: `A couple I worked with several years ago invited 32 people to their wedding in Central Otago. Thirty-two people, flying in from Australia, the United States, Singapore, the United Kingdom, and a handful from across New Zealand.` },
      { type: "p", text: `On the wedding day itself, somewhere around 8 pm, after the speeches and before the dancing, an elderly aunt of the groom stood up. She had flown twenty-eight hours to be there. She was tired. She had not been sure she could come at all. She tapped her glass. The room quieted. And she said something I have thought about every working day since.` },
      { type: "quote", text: `I know this is your day. But I want you to know that this is the most cared-for I have ever felt at any wedding. From the moment we landed. The car waiting. The note in my room. The chair with arms at the dinner table. Whoever did all of this, thank you.` },
      { type: "p", text: `Then she sat down. And the bride cried. And so did I, quietly, from the back of the room where I was double-checking that the cake was being cut correctly.` },
      { type: "pullquote", text: `A guest-first wedding is not a trend. It is a value.` },
      { type: "p", text: `I want to write this for the couple feeling slightly guilty right now. The guilt of inviting fewer people than they think they should. The guilt of asking guests to fly long distances. The quiet, unspoken guilt that hovers around a destination wedding. I want to gently dismantle that guilt. Because when you choose your guests carefully, and then look after them well, your wedding becomes the most generous thing you have ever done.` },

      { type: "h", text: `Hospitality is a love language` },
      { type: "p", text: `I think about hospitality a lot. Not the performative, Instagram-worthy kind. The real kind. The kind that involves remembering who is gluten-free without being told twice. The kind that pours a second glass before someone has to ask. The kind that puts a softer chair at the dinner table for the person whose back is hurting from the long flight.` },
      { type: "p", text: `When I say guest-first, I do not mean over-the-top. I do not mean ten-tier welcome boxes and a personal concierge for every guest. I mean a thousand small, quiet decisions made early enough that on the day, your people simply feel held.` },
      { type: "p", text: `It is the welcome note in the hotel room. The map that shows them where the good coffee is. The shuttle that arrives without anyone needing to ask. The chair with arms for the auntie. The mocktail, just as beautifully presented as the cocktails, so the friend in recovery is not standing awkwardly with a glass of water. It is the bathroom that has hairspray, plasters, paracetamol, hair ties, and a hand cream that smells like jasmine. These are not extras. These are the love languages.` },

      { type: "h", text: `Why the wedding industry mostly forgot about guests` },
      { type: "p", text: `Somewhere along the way, the wedding industry started selling weddings as a personal performance. The two of you, centre stage. The day as a stylised event, photographed primarily for the couple to remember and for an audience of strangers on the internet to admire. Guests, in this version, are background. They get a chair. They get a meal. They are an audience, not the heart.` },
      { type: "p", text: `I think this is one of the saddest shifts in wedding culture, and the couples I work with are quietly rebelling against it. They are inviting fewer people, on purpose. They are deliberately spending more on each guest. They are designing the celebration around how their people will feel, not how the day will photograph. This is not a downgrade. It is a profound upgrade.` },
      { type: "p", text: `The people who fly long distances to be at your wedding are giving you something extraordinary. Their time. Their money. Their effort. Their presence. The least we can do is treat their experience as if it matters as much as our own.` },

      { type: "h", text: `Twelve quiet hospitality decisions you can make right now` },
      { type: "p", text: `These are not in any particular order. Pick the ones that feel right for the kind of celebration you want.` },
      {
        type: "steps",
        steps: [
          { n: "01", title: "Send a welcome guide before they fly", body: `Two weeks out, send each guest a beautifully designed digital welcome guide. What to expect. What to pack. The dress code, with weather notes. Local tips. The timeline. Their travel feels held before they have left their kitchen.` },
          { n: "02", title: "A welcome note in the room", body: `When they arrive, a small, handwritten note, addressed to them. A thank-you for coming. A sentence about why they matter to you. It takes ten minutes per guest. It is remembered for a lifetime.` },
          { n: "03", title: "A tiny welcome basket, not a wedding favour", body: `If you leave something in the room, make it useful. A bottle of water. Local biscuits. A travel adapter. A sachet of paracetamol. The energy is "we knew you'd need this," not "we wanted to look generous."` },
          { n: "04", title: "A welcome dinner the night before", body: `It does not need to be formal. A pizza night at the venue. A barbecue at someone's holiday house. The point is that your people meet each other once before the wedding day, so the day itself feels like a reunion rather than an introduction.` },
          { n: "05", title: "Plan the transport so they don't have to", body: `Your guests are probably scattered across Queenstown, Wanaka and Arrowtown. Build shuttles to the venue and back, with timings confirmed weeks in advance. No one should be paying for a taxi in an evening dress.` },
          { n: "06", title: "Honour every dietary requirement, properly", body: `When someone tells you they are gluten-free, they are telling you what their body needs. Every dietary requirement should receive the same care, presentation, and excitement as the standard menu. The vegan main should look as beautiful on the plate as the lamb. Always.` },
          { n: "07", title: "The chair detail", body: `If you have older guests or guests with mobility needs, ask the venue for armchairs at their dinner seats. It is the smallest possible adjustment. It transforms their evening. They will remember.` },
          { n: "08", title: "Mocktails, not water in a glass", body: `If any guests do not drink, design a mocktail menu with the same care as the cocktails. Bring it to the table at the same time. Present it at the bar with the same flourish. Sober guests should never feel like the afterthought of the bar.` },
          { n: "09", title: "A bathroom basket", body: `Hairspray, deodorant, hand cream, plasters, mints, paracetamol, hair ties, a small sewing kit, a stain pen, and a folded note that says "you are looked after." A five-minute decision that becomes a fifty-conversation talking point.` },
          { n: "10", title: "Time to actually be with people", body: `Build your timeline so you, the couple, have time to sit at every table. Not a fifteen-minute speed-round. A real lingering. Most weddings are designed for the couple to be photographed; few are designed for the couple to be present. Reverse that.` },
          { n: "11", title: "A farewell brunch", body: `The morning after is one of the most underrated moments of the celebration. Slow coffee. Last conversations. A chance to say goodbye properly. It is the bookend that turns a wedding day into a wedding weekend.` },
          { n: "12", title: "A thank-you note within four weeks", body: `A real, hand-written note to each guest. Mention something specific: their toast, their dancing, the story they told you on the bus. They will save the note in a drawer for a decade.` }
        ]
      },

      { type: "h", text: `Why this matters more than the dress` },
      { type: "pullquote", text: `How your guests feel will be remembered longer than how you looked.` },
      { type: "p", text: `I do not say this to diminish the dress, the suit, the styling, the photography. They are part of the love letter you are writing to the day. But fifteen years from now, when your people gather and someone says, "do you remember when we all went to New Zealand for the wedding?", the thing they will tell stories about is how it felt. How welcomed they were. Whether they had a chair when their feet were tired and something cold when they wanted it. That is the legacy of a wedding. Not the photos. The feeling.` },

      { type: "h", text: `A small confession before I close this` },
      { type: "p", text: `When I plan a Fantail wedding, the part of the work I quietly love most is not the bouquet or the vows or the cake or the venue. It is the chair-with-arms decision. It is the mocktail menu. It is the welcome note in the room. It is the moment when an aunt I have never met sees the small bottle of jasmine hand cream in the bathroom and thinks, just for a second, that someone here was paying attention.` },
      { type: "p", text: `Those are the moments I plan for. And those, in the end, are the most romantic decisions you will make on your wedding day. Not the ones aimed at each other. The ones aimed at the people you love who came a long way to be there.` },
      { type: "pullquote", text: `Your wedding guests will become the loudest storytellers of your day. Make sure the story they tell is one you want told.` },
      { type: "p", text: `If the idea of a guest-first celebration resonates, if you would rather invite fewer people and look after them deeply than invite more and feel scattered, we should probably talk. Tell me a little about the two of you and the kind of weekend you are imagining. I read every enquiry myself.` }
    ]
  },

  // ───────────────────────── Pillar 4: Trust & Knowledge ─────────────────────────
  {
    path: "/blog/before-booking-a-wedding-planner-nz/",
    slug: "before-booking-a-wedding-planner-nz",
    category: "Planning Guide",
    title: "What I Wish Every Couple Knew Before Booking a Wedding Planner in New Zealand",
    subtitle: "Quiet, honest expertise from a planner who has been doing this for fifteen years",
    date: "2026-06-03",
    dateDisplay: "June 2026",
    hero: "/assets/images/Service-04.jpg",
    excerpt:
      "Whether you actually need a planner, the four types you'll meet in New Zealand, the eight questions to ask before you book, and an honest take on pricing, from a planner of fifteen years.",
    blocks: [
      { type: "lede", text: `I am going to do something a little unusual in this post.` },
      { type: "p", text: `I am going to tell you everything I think you should know before you book a wedding planner in New Zealand, including how to tell if you should book me and how to tell if you should book someone else.` },
      { type: "p", text: `There is a lot of wedding industry advice out there that exists primarily to convert, to turn a casual reader into a paying client. I do not really work that way. I take a small handful of weddings each year, on purpose. The right couples find me. The wrong couples, lovely as they may be, find someone better suited to them. Both outcomes are good. So this post is genuinely for you, whether or not we ever speak.` },
      { type: "pullquote", text: `I would rather you find the right planner than just any planner. The right one is rarer than you think.` },

      { type: "h", text: `First: do you actually need a planner?` },
      { type: "p", text: `Not every wedding needs a full-service planner. If you are getting married within an hour of where you live, with under fifteen guests, in a venue that runs the day for you, you may genuinely not need one. A celebrant and a photographer might be the only suppliers you book. That is a perfectly beautiful kind of wedding.` },
      { type: "p", text: `If you are getting married in your home country with a guest list of 50 to 80, in a venue you are familiar with, with friends who can help, you might want a day-of coordinator rather than a full-service planner. There is a meaningful difference between the two.` },
      {
        type: "callout",
        label: "When you almost certainly need a full-service planner",
        text: `If you are planning a destination wedding from another country. If you have never been to the place where you are getting married. If you are bringing guests from multiple countries. If you have a guest count above 30 and want a multi-day weekend. If the planning is starting to bleed into your relationship. If anything about the legalities, weather, or logistics of a foreign country is making you anxious. Any of those on their own is reason enough. Two or more, and you are quietly suffering without one.`
      },

      { type: "h", text: `The four types of wedding planners you'll meet in New Zealand` },
      { type: "p", text: `When you start researching, the word "planner" will get used to mean four very different things. Knowing the difference will save you time.` },
      {
        type: "steps",
        steps: [
          { n: "01", title: "The day-of coordinator", body: `Steps in three weeks before the wedding. Takes your existing plans and runs the day. Useful for couples who want to do most of the planning themselves but need someone to manage the timeline on the day. Cost in NZ: typically NZD $1,500 to $3,000.` },
          { n: "02", title: "The partial planner", body: `Helps with specific elements, venue sourcing, vendor recommendations, and design, then steps back. You still run most of the planning yourself. Cost in NZ: typically NZD $4,000 to $8,000, depending on scope.` },
          { n: "03", title: "The full-service planner", body: `Manages every element, from your first conversation to the morning after. Vendor curation, design, logistics, timeline, contingency, and on-the-day coordination. This is what most destination weddings need. Cost in NZ: typically NZD $8,000 to $25,000+, depending on scope.` },
          { n: "04", title: "The boutique planner", body: `A subset of full-service planners who take a deliberately small number of weddings each year. The work is more relational and design-led. The investment is similar to or slightly higher than full-service. The experience is meaningfully different.` }
        ]
      },
      { type: "p", text: `Fantail Weddings is a boutique planner. I take a small handful of weddings each year, work in first person (no team account, no funnel), and lean heavily on voice notes, Loom videos, and personal calls. The trade-off is that I am not the right fit for every couple. If you want a large team or a faster-moving model, there are wonderful full-service planners in NZ who will serve you better.` },

      { type: "h", text: `Eight questions to ask any planner before you book` },
      { type: "p", text: `When you have a shortlist of two or three planners, these questions will tell you a great deal about how the planner actually works, not how their website looks.` },
      {
        type: "steps",
        steps: [
          { n: "01", title: "How many weddings do you take on each year?", body: `There is no right answer, but it should be specific and match the level of attention you want. Some excellent planners take 25 a year with a small team. Some boutique planners take 4 to 6. Both are valid. Make sure the answer matches what you want.` },
          { n: "02", title: "Who actually does the planning?", body: `Some planners brand around their name but pass the day-to-day to junior team members. That can be fine, but you should know in advance. Ask who will write your emails, attend your final walkthrough, and be on the ground on the day.` },
          { n: "03", title: "How long have you worked with your recommended vendors?", body: `The best wedding days are built on relationships, not lists. Look for answers measured in years and named relationships, not a generic "I have lots of contacts."` },
          { n: "04", title: "What happens if a vendor falls through close to the wedding?", body: `A real-world question that reveals everything. The planner with strong relationships can pick up the phone and have someone in place within hours. The planner without that network will be scrambling, and passing the stress quietly to you.` },
          { n: "05", title: "What is your communication style during the planning months?", body: `Some are email-only. Some lean into voice notes and calls. Some run everything through a portal. None is wrong, but the style matters, especially if you are planning from another country. Make sure their rhythm matches yours.` },
          { n: "06", title: "What's included, and what is extra?", body: `Read the proposal carefully and ask explicitly what is not included. Common gotchas: vendor travel days, accommodation for travelling vendors, on-the-day assistant fees, post-wedding wrap-up. A good planner is transparent without you having to dig.` },
          { n: "07", title: "How do you handle wet weather and contingency?", body: `If they say "we just hope for the best," walk away. The right answer involves a documented wet weather plan, a wind plan, named alternative spaces, and clear decision-making windows. New Zealand weather is part of the design brief, not a footnote.` },
          { n: "08", title: "Can I speak to one of your past couples?", body: `Any planner with happy clients should be willing to share details for a brief reference call. Listen to what those couples say, but also to how they say it. Reference calls reveal a lot in the texture of the conversation.` }
        ]
      },

      { type: "h", text: `Six things specific to planning a wedding in New Zealand` },
      {
        type: "steps",
        steps: [
          { n: "01", title: "The marriage licence", body: `Overseas couples need a marriage licence (NZD $150). Apply at least 3 working days before the ceremony; it is valid for 3 months and tied to the locations you list, including your wet-weather backup. Your celebrant cannot legally marry you without it. A planner who doesn't walk you through this in detail early is a yellow flag.` },
          { n: "02", title: "The seasons", body: `New Zealand's seasons are inverted from the Northern Hemisphere. The sweet spot for South Island weddings is mid-February through April. October and November are also lovely. December and January are domestic peak seasons, expect crowds and higher prices.` },
          { n: "03", title: "The travel day reality", body: `Your guests are flying long distances and many will arrive jet-lagged. Build at least one full rest day between their arrival and the wedding. Do not schedule the welcome dinner for the evening they land.` },
          { n: "04", title: "The transport gap", body: `In Central Otago, public transport between venues is essentially non-existent and taxi coverage is patchy outside Queenstown and Wanaka. If your venue is rural (and most of the beautiful ones are), transport is something the wedding has to provide.` },
          { n: "05", title: "Vendor travel costs", body: `If your wedding is in a rural region, your vendors will be travelling to you. That can mean travel days, accommodation, freight, and a different cost structure than an urban wedding. A good planner is transparent about this from the first proposal.` },
          { n: "06", title: "The two-time-zone problem", body: `If you are in the United States or Europe, you are 11 to 18 hours behind New Zealand. This is not a barrier; a local planner can work for you while you sleep. But your communication rhythm needs designing. Voice notes, Looms, and scheduled calls work far better than email ping-pong.` }
        ]
      },

      { type: "h", text: `What I wish more couples knew about pricing` },
      {
        type: "steps",
        steps: [
          { title: "The cheapest planner is rarely the right answer", body: `The cost of a full-service planner is usually 10 to 15% of the total wedding budget. If a planner is significantly cheaper than that, there is something to ask about: either their experience is limited, their vendor network is thin, or they are overworked.` },
          { title: "The most expensive planner is rarely the answer either", body: `Pay for the right fit, not the highest price. Some boutique planners are deliberately less expensive than the big names because they take fewer weddings and have lower overheads. The investment should reflect the experience you are getting.` },
          { title: "Ask about the all-in cost early", body: `Vendor pricing in New Zealand for an intimate wedding (30 to 60 guests) typically falls between NZD $60,000 and $190,000 all-in, including the planner. Elopements are wildly different: some are NZD $5,000 all-in, others NZD $20,000. There is no one number, but your planner should give you an indicative range early.` }
        ]
      },

      { type: "h", text: `How to know if Fantail Weddings is the right fit` },
      {
        type: "columns",
        columns: [
          {
            title: "I am probably the right fit if…",
            items: [
              `You want a small, considered, deeply personal celebration.`,
              `You are drawn to the South Island.`,
              `You like voice notes and slow Sunday emails more than rapid-fire spreadsheets.`,
              `You want your guests to feel held.`,
              `You want the planning months to feel as good as the day.`,
              `You want a single planner who knows your story by name, and a real first conversation before you commit.`
            ]
          },
          {
            title: "I am probably not the right fit if…",
            items: [
              `You are planning a 200-person wedding; my work is built for under 60 guests.`,
              `You want a faster-moving, more transactional planning model.`,
              `You are looking for the cheapest option.`,
              `You want a team rather than a single planner.`
            ]
          }
        ]
      },
      { type: "pullquote", text: `If you have read this far, you already know more than 90% of couples ever do about how to choose well.` },
      { type: "p", text: `If you would like a quiet conversation about your wedding, whether in Aotearoa or elsewhere, I am always happy to be a sounding board, even if you end up booking someone else. The couples who fit Fantail Weddings tend to know within the first few minutes of a call. Either is a good outcome.` }
    ]
  }
];
