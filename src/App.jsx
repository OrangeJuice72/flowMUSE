import { useEffect, useMemo, useState } from "react";
import {
  Clipboard,
  Disc3,
  Layers3,
  MoonStar,
  RotateCcw,
  Shuffle,
  Sparkles,
  Undo2,
  WandSparkles,
} from "lucide-react";

const soundStyles = [
  "Warm acoustic",
  "Dark atmospheric",
  "Dreamy ambient",
  "Gritty rock",
  "Smooth R&B",
  "Glossy pop",
  "Lo-fi chill",
  "Cinematic orchestral",
  "Soulful vintage",
  "Heavy electronic",
  "Minimalist piano-led",
  "Big arena anthem",
  "Raw unplugged",
  "Moody synthwave",
  "Funk-driven",
  "Jazz-inspired",
  "Bluesy and worn",
  "Ethereal and floating",
  "Aggressive trap",
  "Melodic hip-hop",
  "Country rootsy",
  "Indie folk",
  "Punk energy",
  "Grunge textured",
  "Tropical and breezy",
  "Dance club-ready",
  "Gospel-inspired",
  "Experimental glitchy",
  "Industrial and metallic",
  "Psychedelic and swirling",
  "Romantic string-led",
  "Epic and heroic",
  "Intimate bedroom pop",
  "Retro 80s-inspired",
  "Retro 90s-inspired",
  "Neo-soul smooth",
  "Reggae laid-back",
  "Latin rhythmic",
  "Afrobeat-inspired",
  "Hyperpop chaotic",
  "Haunted and ghostly",
  "Uplifting and bright",
  "Sad and stripped-back",
  "Tense and suspenseful",
  "Playful and bouncy",
  "Spiritual and meditative",
  "Nocturnal and sleek",
  "Sun-soaked and open",
  "Melancholic and spacious",
  "Triumphant and explosive",
];

const genres = [
  "Pop",
  "Rock",
  "Hip-hop",
  "Rap",
  "R&B",
  "Soul",
  "Jazz",
  "Blues",
  "Country",
  "Folk",
  "Indie",
  "Alternative",
  "Electronic",
  "Dance",
  "House",
  "Techno",
  "Trance",
  "Dubstep",
  "Drum and bass",
  "Ambient",
  "Classical",
  "Opera",
  "Orchestral",
  "Gospel",
  "Christian",
  "Reggae",
  "Dancehall",
  "Ska",
  "Latin",
  "Salsa",
  "Reggaeton",
  "Afrobeat",
  "Funk",
  "Disco",
  "Punk",
  "Metal",
  "Hardcore",
  "Grunge",
  "Emo",
  "Bluegrass",
  "Trap",
  "Lo-fi",
  "K-pop",
  "J-pop",
  "World music",
  "Flamenco",
  "Zydeco",
  "Industrial",
  "New age",
  "Experimental",
];

const flavorGenres = [
  "Shoegaze",
  "Dreamwave",
  "Chillwave",
  "Vaporwave",
  "Synthwave",
  "Witch house",
  "Darkwave",
  "Coldwave",
  "New wave",
  "No wave",
  "Trip-hop",
  "Glitchcore",
  "Drift phonk",
  "Memphis phonk",
  "Sigilkore",
  "HexD",
  "Nightcore",
  "Slowcore",
  "Breakcore",
  "Speedcore",
  "Happy hardcore",
  "UK garage",
  "Future garage",
  "2-step",
  "Jersey club",
  "Footwork",
  "Juke",
  "Baile funk",
  "Moombahton",
  "Amapiano",
  "Kuduro",
  "Gqom",
  "Kwaito",
  "Dembow",
  "Bossa nova",
  "Samba-canção",
  "Corrido tumbado",
  "Ranchera",
  "Norteño",
  "Cumbia sonidera",
  "Champeta",
  "Soca",
  "Calypso",
  "Chutney",
  "Highlife",
  "Fuji",
  "Juju",
  "Makossa",
  "Soukous",
  "Mbalax",
  "Rai",
  "Gnawa",
  "Qawwali",
  "Bhajan",
  "Ghazal",
  "Carnatic fusion",
  "Sufi devotional",
  "Dangdut",
  "Gamelan fusion",
  "Enka",
  "City pop revival",
  "Shibuya-kei",
  "Kayōkyoku",
  "Visual kei",
  "Bitpop",
  "Chiptune",
  "Dungeon synth",
  "Berlin school",
  "Kosmische",
  "Minimal wave",
  "Wonky",
  "Wonky technoid",
  "IDM",
  "Illbient",
  "Plunderphonics",
  "Lowercase",
  "Microsound",
  "Electroacoustic",
  "Musique concrète",
  "Space music",
  "Drone",
  "Noise",
  "Harsh noise wall",
  "Power noise",
  "Martial industrial",
  "Neofolk darkwave",
  "Ethereal wave",
  "Heavenly voices",
  "Dark cabaret",
  "Neo-psychedelia",
  "Skweee",
  "Future bass",
  "Liquid funk",
  "Neurofunk",
  "Jumpstyle",
  "Hardstyle",
  "Gabber",
  "Makina",
  "Schlager",
  "Yacht rock revival",
];

const vocalEffects = [
  "Reverb",
  "Delay",
  "Echo",
  "Chorus",
  "Flanger",
  "Phaser",
  "Distortion",
  "Saturation",
  "Overdrive",
  "Compression",
  "Limiting",
  "De-essing",
  "EQ boost",
  "EQ cut",
  "High-pass filtering",
  "Low-pass filtering",
  "Auto-tune",
  "Pitch correction",
  "Harmonizer",
  "Vocoder",
  "Talkbox effect",
  "Doubling",
  "Stereo widening",
  "Slapback delay",
  "Ping-pong delay",
  "Reverse reverb",
  "Reverse delay",
  "Telephone effect",
  "Radio effect",
  "Megaphone effect",
  "Whisper layer",
  "Octave up",
  "Octave down",
  "Formant shifting",
  "Pitch shifting",
  "Bitcrushing",
  "Glitch effect",
  "Stutter edit",
  "Tremolo",
  "Ring modulation",
  "Gating",
  "Sidechain pumping",
  "Ducking delay",
  "Lo-fi filtering",
  "Tape wobble",
  "Tape saturation",
  "Vinyl texture",
  "Breath enhancement",
  "Ad-lib stacking",
  "Vocal chop effect",
];

const leads = [
  "Electric guitar",
  "Acoustic guitar",
  "Classical guitar",
  "Lead synth",
  "Analog synth lead",
  "Digital synth lead",
  "Piano",
  "Grand piano",
  "Upright piano",
  "Electric piano",
  "Rhodes",
  "Wurlitzer",
  "Organ",
  "Hammond organ",
  "Clavinet",
  "Harpsichord",
  "Violin",
  "Fiddle",
  "Viola",
  "Cello",
  "Trumpet",
  "Flugelhorn",
  "Trombone",
  "Saxophone",
  "Alto sax",
  "Tenor sax",
  "Clarinet",
  "Bass clarinet",
  "Flute",
  "Piccolo",
  "Oboe",
  "English horn",
  "Bassoon",
  "Harmonica",
  "Accordion",
  "Bandoneon",
  "Melodica",
  "Banjo",
  "Mandolin",
  "Sitar",
  "Sarod",
  "Shamisen",
  "Koto",
  "Erhu",
  "Duduk",
  "Pan flute",
  "Kalimba",
  "Music box",
  "Theremin",
  "Bell lead",
];

