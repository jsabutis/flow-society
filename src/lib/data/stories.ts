export type Story = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  /** Optional link to a bookable Flow Society experience from this story */
  relatedTourSlug?: string;
  body: string[];
};

export const STORIES: Story[] = [
  {
    slug: "bosque-la-primavera-caldera",
    title: "Riding inside an active caldera, 30 minutes from downtown",
    kicker: "Trail beta",
    excerpt:
      "Bosque La Primavera is a 30,500-hectare protected forest sitting inside a 95,000-year-old volcanic caldera. It is also Guadalajara&rsquo;s lungs &mdash; and the home trail for every Flow Society ride.",
    author: "Pau Lozano",
    date: "2026-04-08",
    readMinutes: 7,
    relatedTourSlug: "primavera-ebike-brunch-intermedio",
    body: [
      "If you draw a 30-minute drive radius around downtown Guadalajara, the western edge bumps into Bosque La Primavera \u2014 a 30,500-hectare pine-oak forest that, a hundred thousand years ago, was a caldera-forming eruption big enough to leave its scar across the entire valley. The forest grew back inside the caldera. We ride inside that forest. The geology is what makes the riding what it is.",
      "The eruption that formed the caldera happened about 95,000 years ago, in a single explosive event that ejected an estimated 40 km\u00b3 of rhyolite \u2014 pale, silica-rich volcanic rock. The magma chamber underneath collapsed and formed the depression that\u2019s now the forest. Hot springs along the southern edge (R\u00edo Caliente, Cerro Las Planillas) are evidence that magma is still cooling down there. You can soak in 38 \u00b0C water that bubbles straight out of the ground after a long ride.",
      "Rhyolite weathers slowly into a sandy, well-drained soil that holds the pine-oak forest in place. The trail surface is somewhere between hardpack and loose-over-hard, depending on how recently it rained. Roots are rare, rocks are loose-but-grippy, and the gradient is friendly \u2014 nothing inside the forest is steeper than about 18 percent, which is forgiving for a beginner and still entertaining for a strong rider.",
      "There are roughly 60 km of singletrack inside the protected area, plus another 40 km of forest road that connects everything. None of it is officially mapped by the park; the trails are maintained informally by local riding clubs. A few of the lines we ride were originally cut by ranchers moving cattle and have been here longer than the official park designation, which dates to 1980. Part of every Flow Society booking goes back into trail care.",
      "The forest is also Guadalajara\u2019s air conditioning. The metro area sits in a closed valley at 1,560 m and traps its own pollution; the forest sits 200 m higher, just upwind, and pumps cool oxygenated air into the city every afternoon. Lose the forest and you lose the city\u2019s lungs. This is not a metaphor \u2014 it is how the local hydrologists describe it.",
      "Wildfire is the constant threat. The 2005 fire took 13,000 hectares; the 2012 fire took another 8,000. Most fires are human-caused (a dropped cigarette, an uncontrolled cooking fire) and some are arson tied to land speculation. The forest grows back, slowly. As riders we are sensitive guests \u2014 no smoking, no fires, pack out everything, and report anything that looks wrong to the park rangers who patrol the perimeter.",
      "The smell after a rain is the thing nobody can describe and everybody remembers. Wet pine, hot stone, ocote resin, a little bit of sulfur from the hot springs in the distance. The forest will outlast us all. We are very lucky to ride here.",
    ],
  },
  {
    slug: "best-time-to-ride-la-primavera",
    title: "When to ride La Primavera \u2014 a month-by-month guide",
    kicker: "Trail beta",
    excerpt:
      "October through May is the high season for a reason. Here is what each month actually feels like in the bosque \u2014 the dust, the light, and the lounge weather.",
    author: "Diego Robles",
    date: "2026-03-12",
    readMinutes: 6,
    body: [
      "La Primavera has two seasons that matter for mountain biking: dry and wet. The rains arrive on a schedule you can almost set a watch by \u2014 first thunderclaps in the second week of June, last storms in the first week of October. Everything outside those four months is open trail.",
      "October is the reset. The rains have just finished, the trails are still damp, and for about three weeks the loam in La Primavera is as good as anything in Vermont in September. Hero dirt. The light is long and slanted, the agave fields beyond the bosque are deep green, and the temperature in the forest hovers around 20 \u00b0C all afternoon. Brunch outdoors is the move.",
      "November and December are arguably the best months of the year. Daytime highs hover around 22 \u00b0C, evenings drop to 8 \u00b0C, and the trails run a deep, fast dust that has just enough body to grip when you lean a bike on edge. The light gets golden by 4 p.m. The lounge stays on the porch.",
      "January and February bring the coldest mornings of the year. By 10 a.m. the frost is gone. Bring a long-sleeve jersey and a packable shell for the descents \u2014 we loan hand warmers on the early rides. The reward is the sky: zero humidity, visibility for 80 km on a clear day.",
      "March is the in-between month. Days lengthen, the agave in the surrounding fields starts to flower, and the lower flanks of the bosque paint themselves in vertical stripes of yellow as the agave azul throws up its quiote. Wind picks up in the afternoons \u2014 we plan rides that finish before the gusts settle in.",
      "April and May are our personal favorites. Long days, warm afternoons, mango season at the roadside stands, jacaranda trees in bloom in every plaza, and the trails are at their fastest. We shift the schedule earlier: rolling at 7 a.m., off the bikes by 10, brunch in the shade.",
      "June is when the brunch rides go shorter and we stop running the camping experience. The first storms of the year are usually short, intense, and predictable \u2014 they roll in around 4 p.m. and clear by 6. If you are in town in June, the riding is honestly excellent and the prices reflect the season.",
      "July, August, and September are wet season proper. We pause the membership rides and most of the public calendar. The light, on the other hand, is otherworldly \u2014 and the agave fields under storm clouds are the photograph everyone takes. If you can only book once, come the second week of November. If you have to come in summer, come the second week of October.",
    ],
  },
  {
    slug: "after-ride-lounge",
    title: "The After Ride Lounge is half the experience (on purpose)",
    kicker: "Comunidad",
    excerpt:
      "Why every Flow Society ride ends with brunch, music, and an unhurried agreement that nobody has anywhere else to be.",
    author: "Mariana Estrada",
    date: "2026-02-22",
    readMinutes: 5,
    body: [
      "When we sketched out what Flow Society would look like, the brunch and the lounge weren\u2019t add-ons. They were the point. The ride is two hours. The After Ride Lounge can be three. We learned early that the conversations that happen after the ride are what people remember a month later \u2014 not the bermed corner on Calle 8.",
      "Logistically the lounge is simple: shaded tables, cold drinks, music, a hot brunch service, and the rule that nobody is in a hurry to leave. Some lounges are at the trailhead, some at a partner location ten minutes from the bosque, and during the camping experience the lounge becomes a fire under the pines.",
      "Culturally the lounge does three things. First, it lets riders meet the rest of the group properly \u2014 something that rarely happens during the actual ride, where everyone is focused on the trail. Second, it gives the guides time to do trail-tip debriefs without tacking them on to the start of the next ride. Third, it builds the comunidad. People who meet each other in the lounge often end up booking the next ride together. Members ride with the same crew month after month because they actually know each other now.",
      "The brunch is local, by design. We work with two cocineras in Zapopan whose food shapes what each ride day feels like as much as the route does. Chilaquiles, huevos divorciados, pan dulce, fruit, juice, mezcal coffee in cooler weather, beer when it warms up. We post a small menu the day before each ride so people with allergies can plan.",
      "If you have done other guided rides where the experience ended at the trailhead, the Flow Society lounge is going to feel different. Plan for it. Block out the afternoon. Bring a book if you want, or do not \u2014 the conversation tends to fill the time on its own.",
    ],
  },
  {
    slug: "ebike-couples-hybrid",
    title: "Riding with a partner who is at a different level: the hybrid format",
    kicker: "Format",
    excerpt:
      "One person on an analog MTB, one on an e-bike, same group, same brunch. Why this format works better than splitting groups by level.",
    author: "Pau Lozano",
    date: "2026-01-30",
    readMinutes: 6,
    relatedTourSlug: "brunch-lounge-pareja-hibrida",
    body: [
      "About a third of the inquiries we get start the same way: \u201cmy partner and I both want to ride, but we are at very different levels.\u201d The traditional answer is to split groups by ability, which means the couple does not actually share the experience. Our answer is the pareja h\u00edbrida format \u2014 one analog mountain bike, one e-bike, same route, ritmo balanceado.",
      "Mechanically it works because the e-bike closes the gap that fitness usually opens. The fitter rider on the muscular MTB sets the natural pace; the partner on the e-bike is doing real work, on real terrain, but the assist absorbs the difference in conditioning. Neither is sandbagging. Neither is suffering.",
      "Socially it works because the conversation actually happens. On a level-split ride, couples ride apart for two hours and then meet at brunch. On the hybrid format, they ride together \u2014 stop for the same photos, navigate the same lines, react to the same moments. The lounge that follows is more about the day they just shared than about catching each other up.",
      "There are two limits worth flagging. The first is technical: the e-bike is heavier on tight switchbacks, so when the route gets rocky the analog rider is usually the more confident one. We use this on purpose \u2014 the analog rider becomes the de facto line-picker, which is a satisfying role for them. The second is fitness: the assist closes the cardio gap but not the bike-handling gap. If one rider has never ridden a mountain bike at all, we still recommend the beginner brunch ride first.",
      "We cap the pareja h\u00edbrida at three couples per session. Not because the route requires it, but because the lounge does \u2014 six people fit at one table and the conversation stays one conversation. If you want a private booking for two couples or a small friend group, message us; we run private versions year-round.",
    ],
  },
  {
    slug: "what-the-membership-actually-buys",
    title: "What the membership actually buys (an honest breakdown)",
    kicker: "Membership",
    excerpt:
      "One master class plus three rides per month, priority access, and discounts \u2014 but the real value is the comunidad you ride with every month.",
    author: "Diego Robles",
    date: "2025-12-18",
    readMinutes: 6,
    relatedTourSlug: "membresia-flow-society",
    body: [
      "The published membership benefits are simple: one master class per month (technique, lines, light maintenance, or terrain reading) plus three rides per month from the public calendar. Members also get priority access to event dates and discounts on private bookings and the camping experience.",
      "On paper that is the deal. In practice the value compounds in two ways the headline does not capture.",
      "First: the comunidad. Members ride with the same crew month after month, which means the group dynamics get stronger over time. Trail tips during a ride land differently when the guide already knows your strengths and weaknesses. Conversations in the lounge pick up where they left off last month. New members find that within two cycles they have a riding crew, not just a service.",
      "Second: priority access. The public calendar fills up faster than we let on \u2014 some Saturdays sell out in three days. Members see those dates a week before the public, which is the difference between a casual booking habit and a reliable monthly ride. For someone trying to make mountain biking a real part of their month rather than an occasional treat, that priority is the most underrated benefit.",
      "What the membership is not: it is not a discount funnel. The math works out close to even with the public price for someone who would have booked three rides anyway. Members come for the rhythm and the comunidad, not for the savings.",
      "Logistical notes. The membership is monthly, no minimum term. Unused rides do not roll over \u2014 we keep it intentionally simple. Bring your own e-bike or rent one of ours per ride; the membership covers the experience, not the rental.",
      "If you are in Guadalajara more than once a month and want to stop one-off booking, talk to us on WhatsApp. We can answer questions about the master class topics for the next quarter and reserve your first month before the public calendar opens.",
    ],
  },
  {
    slug: "reading-jalisco-sky",
    title: "How to read a Jalisco afternoon thunderstorm",
    kicker: "Safety",
    excerpt:
      "From late May through September, the afternoon storms come on a schedule. Knowing how to read the sky is the difference between a great ride and being on a ridge in lightning.",
    author: "Diego Robles",
    date: "2025-11-04",
    readMinutes: 6,
    body: [
      "From late May through early October, the central Mexican plateau runs on a daily convective cycle. The mornings are clear. The first cumulus clouds build by late morning. By 1 or 2 p.m. they have stacked into towering cumulonimbus. By 3 p.m. it is raining. By 6 p.m. it is clear again. This rhythm is so reliable you can plan your day around it. It also means that, on the wrong day, being on a ridge at 3 p.m. is genuinely dangerous.",
      "Three things to watch for. First: the rate at which clouds are building. If the cumulus that started as fluffy white puffs at 11 a.m. has grown into something with a defined cauliflower top by 12:30, you have maybe an hour before they go vertical. If it is still flat-bottomed and white at 1 p.m., you have more time. The rate of vertical growth is your most important signal.",
      "Second: the anvil. Mature thunderstorms develop a flat, spreading top called an anvil \u2014 that is the cloud hitting the tropopause and spreading sideways because it cannot go up anymore. An anvil overhead means an active storm cell directly above you. An anvil on the horizon means a storm 20\u201340 km away.",
      "Third: lightning math. When you see a flash, count the seconds until you hear the thunder, then divide by three. That is the distance to the strike in kilometres. Strikes within 8 km mean the next strike could be on you. Strikes within 5 km mean stop riding immediately, get off the ridge, and find low ground.",
      "Our scheduling rules: for any ride between June and September, all exposed terrain finishes by 1 p.m. By 3 p.m. we are either off the bike entirely or in a sheltered descent through the trees. We do not apologize for cutting rides short. The sky decides.",
      "If you do get caught: get off ridges and away from isolated trees. The traditional &lsquo;lightning crouch&rsquo; is no longer recommended \u2014 it does not help much. What does help: getting to lower terrain quickly, spreading the group out so a single strike cannot take everyone, and not standing under the tallest tree in the area.",
      "The flip side of the danger is the spectacle. A Jalisco thunderstorm at 4 p.m., viewed from the porch of the lounge in La Primavera, with the sun cutting under the storm and lighting the rain in sheets of gold against the dark sky \u2014 that is one of the great visual experiences of being alive. The storms are not the enemy. We just plan around them.",
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getStorySummaries(): Pick<
  Story,
  | "slug"
  | "title"
  | "kicker"
  | "excerpt"
  | "author"
  | "date"
  | "readMinutes"
  | "relatedTourSlug"
>[] {
  return STORIES.map((story) => {
    const { body, ...rest } = story;
    void body;
    return rest;
  });
}