const chords = [
  "Acoustic guitar",
  "Electric guitar",
  "Nylon-string guitar",
  "Twelve-string guitar",
  "Piano",
  "Grand piano",
  "Upright piano",
  "Electric piano",
  "Rhodes",
  "Wurlitzer",
  "Organ",
  "Hammond organ",
  "Church organ",
  "Accordion",
  "Harmonium",
  "Clavinet",
  "Harpsichord",
  "Synth pad",
  "Warm pad",
  "Ambient pad",
  "Poly synth",
  "Analog poly synth",
  "Digital poly synth",
  "String ensemble",
  "Chamber strings",
  "Full strings",
  "Brass ensemble",
  "Woodwind ensemble",
  "Choir ahhs",
  "Choir oohs",
  "Vocal pad",
  "Ukulele",
  "Banjo",
  "Mandolin",
  "Dulcimer",
  "Autoharp",
  "Zither",
  "Harp",
  "Vibraphone",
  "Marimba",
  "Celesta",
  "Glockenspiel",
  "Music box",
  "Koto",
  "Santur",
  "Cimbalom",
  "Steel drum",
  "Mellotron strings",
  "Mellotron choir",
  "Jazz guitar comping",
];

const basses = [
  "Electric bass",
  "Fingerstyle bass",
  "Pick bass",
  "Fretless bass",
  "Upright bass",
  "Acoustic bass guitar",
  "Synth bass",
  "Analog synth bass",
  "Sub bass",
  "Reese bass",
  "Moog bass",
  "FM bass",
  "Acid bass",
  "Slap bass",
  "Muted bass",
  "Eight-string bass",
  "Baritone guitar",
  "Bass VI",
  "Tuba",
  "Sousaphone",
  "Bass trombone",
  "Contrabassoon",
  "Bass clarinet",
  "Cello low register",
  "Contrabass",
  "Bass synth pluck",
  "808 bass",
  "Distorted bass",
  "Growl bass",
  "Wobble bass",
  "Plucked upright bass",
  "Bowed upright bass",
  "Organ bass pedals",
  "Left-hand piano bass",
  "Low tom bass pulse",
  "Didgeridoo",
  "Bassoon low register",
  "Serpent",
  "Ophicleide",
  "Low brass ensemble",
  "Chapman Stick",
  "Kalimba bass",
  "Marimba low register",
  "Acoustic sub kick bass",
  "Drone bass synth",
  "Square wave bass",
  "Saw bass",
  "Rubber bass synth",
  "Low cello ensemble",
  "Deep sampled bass",
];

const miscInstrumentals = [
  "Drum kit",
  "Snare drum",
  "Kick drum",
  "Hi-hats",
  "Toms",
  "Crash cymbal",
  "Ride cymbal",
  "Tambourine",
  "Shaker",
  "Cowbell",
  "Congas",
  "Bongos",
  "Timbales",
  "Cajón",
  "Djembe",
  "Tabla",
  "Darbuka",
  "Udu",
  "Taiko drum",
  "Steel tongue drum",
  "Triangle",
  "Castanets",
  "Claves",
  "Woodblock",
  "Guiro",
  "Cabasa",
  "Vibraslap",
  "Rainstick",
  "Wind chimes",
  "Sleigh bells",
  "Hand claps",
  "Finger snaps",
  "Whistle",
  "Human breath sounds",
  "Crowd chants",
  "Found percussion",
  "Foley hits",
  "Reverse cymbal",
  "Riser FX",
  "Impact hit",
  "Vinyl crackle",
  "Tape hiss",
  "Nature ambience",
  "Thunder sound",
  "Ocean waves",
  "Birdsong",
  "Clock ticks",
  "Glass hits",
  "Mechanical noises",
  "Field recordings",
];

const emotions = [
  "Joy",
  "Sadness",
  "Anger",
  "Fear",
  "Love",
  "Longing",
  "Regret",
  "Hope",
  "Despair",
  "Jealousy",
  "Guilt",
  "Shame",
  "Pride",
  "Gratitude",
  "Loneliness",
  "Peace",
  "Anxiety",
  "Passion",
  "Bitterness",
  "Relief",
  "Confusion",
  "Wonder",
  "Nostalgia",
  "Heartbreak",
  "Desire",
  "Tenderness",
  "Frustration",
  "Courage",
  "Vulnerability",
  "Euphoria",
  "Grief",
  "Insecurity",
  "Trust",
  "Betrayal",
  "Determination",
  "Resentment",
  "Awe",
  "Melancholy",
  "Contentment",
  "Panic",
  "Excitement",
  "Helplessness",
  "Compassion",
  "Envy",
  "Devotion",
  "Hopelessness",
  "Empowerment",
  "Isolation",
  "Curiosity",
  "Serenity",
];

const vocalTypes = [
  "Male lead",
  "Female lead",
  "Child voice",
  "Deep bass voice",
  "Baritone voice",
  "Tenor voice",
  "Alto voice",
  "Mezzo-soprano voice",
  "Soprano voice",
  "Mixed duet voice",
];

const literaryDevices = [
  "Metaphor",
  "Simile",
  "Double entendre",
  "Pun",
  "Symbolism",
  "Imagery",
  "Personification",
  "Hyperbole",
  "Irony",
  "Oxymoron",
  "Paradox",
  "Alliteration",
  "Assonance",
  "Consonance",
  "Repetition",
  "Anaphora",
  "Epistrophe",
  "Onomatopoeia",
  "Rhyme",
  "Internal rhyme",
  "Slant rhyme",
  "End rhyme",
  "Foreshadowing",
  "Juxtaposition",
  "Contrast",
  "Allegory",
  "Allusion",
  "Euphemism",
  "Understatement",
  "Idiom",
  "Colloquialism",
  "Apostrophe",
  "Synecdoche",
  "Metonymy",
  "Antithesis",
  "Chiasmus",
  "Anastrophe",
  "Enjambment",
  "Caesura",
  "Refrain",
  "Motif",
  "Satire",
  "Sarcasm",
  "Tone shift",
  "Mood setting",
  "Ambiguity",
  "Innuendo",
  "Euphonious diction",
  "Cacophonous diction",
  "Parallelism",
];

const rhymePatterns = [
  "AA",
  "AB",
  "AAA",
  "AABB",
  "ABAB",
  "ABBA",
  "ABCB",
  "XAXA",
  "AXAX",
  "AABA",
  "AAAA",
  "AABC",
  "ABAC",
  "ABCA",
  "ABCC",
  "ABBC",
  "ABCA",
  "ABCD",
  "AABCCB",
  "ABABCC",
  "AABBA",
  "ABABB",
  "ABBAB",
  "ABABA",
  "ABBAAB",
  "AABAAB",
  "AAAB",
  "ABBB",
  "BBAA",
  "BAAB",
  "BABA",
  "BABA CC",
  "ABAB DD",
  "AAXA",
  "XAAX",
  "XBXB",
  "ABXB",
  "AXBB",
  "AXXA",
  "AXXX",
  "XXXX",
  "AAAX",
  "XAAA",
  "AXXB",
  "ABXX",
  "XXAB",
  "ABAACC",
  "AABBCC",
  "ABABAB",
  "AAABBB",
];

const allusions = [
  "Movie reference",
  "Film scene reference",
  "Movie title reference",
  "Movie genre reference",
  "TV show reference",
  "TV episode reference",
  "TV character reference",
  "Cartoon reference",
  "Cartoon character reference",
  "Anime reference",
  "Anime character reference",
  "Comic reference",
  "Comic character reference",
  "Superhero reference",
  "Villain reference",
  "Sidekick reference",
  "Princess reference",
  "Prince reference",
  "Fairy tale reference",
  "Storybook reference",
  "Nursery rhyme reference",
  "Mythology reference",
  "Greek myth reference",
  "Roman myth reference",
  "Norse myth reference",
  "Folklore reference",
  "Legend reference",
  "Monster reference",
  "Creature reference",
  "Fantasy world reference",
  "Magic reference",
  "Spell reference",
  "Wizard reference",
  "Witch reference",
  "Dragon reference",
  "Angel reference",
  "Demon reference",
  "Heaven reference",
  "Hell reference",
  "Religious reference",
  "Bible reference",
  "Saint reference",
  "God reference",
  "Devil reference",
  "Prayer reference",
  "Sin reference",
  "Heaven-and-hell reference",
  "Historical figure reference",
  "Royalty reference",
  "King reference",
  "Queen reference",
  "Warrior reference",
  "Soldier reference",
  "Hero reference",
  "Tragic hero reference",
  "Political figure reference",
  "Revolution reference",
  "War reference",
  "Empire reference",
  "Ancient civilization reference",
  "Celebrity reference",
  "Actor reference",
  "Actress reference",
  "Model reference",
  "Fashion icon reference",
  "Socialite reference",
  "Athlete reference",
  "Sports legend reference",
  "Champion reference",
  "Pop culture reference",
  "Internet culture reference",
  "Meme reference",
  "Viral trend reference",
  "App reference",
  "Social media reference",
  "Texting reference",
  "Technology reference",
  "Robot reference",
  "AI reference",
  "Futuristic reference",
  "Dystopian reference",
  "Space reference",
  "Planet reference",
  "Star reference",
  "Moon reference",
  "Sun reference",
  "Galaxy reference",
  "Alien reference",
  "UFO reference",
  "Conspiracy reference",
  "City reference",
  "Small-town reference",
  "Big-city reference",
  "Country reference",
  "State reference",
  "Landmark reference",
  "Famous street reference",
  "Beach reference",
  "Desert reference",
  "Mountain reference",
  "Ocean reference",
  "Forest reference",
  "Garden reference",
  "Paradise reference",
  "Lost world reference",
  "Dream world reference",
  "Wonderland-type reference",
  "Kingdom reference",
  "Castle reference",
  "Palace reference",
  "School reference",
  "High school reference",
  "College reference",
  "Playground reference",
  "Childhood reference",
  "Toy reference",
  "Doll reference",
  "Game reference",
  "Video game reference",
  "Arcade reference",
  "Board game reference",
  "Card game reference",
  "Book reference",
  "Novel reference",
  "Poem reference",
  "Poet reference",
  "Author reference",
  "Love story reference",
  "Tragedy reference",
  "Comedy reference",
  "Horror reference",
  "Mystery reference",
  "Thriller reference",
  "Action reference",
  "Adventure reference",
  "Sci-fi reference",
  "Romance reference",
  "Coming-of-age reference",
  "Detective reference",
  "Spy reference",
  "Crime reference",
  "Mafia reference",
  "Outlaw reference",
  "Bonnie-and-Clyde-type reference",
  "Forbidden-love reference",
  "Star-crossed-lovers reference",
  "Femme fatale reference",
  "Heartbreaker reference",
  "Dream girl reference",
  "Bad boy reference",
  "Good girl reference",
  "Antihero reference",
  "Chosen one reference",
  "Fallen angel reference",
  "Savior reference",
  "Betrayal reference",
  "Redemption reference",
  "Destiny reference",
  "Fate reference",
  "Karma reference",
  "Zodiac reference",
  "Astrology reference",
  "Tarot reference",
  "Fortune reference",
  "Prophecy reference",
  "Lucky charm reference",
  "Curse reference",
  "Haunted reference",
  "Ghost reference",
  "Afterlife reference",
  "Holiday reference",
  "Christmas reference",
  "Halloween reference",
  "Valentine’s reference",
  "New Year’s reference",
  "Summer reference",
  "Winter reference",
  "Spring reference",
  "Autumn reference",
  "Birthday reference",
  "Food reference",
  "Drink reference",
  "Candy reference",
  "Fast food reference",
  "Luxury brand reference",
  "Designer reference",
  "Car brand reference",
  "Motorcycle reference",
  "Money reference",
  "Rich-life reference",
  "Fame reference",
  "Fame-and-fall reference",
  "Runaway reference",
  "Road trip reference",
  "Route reference",
  "Party reference",
  "Nightlife reference",
  "Dream-chasing reference",
  "American-dream reference",
  "Paradise-lost reference",
];

const rows = [
  ["soundStyle", "Sound Style", soundStyles],
  ["genre", "Genre", genres],
  ["flavorGenre", "Flavor Genre", flavorGenres],
  ["vocalEffects", "Vocal Effects", vocalEffects],
  ["lead", "Lead", leads],
  ["chords", "Chords", chords],
  ["bass", "Bass", basses],
  ["misc", "Misc", miscInstrumentals],
  ["emotions", "Emotions", emotions],
  ["vocalType", "Vocals", vocalTypes],
];

const genreLinkedFields = ["flavorGenre", "vocalEffects", "lead", "chords", "bass", "misc", "emotions", "vocalType"];

const structureOptions = [
  "Intro",
  "Verse",
  "Chorus",
  "Pre-chorus",
  "Post-chorus",
  "Bridge",
  "Outro",
  "Refrain",
  "Hook",
  "Interlude",
  "Instrumental break",
  "Solo",
  "Breakdown",
  "Drop",
  "Build",
  "Instrumental Intro",
  "Intro verse",
  "Final chorus",
  "Half-chorus",
  "Tag",
  "Vamp",
  "Turnaround",
  "Rap verse",
  "Spoken word section",
  "Harmony section",
  "Chant section",
  "Call-and-response section",
  "Ambient section",
  "Groove section",
  "Percussion break",
  "Acoustic section",
  "Strip-down section",
  "Key change section",
  "Modulation section",
  "Climactic section",
  "Outro chorus",
  "Fade-out",
  "Stinger ending",
  "Pause or silence break",
  "Ad-lib section",
];

const themePool = [
  "Two people fall in love when they least expect it.",
  "Someone keeps loving a person who will never love them back.",
  "A relationship has to stay hidden from everyone else.",
  "Two lovers know their time together is almost over.",
  "Someone wants one last chance to make things right.",
  "A person misses their partner from far away.",
  "Love feels exciting, but it is slowly turning toxic.",
  "Two people keep finding their way back to each other.",
  "Someone falls for a person they should stay away from.",
  "A heartbroken person tries to survive the first night alone.",
  "Someone keeps replaying the moment they were left behind.",
  "A person discovers they were betrayed by someone they trusted.",
  "Jealousy ruins something beautiful before it can grow.",
  "Someone learns how to forgive without forgetting the pain.",
  "Love returns after years of silence and distance.",
  "A person cannot stop thinking about someone they lost.",
  "Someone searches for closure they may never receive.",
  "A person feels empty after giving too much of themselves away.",
  "Healing begins after a painful breakup.",
  "Someone slowly learns how to love themselves again.",
  "Two best friends drift apart without meaning to.",
  "A friendship survives years of change and distance.",
  "Someone remembers the freedom of childhood summers.",
  "Family members love each other but do not know how to show it.",
  "A mother’s love remains strong through every storm.",
  "Someone grows up longing for a father who was never there.",
  "Brothers and sisters protect each other in a broken home.",
  "A family reunion brings old wounds back to the surface.",
  "Someone returns home and finds everything has changed.",
  "A person tries to protect someone they love from heartbreak.",
  "Someone struggles to figure out who they really are.",
  "A person reinvents themselves after hitting rock bottom.",
  "Confidence grows in someone who used to hide in the dark.",
  "A person feels invisible in a room full of people.",
  "Someone gets tired of pretending to be okay.",
  "A person hides their true self to avoid being judged.",
  "Breaking free feels terrifying but necessary.",
  "Someone is at war with the person in the mirror.",
  "A person grows stronger after every scar they carry.",
  "Someone finally chooses themselves over everyone else.",
  "Hope keeps a person alive during their darkest days.",
  "Despair makes everything feel heavy and colorless.",
  "Loneliness follows someone even in crowded places.",
  "Joy returns after a long season of pain.",
  "Anger burns through someone who has been pushed too far.",
  "Regret keeps someone awake deep into the night.",
  "Guilt follows a person long after the damage is done.",
  "Fear stops someone from chasing what they truly want.",
  "Peace arrives when someone stops fighting what they cannot change.",
  "Overthinking turns a simple feeling into chaos.",
  "Anxiety makes the world feel too loud and too fast.",
  "Depression makes it hard for someone to recognize themselves.",
  "A person fights every day to keep going.",
  "Someone learns to speak kindly to their own mind.",
  "Addiction steals pieces of a person little by little.",
  "Recovery feels messy, slow, and worth it.",
  "Burnout leaves someone exhausted by the life they built.",
  "Sleepless nights become a prison of memory and noise.",
  "Someone has an emotional breakdown they can no longer hide.",
  "A person finds a reason to stay when they almost gave up.",
  "Someone chases a dream no one else believes in.",
  "Failure crushes a person before teaching them how to rise.",
  "Success feels emptier than someone imagined it would.",
  "Ambition pushes a person to dangerous extremes.",
  "Sacrifice becomes the price of building a future.",
  "Someone refuses to quit no matter how many times they fall.",
  "Starting over feels both painful and beautiful.",
  "Taking a risk changes everything in one moment.",
  "A person works hard just to prove the doubters wrong.",
  "Someone gives everything for the life they always wanted.",
  "A person runs away hoping distance will heal them.",
  "Coming home feels stranger than leaving ever did.",
  "Nostalgia makes the past look softer than it really was.",
  "Small-town life feels safe and suffocating at the same time.",
  "Big-city lights hide a deep kind of loneliness.",
  "A road trip becomes a journey of self-discovery.",
  "Someone dreams of a life beyond the horizon.",
  "Feeling stuck makes every day feel exactly the same.",
  "A person leaves the past behind but still carries the pain.",
  "Someone keeps searching for a place where they truly belong.",
  "Time moves too fast for someone who is not ready.",
  "Growing older brings wisdom and quiet grief.",
  "Change scares someone more than staying miserable does.",
  "Youth slips away before anyone notices it is gone.",
  "A person learns to live in the moment at last.",
  "The future feels exciting and terrifying all at once.",
  "Memories refuse to fade no matter how hard someone tries.",
  "One night changes the course of a person’s whole life.",
  "The changing seasons mirror a changing heart.",
  "Life keeps repeating lessons until someone finally learns them.",
  "Grief makes even ordinary mornings feel impossible.",
  "Someone says goodbye before they are ready.",
  "A person learns how to live after losing someone they loved.",
  "Memories become the only way to hold someone close.",
  "A near-death moment changes the way someone sees life.",
  "Someone wonders what kind of legacy they will leave behind.",
  "A person fears being forgotten after they are gone.",
  "Spiritual rebirth begins after everything falls apart.",
  "Someone wrestles with questions about heaven and hell.",
  "Loss teaches a person what love was really worth.",
  "A rebel refuses to live by someone else’s rules.",
  "Freedom feels sweeter after years of being controlled.",
  "Oppression breaks people until they decide to rise.",
  "A revolution starts with one brave voice.",
  "Social injustice turns pain into protest.",
  "Corruption poisons the people who trusted too easily.",
  "Someone fights back against a broken system.",
  "Being silenced only makes the truth louder inside.",
  "Empowerment begins when fear loses its grip.",
  "Survival becomes an act of defiance.",
  "A storm outside reflects the chaos within.",
  "The ocean becomes a symbol of longing and distance.",
  "Fire represents both destruction and desire.",
  "Moonlight makes an ordinary night feel magical.",
  "Sunrise gives someone hope for a new beginning.",
  "Sunset feels like the end of something beautiful.",
  "Stars remind a person how small and alive they are.",
  "Mountains stand for strength, endurance, and solitude.",
  "Wildflowers bloom where no one expected beauty to survive.",
  "Rain washes away what someone no longer needs.",
  "Climate change becomes a cry for the future.",
  "The earth feels wounded by human hands.",
  "A natural disaster changes lives in a single instant.",
  "Winter deepens someone’s loneliness.",
  "Summer feels like freedom, sweat, and young love.",
  "Autumn teaches someone how to let go gracefully.",
  "Spring feels like a second chance at living.",
  "The desert becomes a place of silence and self-reflection.",
  "A forest feels both peaceful and haunted.",
  "Nature heals what people cannot explain.",
  "A party hides the sadness no one wants to face.",
  "Fame gives someone everything except peace.",
  "Money solves problems but creates new emptiness.",
  "Greed turns love into a transaction.",
  "Luxury becomes a mask for loneliness.",
  "Celebrity life feels glamorous from far away and hollow up close.",
  "Someone uses nightlife to escape their real life.",
  "The high of chaos always ends in a crash.",
  "Living too fast makes someone miss what matters most.",
  "A wild night leaves behind permanent consequences.",
  "Technology connects everyone but leaves people feeling alone.",
  "Social media creates a version of life that is not real.",
  "Digital love feels intimate and distant at the same time.",
  "Artificial intelligence blurs the line between human and machine.",
  "A dystopian future grows from choices made today.",
  "Someone gets lost behind the identity they built online.",
  "Surveillance makes freedom feel like an illusion.",
  "Constant connection leaves no room for peace.",
  "A virtual world becomes more appealing than reality.",
  "Someone wonders what it means to stay human.",
  "Faith keeps someone steady through impossible pain.",
  "Doubt shakes the foundation of everything someone believes.",
  "A prayer rises from a place of desperation.",
  "Redemption comes after a person faces the harm they caused.",
  "Sin feels tempting until the cost becomes clear.",
  "Karma catches up with someone who thought they escaped.",
  "Destiny keeps pulling two lives together.",
  "A miracle arrives when hope was almost gone.",
  "Divine guidance appears in quiet and unexpected ways.",
  "Someone questions the meaning of life in the dark.",
  "Dreams reveal truths a person is afraid to face awake.",
  "Nightmares trap someone inside their own fear.",
  "A fantasy world offers escape from pain.",
  "Imagination becomes a place to survive reality.",
  "Magic represents wonder in a weary world.",
  "A superhero story hides a deeply human wound.",
  "A villain origin story explains how pain can twist a soul.",
  "Mythology becomes a mirror for modern heartbreak.",
  "Haunted memories follow someone wherever they go.",
  "Parallel universes make someone wonder about the life they almost had.",
  "War steals innocence from everyone it touches.",
  "Peace feels fragile after years of conflict.",
  "A soldier longs for home in the middle of battle.",
  "Refugees carry their memories farther than their belongings.",
  "Patriotism clashes with the truth of violence.",
  "Protest songs rise from collective pain and courage.",
  "History repeats because people refuse to learn from it.",
  "Courage appears in the smallest acts of survival.",
  "Someone survives impossible odds and is changed forever.",
  "Hope shines brightest in the middle of darkness.",
  "Revenge feels good in fantasy and empty in reality.",
  "Justice becomes the only thing keeping someone alive.",
  "A redemption arc begins when someone admits they were wrong.",
  "An apology comes too late to fix the damage.",
  "Temptation pulls someone toward the edge of ruin.",
  "Obsession consumes a person until nothing else matters.",
  "Mercy changes the ending of someone’s story.",
  "The truth finally comes out after years of hiding.",
  "A dangerous secret destroys everything built around it.",
  "Losing control feels terrifying and strangely freeing.",
  "Celebration becomes a way to honor survival.",
  "Gratitude grows from the small things people overlook.",
  "Ordinary moments become precious in hindsight.",
  "Letting go hurts before it heals.",
  "Becoming a parent changes the meaning of love forever.",
  "A new chapter begins after a painful ending.",
  "Standing alone teaches someone their own strength.",
  "Trust is built slowly and broken in seconds.",
  "Destiny crosses two lives at exactly the right time.",
  "A person writes a love letter to life after almost losing it.",
];

const defaults = {
  structure: "",
  theme: "",
};

function takeRandom(items, count) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function getGenreProfile(genre) {
  const genreName = (genre || "").toLowerCase();

  if (["pop", "k-pop", "j-pop"].includes(genreName)) {
    return {
      flavorGenre: ["City pop revival", "New wave"],
      vocalEffects: ["Auto-tune", "Stereo widening"],
      lead: ["Lead synth", "Bell lead"],
      chords: ["Digital poly synth", "Choir oohs"],
      bass: ["Synth bass", "Sub bass"],
      misc: ["Hand claps", "Riser FX"],
      emotions: ["Excitement", "Joy"],
      vocalType: ["Female lead", "Mixed duet voice"],
    };
  }

  if (["rock", "alternative", "grunge", "punk", "metal", "hardcore", "emo"].includes(genreName)) {
    return {
      flavorGenre: ["Shoegaze", "Neo-psychedelia"],
      vocalEffects: ["Distortion", "Overdrive"],
      lead: ["Electric guitar", "Violin"],
      chords: ["Electric guitar", "Twelve-string guitar"],
      bass: ["Electric bass", "Distorted bass"],
      misc: ["Drum kit", "Crash cymbal"],
      emotions: ["Anger", "Determination"],
      vocalType: ["Male lead", "Baritone voice"],
    };
  }

  if (["hip-hop", "rap", "trap", "lo-fi"].includes(genreName)) {
    return {
      flavorGenre: ["Drift phonk", "Memphis phonk"],
      vocalEffects: ["Auto-tune", "Vocal chop effect"],
      lead: ["Lead synth", "Electric piano"],
      chords: ["Rhodes", "Warm pad"],
      bass: ["808 bass", "Sub bass"],
      misc: ["Hi-hats", "Vinyl crackle"],
      emotions: ["Determination", "Longing"],
      vocalType: ["Male lead", "Mixed duet voice"],
    };
  }

  if (["r&b", "soul"].includes(genreName)) {
    return {
      flavorGenre: ["Dreamwave", "Chillwave"],
      vocalEffects: ["Reverb", "Harmonizer"],
      lead: ["Rhodes", "Electric piano"],
      chords: ["Rhodes", "Choir oohs"],
      bass: ["Fingerstyle bass", "Moog bass"],
      misc: ["Finger snaps", "Human breath sounds"],
      emotions: ["Love", "Tenderness"],
      vocalType: ["Female lead", "Male lead"],
    };
  }

  if (["jazz", "blues"].includes(genreName)) {
    return {
      flavorGenre: ["Dark cabaret", "Yacht rock revival"],
      vocalEffects: ["Compression", "Tape saturation"],
      lead: ["Saxophone", "Trumpet"],
      chords: ["Jazz guitar comping", "Upright piano"],
      bass: ["Upright bass", "Fretless bass"],
      misc: ["Ride cymbal", "Snare drum"],
      emotions: ["Melancholy", "Wonder"],
      vocalType: ["Male lead", "Alto voice"],
    };
  }

  if (["country", "folk", "bluegrass", "zydeco"].includes(genreName)) {
    return {
      flavorGenre: ["Ranchera", "Yacht rock revival"],
      vocalEffects: ["Reverb", "Doubling"],
      lead: ["Acoustic guitar", "Fiddle"],
      chords: ["Acoustic guitar", "Mandolin"],
      bass: ["Upright bass", "Acoustic bass guitar"],
      misc: ["Tambourine", "Hand claps"],
      emotions: ["Nostalgia", "Hope"],
      vocalType: ["Male lead", "Female lead"],
    };
  }

  if (["electronic", "dance", "house", "techno", "trance", "dubstep", "drum and bass"].includes(genreName)) {
    return {
      flavorGenre: ["Future garage", "Amapiano"],
      vocalEffects: ["Sidechain pumping", "Ping-pong delay"],
      lead: ["Analog synth lead", "Digital synth lead"],
      chords: ["Analog poly synth", "Ambient pad"],
      bass: ["Reese bass", "Wobble bass"],
      misc: ["Riser FX", "Impact hit"],
      emotions: ["Euphoria", "Excitement"],
      vocalType: ["Female lead", "Mixed duet voice"],
    };
  }

  if (["ambient", "new age", "classical", "orchestral", "opera"].includes(genreName)) {
    return {
      flavorGenre: ["Space music", "Drone"],
      vocalEffects: ["Reverb", "Reverse reverb"],
      lead: ["Violin", "Flute"],
      chords: ["String ensemble", "Choir ahhs"],
      bass: ["Contrabass", "Drone bass synth"],
      misc: ["Wind chimes", "Nature ambience"],
      emotions: ["Serenity", "Awe"],
      vocalType: ["Soprano voice", "Mezzo-soprano voice"],
    };
  }

  if (["gospel", "christian"].includes(genreName)) {
    return {
      flavorGenre: ["Sufi devotional", "Qawwali"],
      vocalEffects: ["Reverb", "Ad-lib stacking"],
      lead: ["Organ", "Piano"],
      chords: ["Church organ", "Choir ahhs"],
      bass: ["Electric bass", "Organ bass pedals"],
      misc: ["Hand claps", "Crowd chants"],
      emotions: ["Devotion", "Hope"],
      vocalType: ["Mixed duet voice", "Soprano voice"],
    };
  }

  if (["reggae", "dancehall", "ska"].includes(genreName)) {
    return {
      flavorGenre: ["Dembow", "Calypso"],
      vocalEffects: ["Delay", "Echo"],
      lead: ["Electric guitar", "Melodica"],
      chords: ["Organ", "Electric guitar"],
      bass: ["Electric bass", "Rubber bass synth"],
      misc: ["Tambourine", "Cowbell"],
      emotions: ["Joy", "Relief"],
      vocalType: ["Male lead", "Female lead"],
    };
  }

  if (["latin", "salsa", "reggaeton", "flamenco"].includes(genreName)) {
    return {
      flavorGenre: ["Dembow", "Bossa nova"],
      vocalEffects: ["Compression", "Stereo widening"],
      lead: ["Classical guitar", "Trumpet"],
      chords: ["Nylon-string guitar", "Piano"],
      bass: ["Electric bass", "Sub bass"],
      misc: ["Congas", "Timbales"],
      emotions: ["Passion", "Desire"],
      vocalType: ["Male lead", "Female lead"],
    };
  }

  if (["afrobeat", "world music"].includes(genreName)) {
    return {
      flavorGenre: ["Highlife", "Soukous"],
      vocalEffects: ["Compression", "Reverb"],
      lead: ["Kalimba", "Flute"],
      chords: ["Acoustic guitar", "Warm pad"],
      bass: ["Electric bass", "Fingerstyle bass"],
      misc: ["Djembe", "Shaker"],
      emotions: ["Curiosity", "Joy"],
      vocalType: ["Male lead", "Mixed duet voice"],
    };
  }

  if (["funk", "disco"].includes(genreName)) {
    return {
      flavorGenre: ["Skweee", "City pop revival"],
      vocalEffects: ["Chorus", "Compression"],
      lead: ["Clavinet", "Trumpet"],
      chords: ["Clavinet", "Electric guitar"],
      bass: ["Slap bass", "Fingerstyle bass"],
      misc: ["Cowbell", "Hand claps"],
      emotions: ["Joy", "Excitement"],
      vocalType: ["Female lead", "Male lead"],
    };
  }

  return {
    flavorGenre: ["Dreamwave", "Future garage"],
    vocalEffects: ["Reverb", "Delay"],
    lead: ["Lead synth", "Piano"],
    chords: ["Ambient pad", "Piano"],
    bass: ["Synth bass", "Electric bass"],
    misc: ["Riser FX", "Field recordings"],
    emotions: ["Hope", "Melancholy"],
    vocalType: ["Male lead", "Female lead"],
  };
}

function buildFieldSuggestions(field, options, genre) {
  const profile = getGenreProfile(genre);
  const anchors = (profile[field] || []).filter((item) => options.includes(item));
  const guaranteed = anchors.length >= 2
    ? anchors.slice(0, 2)
    : [...anchors, ...options.filter((item) => !anchors.includes(item)).slice(0, 2 - anchors.length)];
  const randomPool = options.filter((item) => !guaranteed.includes(item));
  const filler = takeRandom(randomPool, Math.max(0, 5 - guaranteed.length));
  return [...guaranteed, ...filler].slice(0, 5);
}

function appendValue(currentValue, addition) {
  if (!currentValue.trim()) return addition;
  if (currentValue.includes(addition)) return currentValue;
  return `${currentValue}, ${addition}`;
}

function Field({ label, helper, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {helper ? <span className="field-helper">{helper}</span> : null}
    </label>
  );
}

function SuggestionInput({ label, helper, value, onChange, suggestions, onPick, onRandomize, placeholder }) {
  return (
    <div className="option-row">
      <Field label={label} helper={helper}>
        <input className="text-input" type="text" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      </Field>

      <div className="suggestion-toolbar">
        <span className="option-row-title">Suggestions</span>
        <button type="button" className="secondary-button" onClick={onRandomize}>
          <Shuffle size={14} />
          Randomize
        </button>
      </div>

      <div className="pill-row">
        {suggestions.map((item) => (
          <button key={item} type="button" className="pill" onClick={() => onPick(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function parseStructure(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((label, index) => ({ id: `${label.toLowerCase()}-${index}`, label, order: index + 1 }));
}

function buildSection(section) {
  return {
    ...section,
    soundStyle: "",
    genre: "",
    flavorGenre: "",
    vocalEffects: "",
    lead: "",
    chords: "",
    bass: "",
    misc: "",
    emotions: "",
    vocalType: "",
    notes: "",
  };
}

function buildSuggestionState(sectionList) {
  const next = {};
  for (const section of sectionList) {
    next[section.id] = {};
    for (const [field, , options] of rows) {
      next[section.id][field] = genreLinkedFields.includes(field)
        ? buildFieldSuggestions(field, options, section.genre)
        : takeRandom(options, 5);
    }
  }
  return next;
}

export default function App() {
  const initialSections = [];
  const emptyCarryOver = {
    soundStyle: "",
    genre: "",
    flavorGenre: "",
    vocalEffects: "",
    lead: "",
    chords: "",
    bass: "",
    misc: "",
    emotions: "",
    vocalType: "",
    notes: "",
  };
  const [draft, setDraft] = useState(defaults);
  const [appliedTheme, setAppliedTheme] = useState("");
  const [sections, setSections] = useState(initialSections);
  const [workspaceMode, setWorkspaceMode] = useState("setup");
  const [addOns, setAddOns] = useState({ literaryDevices: "", allusions: "", rhymePatterns: "" });
  const [addonSuggestions, setAddonSuggestions] = useState(() => ({
    literaryDevices: takeRandom(literaryDevices, 5),
    rhymePatterns: takeRandom(rhymePatterns, 5),
    allusions: takeRandom(allusions, 5),
  }));
  const [currentSectionId, setCurrentSectionId] = useState(initialSections[0]?.id ?? "");
  const [themeSuggestions, setThemeSuggestions] = useState(() => takeRandom(themePool, 3));
  const [sectionSuggestions, setSectionSuggestions] = useState(() => buildSuggestionState(initialSections));
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [carryOverValues, setCarryOverValues] = useState(emptyCarryOver);
  const [carryOverReady, setCarryOverReady] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!copiedPrompt) return undefined;
    const timer = window.setTimeout(() => setCopiedPrompt(""), 1600);
    return () => window.clearTimeout(timer);
  }, [copiedPrompt]);

  useEffect(() => {
    if (!sections.length) {
      setCurrentSectionId("");
      return;
    }
    if (!sections.some((section) => section.id === currentSectionId)) {
      setCurrentSectionId(sections[0].id);
    }
  }, [sections, currentSectionId]);

  const preview = useMemo(() => parseStructure(draft.structure), [draft.structure]);
  const activeSection = sections.find((section) => section.id === currentSectionId) ?? null;
  const structureCount = preview.length;
  const statusLabel =
    workspaceMode === "sections"
      ? "Section Workspace"
      : workspaceMode === "addons"
        ? "Add-Ons Workspace"
        : workspaceMode === "prompt"
          ? "Prompt Workspace"
        : "Blueprint Builder";
  const lyricsPrompt = useMemo(() => {
    const structureLine = sections.length
      ? sections.map((section) => section.label).join(" -> ")
      : "No structure applied yet";
    const sectionLyrics = sections.length
      ? sections
          .map(
            (section) =>
              `${section.label}: emotions ${section.emotions || "none"}, vocal type ${section.vocalType || "none"}, lyrical focus notes ${section.notes || "none"}`,
          )
          .join("; ")
      : "No section details available";

    return [
      "Write song lyrics using this creative brief.",
      `Overall theme: ${appliedTheme || draft.theme || "None selected"}`,
      `Song structure: ${structureLine}`,
      `Literary devices to use: ${addOns.literaryDevices || "none"}`,
      `Allusions to consider: ${addOns.allusions || "none"}`,
      `Rhyme patterns to consider: ${addOns.rhymePatterns || "none"}`,
      `Section-by-section lyrical direction: ${sectionLyrics}`,
      "Prioritize emotional clarity, memorable imagery, and section contrast between verses, choruses, and transitional moments.",
    ].join("\n");
  }, [addOns, appliedTheme, draft.theme, sections]);

  const instrumentalPrompt = useMemo(() => {
    const structureLine = sections.length
      ? sections.map((section) => section.label).join(" -> ")
      : "No structure applied yet";
    const sectionSound = sections.length
      ? sections
          .map(
            (section) =>
              `${section.label}: sound style ${section.soundStyle || "none"}, genre ${section.genre || "none"}, flavor genre ${section.flavorGenre || "none"}, vocal effects ${section.vocalEffects || "none"}, lead ${section.lead || "none"}, chords ${section.chords || "none"}, bass ${section.bass || "none"}, misc ${section.misc || "none"}`,
          )
          .join("; ")
      : "No section details available";

    return [
      "Create a style prompt no more than 800 characters long.",
      `Overall theme: ${appliedTheme || draft.theme || "None selected"}`,
      `Song structure: ${structureLine}`,
      `Global stylistic references: sound styles, genres, and textures should support the mood without overpowering the vocal narrative.`,
      `Section-by-section production direction: ${sectionSound}`,
      "Focus on arrangement movement, transitions, sonic texture, dynamics, and a cohesive instrumental identity from intro to ending.",
    ].join("\n");
  }, [appliedTheme, draft.theme, sections]);
  const output = useMemo(() => {
    if (!sections.length) return "Apply a structure and theme to generate your section blueprint.";
    return [
      `Overall Theme: ${appliedTheme}`,
      `Structure: ${sections.map((section) => section.label).join(" -> ")}`,
      "",
      ...sections.map((section) => [
        `${section.order}. ${section.label}`,
        `Sound Style: ${section.soundStyle}`,
        `Genre: ${section.genre}`,
        `Flavor Genre: ${section.flavorGenre}`,
        `Vocal Effects: ${section.vocalEffects}`,
        `Lead: ${section.lead}`,
        `Chords: ${section.chords}`,
        `Bass: ${section.bass}`,
        `Misc: ${section.misc}`,
        `Emotions: ${section.emotions}`,
        `Vocals: ${section.vocalType}`,
        `Direction Notes: ${section.notes || "None"}`,
      ].join("\n")),
      "",
      "Add-Ons",
      `Literary Devices: ${addOns.literaryDevices || "None"}`,
      `Rhyme Patterns: ${addOns.rhymePatterns || "None"}`,
      `Allusions: ${addOns.allusions || "None"}`,
    ].join("\n\n");
  }, [addOns, appliedTheme, sections]);

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function applyBlueprint() {
    const next = parseStructure(draft.structure);
    const nextSections = next.map((section) => {
      const existing = sections.find((item) => item.id === section.id);
      return existing ? { ...existing, label: section.label, order: section.order } : buildSection(section);
    });

    setAppliedTheme(draft.theme.trim());
    setSections(nextSections);
    setWorkspaceMode("sections");
    setCurrentSectionId(nextSections[0]?.id ?? "");
    setSectionSuggestions((current) => {
      const nextSuggestions = {};
      for (const section of nextSections) {
        nextSuggestions[section.id] = current[section.id] ?? Object.fromEntries(rows.map(([field, , options]) => [field, takeRandom(options, 5)]));
      }
      return nextSuggestions;
    });
  }

  function clearStructure() {
    updateDraft("structure", "");
  }

  function goToSetup() {
    setWorkspaceMode("setup");
  }

  function undoStructure() {
    const lines = draft.structure.split("\n").map((item) => item.trim()).filter(Boolean);
    updateDraft("structure", lines.slice(0, -1).join("\n"));
  }

  function randomizeThemeSuggestions() {
    setThemeSuggestions(takeRandom(themePool, 3));
  }

  function addThemeSuggestion(value) {
    updateDraft("theme", appendValue(draft.theme, value));
  }

  function updateSection(id, field, value) {
    setSections((current) => current.map((section) => (section.id === id ? { ...section, [field]: value } : section)));
    if (field === "genre") {
      setSectionSuggestions((current) => {
        const next = { ...current };
        next[id] = { ...(current[id] || {}) };

        for (const [linkedField, , options] of rows) {
          if (genreLinkedFields.includes(linkedField)) {
            next[id][linkedField] = buildFieldSuggestions(linkedField, options, value);
          }
        }

        return next;
      });
    }
  }

  function addSectionSuggestion(id, field, value) {
    setSections((current) => current.map((section) => section.id === id ? { ...section, [field]: appendValue(section[field], value) } : section));
  }

  function randomizeSectionSuggestions(id, field, options) {
    setSectionSuggestions((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: genreLinkedFields.includes(field)
          ? buildFieldSuggestions(
              field,
              options,
              sections.find((section) => section.id === id)?.genre,
            )
          : takeRandom(options, 5),
      },
    }));
  }

  function carryOverSection(section) {
    setCarryOverValues({
      soundStyle: section.soundStyle,
      genre: section.genre,
      flavorGenre: section.flavorGenre,
      vocalEffects: section.vocalEffects,
      lead: section.lead,
      chords: section.chords,
      bass: section.bass,
      misc: section.misc,
      emotions: section.emotions,
      vocalType: section.vocalType,
      notes: section.notes,
    });
    setCarryOverReady(true);
  }

  function implementCarryOver(id) {
    if (!carryOverReady) {
      return;
    }

    setSections((current) =>
      current.map((section) =>
        section.id === id
          ? {
              ...section,
              ...carryOverValues,
            }
          : section,
      ),
    );
  }

  function updateAddOn(field, value) {
    setAddOns((current) => ({ ...current, [field]: value }));
  }

  function addAddOnSuggestion(field, value) {
    setAddOns((current) => ({
      ...current,
      [field]: appendValue(current[field], value),
    }));
  }

  function randomizeAddOnSuggestions(field, options) {
    setAddonSuggestions((current) => ({
      ...current,
      [field]: takeRandom(options, 5),
    }));
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function copySpecificPrompt(kind, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedPrompt(kind);
    } catch {
      setCopiedPrompt("");
    }
  }

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-badge">
              <MoonStar size={16} />
            </div>
            <strong>FlowMuse</strong>
          </div>

          <nav className="topnav" aria-label="Primary">
            <button type="button" className={`topnav-link ${workspaceMode === "setup" ? "topnav-link-active" : ""}`} onClick={goToSetup}>
              Builder
            </button>
            <button type="button" className={`topnav-link ${workspaceMode === "sections" ? "topnav-link-active" : ""}`} onClick={() => sections.length ? setWorkspaceMode("sections") : null}>
              Sections
            </button>
            <button type="button" className={`topnav-link ${workspaceMode === "addons" ? "topnav-link-active" : ""}`} onClick={() => setWorkspaceMode("addons")}>
              Add-Ons
            </button>
            <button type="button" className={`topnav-link ${workspaceMode === "prompt" ? "topnav-link-active" : ""}`} onClick={() => setWorkspaceMode("prompt")}>
              Prompt
            </button>
            <span className="topnav-meta">{statusLabel}</span>
          </nav>

          <button type="button" className="signup-button" onClick={workspaceMode === "sections" ? copyOutput : applyBlueprint}>
            {workspaceMode === "sections" ? (copied ? "Copied" : "Copy Blueprint") : "Apply"}
          </button>
        </header>
        <section className="app-workspace">
          <aside className="workspace-sidebar">
            <div className="sidebar-top">
              <p className="eyebrow">Workspace</p>
              <h2>Song Builder</h2>
            </div>

            <button type="button" className={`sidebar-action ${workspaceMode === "setup" ? "sidebar-action-active" : ""}`} onClick={goToSetup}>
              <Layers3 size={16} />
              Blueprint Setup
            </button>
            <button type="button" className={`sidebar-action ${workspaceMode === "sections" ? "sidebar-action-active" : ""}`} onClick={() => sections.length ? setWorkspaceMode("sections") : null}>
              <Disc3 size={16} />
              Section Pages
            </button>
            <button type="button" className={`sidebar-action ${workspaceMode === "addons" ? "sidebar-action-active" : ""}`} onClick={() => setWorkspaceMode("addons")}>
              <Sparkles size={16} />
              Add-Ons
            </button>
            <button type="button" className={`sidebar-action ${workspaceMode === "prompt" ? "sidebar-action-active" : ""}`} onClick={() => setWorkspaceMode("prompt")}>
              <Clipboard size={16} />
              Prompt
            </button>

            <div className="sidebar-summary">
              <div className="summary-card">
                <span>Structure</span>
                <strong>{structureCount || 0}</strong>
              </div>
              <div className="summary-card">
                <span>Theme</span>
                <strong>{draft.theme.trim() ? "Ready" : "Empty"}</strong>
              </div>
            </div>

            {workspaceMode === "sections" ? (
              <div className="sidebar-tablist" role="tablist" aria-label="Structure section tabs">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={`sidebar-tab ${section.id === currentSectionId ? "sidebar-tab-active" : ""}`}
                    onClick={() => setCurrentSectionId(section.id)}
                  >
                    <span>{String(section.order).padStart(2, "0")}</span>
                    <strong>{section.label}</strong>
                  </button>
                ))}
              </div>
            ) : null}
          </aside>

          <div className="workspace-main">
            <div className="workspace-header">
              <div>
                <p className="eyebrow">{workspaceMode === "setup" ? "Blueprint Setup" : "Section Editor"}</p>
                <h1 className="section-title">
                  {workspaceMode === "setup"
                    ? "Configure the Blueprint"
                    : workspaceMode === "addons"
                      ? "Add-Ons"
                      : workspaceMode === "prompt"
                        ? "Generated Prompts"
                      : activeSection?.label ?? "Section Workspace"}
                </h1>
              </div>
              <div className="workspace-tools">
                {workspaceMode === "setup" ? (
                  <button type="button" className="primary-button" onClick={applyBlueprint}>
                    <WandSparkles size={16} />
                    Apply Structure + Theme
                  </button>
                ) : (
                  <button type="button" className="primary-button" onClick={copyOutput}>
                    <Clipboard size={16} />
                    {copied ? "Copied" : "Copy Blueprint"}
                  </button>
                )}
              </div>
            </div>

            {workspaceMode === "setup" ? (
              <div className="builder-grid">
                <section className="panel blueprint-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Structure</p><h2>Arrange the Song</h2></div>
                    <Layers3 className="panel-icon" />
                  </div>

                  <Field label="Structure" helper="Use one section per line. Clear wipes the list, and undo removes the last section.">
                    <textarea className="text-input textarea-input" value={draft.structure} onChange={(event) => updateDraft("structure", event.target.value)} placeholder={"Intro\nVerse\nChorus\nBridge\nOutro"} />
                    <div className="action-row">
                      <button type="button" className="secondary-button" onClick={undoStructure}><Undo2 size={14} />Undo</button>
                      <button type="button" className="secondary-button" onClick={clearStructure}><RotateCcw size={14} />Clear</button>
                    </div>
                  </Field>
                </section>

                <section className="panel theme-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Theme</p><h2>Set the Overall Mood</h2></div>
                    <Disc3 className="panel-icon" />
                  </div>

                  <SuggestionInput
                    label="Overall Theme"
                    helper=""
                    value={draft.theme}
                    onChange={(value) => updateDraft("theme", value)}
                    suggestions={themeSuggestions}
                    onPick={addThemeSuggestion}
                    onRandomize={randomizeThemeSuggestions}
                    placeholder="Describe the cinematic arc, mood, and atmosphere."
                  />
                </section>

                <section className="panel starter-dock">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Starter Library</p><h2>Structure Options</h2></div>
                  </div>

                  <div className="pill-row">
                    {structureOptions.map((item) => (
                      <button key={item} type="button" className="pill" onClick={() => updateDraft("structure", draft.structure.trim() ? `${draft.structure}\n${item}` : item)}>{item}</button>
                    ))}
                  </div>
                </section>

                <section className="panel preview-dock">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Current Preview</p><h2>Pending Sections</h2></div>
                  </div>

                  <div className="queue-list">
                    {preview.length ? preview.map((section) => (
                      <div key={section.id} className="queue-item">
                        <span>{String(section.order).padStart(2, "0")}</span>
                        <strong>{section.label}</strong>
                      </div>
                    )) : (
                      <div className="empty-state">Add structure items to populate the workspace tabs.</div>
                    )}
                  </div>
                </section>
              </div>
            ) : workspaceMode === "sections" ? (
              <>
                {activeSection ? (
                  <section className="panel section-stage">
                    <div className="panel-heading">
                      <div><p className="eyebrow">Section Page</p><h2>{activeSection.label}</h2></div>
                      <div className="section-page-actions">
                        <button type="button" className="secondary-button" onClick={() => carryOverSection(activeSection)}>
                          Carry Over
                        </button>
                        <button type="button" className="secondary-button" onClick={() => implementCarryOver(activeSection.id)} disabled={!carryOverReady}>
                          Implement
                        </button>
                        <div className="section-chip">{activeSection.order.toString().padStart(2, "0")}</div>
                      </div>
                    </div>

                    <div className="section-grid">
                      {rows.map(([field, label, options]) => (
                        <SuggestionInput
                          key={field}
                          label={label}
                          helper={`Click any suggestion to add it into ${activeSection.label.toLowerCase()}.`}
                          value={activeSection[field]}
                          onChange={(value) => updateSection(activeSection.id, field, value)}
                          suggestions={sectionSuggestions[activeSection.id]?.[field] ?? takeRandom(options, 5)}
                          onPick={(value) => addSectionSuggestion(activeSection.id, field, value)}
                          onRandomize={() => randomizeSectionSuggestions(activeSection.id, field, options)}
                          placeholder={`Set ${label.toLowerCase()} for ${activeSection.label.toLowerCase()}`}
                        />
                      ))}
                    </div>

                    <Field label="Section Notes" helper={`Tighten how ${activeSection.label.toLowerCase()} should behave against the overall theme.`}>
                      <textarea className="text-input note-input" value={activeSection.notes} onChange={(event) => updateSection(activeSection.id, "notes", event.target.value)} placeholder={`Add custom direction for ${activeSection.label.toLowerCase()}.`} />
                    </Field>
                  </section>
                ) : (
                  <section className="panel section-stage">
                    <div className="empty-state">Apply a structure and theme to open the section pages.</div>
                  </section>
                )}

                <section className="panel output-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Blueprint Output</p><h2>Exported Prompt</h2></div>
                    <Sparkles className="panel-icon" />
                  </div>
                  <div className="prompt-output"><pre>{output}</pre></div>
                </section>
              </>
            ) : workspaceMode === "prompt" ? (
              <div className="builder-grid">
                <section className="panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Lyrics Prompt</p><h2>Lyric Direction</h2></div>
                    <button type="button" className="secondary-button" onClick={() => copySpecificPrompt("lyrics", lyricsPrompt)}>
                      <Clipboard size={14} />
                      {copiedPrompt === "lyrics" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="prompt-output"><pre>{lyricsPrompt}</pre></div>
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Instrumental Prompt</p><h2>Sound Direction</h2></div>
                    <button type="button" className="secondary-button" onClick={() => copySpecificPrompt("instrumental", instrumentalPrompt)}>
                      <Clipboard size={14} />
                      {copiedPrompt === "instrumental" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="prompt-output"><pre>{instrumentalPrompt}</pre></div>
                </section>
              </div>
            ) : (
              <>
                <section className="panel section-stage">
                  <div className="section-grid">
                    <SuggestionInput
                      label="Literary Devices"
                      helper="Add optional writing techniques that should influence the lyrics."
                      value={addOns.literaryDevices}
                      onChange={(value) => updateAddOn("literaryDevices", value)}
                      suggestions={addonSuggestions.literaryDevices}
                      onPick={(value) => addAddOnSuggestion("literaryDevices", value)}
                      onRandomize={() => randomizeAddOnSuggestions("literaryDevices", literaryDevices)}
                      placeholder="Choose literary devices"
                    />
                    <SuggestionInput
                      label="Rhyme Patterns"
                      helper="A = same rhyme sound, B = different rhyme sound, X = no rhyme or free line."
                      value={addOns.rhymePatterns}
                      onChange={(value) => updateAddOn("rhymePatterns", value)}
                      suggestions={addonSuggestions.rhymePatterns}
                      onPick={(value) => addAddOnSuggestion("rhymePatterns", value)}
                      onRandomize={() => randomizeAddOnSuggestions("rhymePatterns", rhymePatterns)}
                      placeholder="Choose rhyme patterns"
                    />
                    <SuggestionInput
                      label="Allusion"
                      helper="Add optional cultural, narrative, or symbolic references."
                      value={addOns.allusions}
                      onChange={(value) => updateAddOn("allusions", value)}
                      suggestions={addonSuggestions.allusions}
                      onPick={(value) => addAddOnSuggestion("allusions", value)}
                      onRandomize={() => randomizeAddOnSuggestions("allusions", allusions)}
                      placeholder="Choose allusions"
                    />
                  </div>
                </section>

                <section className="panel output-panel">
                  <div className="panel-heading">
                    <div><p className="eyebrow">Blueprint Output</p><h2>Exported Prompt</h2></div>
                    <Sparkles className="panel-icon" />
                  </div>
                  <div className="prompt-output"><pre>{output}</pre></div>
                </section>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
