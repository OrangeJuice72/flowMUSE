export const genreFamilies = {
  pop: ["Pop", "K-Pop", "J-Pop", "Hyperpop"],
  rock: ["Rock", "Alternative", "Indie", "Grunge", "Shoegaze", "Punk", "Emo"],
  urban: ["Hip-Hop", "R&B", "Soul", "Trap", "Phonk"],
  electronic: ["Electronic", "House", "Techno", "Trance", "Dubstep", "Drum & Bass", "Ambient", "Lo-fi", "Synthwave", "EDM", "Experimental"],
  roots: ["Country", "Folk", "Bluegrass", "Gospel", "Blues", "World"],
  latinAfro: ["Latin Pop", "Salsa", "Bachata", "Reggaeton", "Afrobeats", "Amapiano", "Reggae", "Dancehall", "Ska"],
  orchestral: ["Classical", "Orchestral", "Cinematic", "Opera"],
  metal: ["Metal"],
  jazz: ["Jazz", "Funk", "Disco"]
};

export const fieldProfiles = {
  flavor: { pop: ["Dream Pop","Art Pop","Bedroom Pop","Dance Pop","Electro Pop"], rock: ["Hard Rock","Post Punk","Dreamgaze","Math Rock","Surf Rock"], urban: ["Alt R&B","Boom Bap","Cloud Rap","Trap Soul","Conscious Rap"], electronic: ["Future Bass","Deep House","Melodic Techno","Chillstep","Vaporwave"], roots: ["Americana","Acoustic Ballad","Celtic Folk","Outlaw Country","Bluegrass Gospel"], latinAfro: ["Afro Fusion","Afro House","Bossa Nova","Cumbia","Moombahton"], orchestral: ["Chamber Folk","Torch Song","Cabaret","Baroque Pop","New Age"], metal: ["Symphonic Metal","Metalcore","Industrial","Blackgaze","Noise Pop"], jazz: ["Neo Soul","Latin Jazz","Nu Disco","Electro Swing","Psychedelic Funk"] },
  theme: { pop: ["First kiss","Golden hour memories","Summer romance","Electric attraction","Mixtape memories"], rock: ["Silent rebellion","Against the odds","Open road freedom","Breaking free","City of echoes"], urban: ["Chasing stardom","Masked emotions","The cost of fame","Midnight confession","Graffiti dreams"], electronic: ["Digital heartbreak","Virtual paradise","Parallel universes","Neon nights","Artificial consciousness"], roots: ["Small town dreams","Homecoming","River of regret","Mountain high","Letters never sent"], latinAfro: ["Carnival lights","Wild abandon","Sunrise promise","Retro summer","Ocean mystery"], orchestral: ["Legacy","Sacrifice","Immortality","Moonlit ritual","Final sunrise"], metal: ["Apocalypse","Fire and ash","War and peace","Breaking point","Halo and horns"], jazz: ["After the party","Blue hour sadness","Velvet danger","Champagne tears","Vinyl soul"] },
  instrument: { pop: ["Bright Electric Piano","Wide Pad Synth","Drum Kit","Glassy Lead Synth","Punchy Bass Guitar"], rock: ["Electric Guitar","Bass Guitar","Drum Kit","Vintage Organ","Tambourine"], urban: ["808 Bass","Vocal Chop","Kick Drum","Synth Bass","Electric Piano"], electronic: ["Analog Synth","Arpeggiator","Sub Bass","Wavetable Synth","Pad Synth"], roots: ["Acoustic Guitar","Banjo","Mandolin","Upright Bass","Tin Whistle"], latinAfro: ["Congas","Bongos","Timbales","Shaker","Steel Drums"], orchestral: ["String Ensemble","French Horn","Grand Piano","Choir","Timpani"], metal: ["Heavy Electric Guitar","Double Bass","Crash Cymbal","Tom Drums","Bass Guitar"], jazz: ["Upright Bass","Muted Trumpet","Rhodes","Drum Kit","Tenor Sax"] },
  vocals: { pop: ["Female","Male","Duet","Falsetto","Whispered"], rock: ["Male","Female","Group Chant","Whispered","Spoken Word"], urban: ["Male","Female","Duet","Spoken Word","Robotic"], electronic: ["Female","Robotic","Male","Whispered","Duet"], roots: ["Male","Female","Choir","Children's Choir","Spoken Word"], latinAfro: ["Male","Female","Duet","Group Chant","Choir"], orchestral: ["Choir","Female","Male","Children's Choir","Duet"], metal: ["Male","Female","Group Chant","Choir","Whispered"], jazz: ["Female","Male","Duet","Whispered","Spoken Word"] },
  vocalEffect: { pop: ["Harmony Stack","Plate Reverb","Doubling","Dream Haze","Stereo Widening"], rock: ["Room Reverb","Slapback Delay","Subtle Distortion","Doubling","Tape Saturation"], urban: ["Auto-Tune","Delay","Breathy Layer","Wide Harmonizer","Ghost Echo"], electronic: ["Vocoder","Granular FX","Glitch Chop","Reverse Reverb","Filtered Intro"], roots: ["Dry","Room Reverb","Tape Saturation","Cathedral Reverb","Slapback Delay"], latinAfro: ["Delay","Plate Reverb","Call-and-Response FX","Stereo Widening","Room Reverb"], orchestral: ["Cathedral Reverb","Long Tail Reverb","Harmony Stack","Wide Harmonizer","Ghost Echo"], metal: ["Distortion","Scream Layer","Room Reverb","Subtle Distortion","Doubling"], jazz: ["Plate Reverb","Slapback Delay","Dry","Tape Saturation","Room Reverb"] },
  atmosphere: { pop: ["Glittering","Golden Hour","Dreamlike","Neon","Shimmering"], rock: ["Underground","Stormy","Shadowy","Smoky","Dangerous"], urban: ["Afterhours","Urban","Nocturnal","Velvet","Electric"], electronic: ["Futuristic","Cosmic","Hyperreal","Digital","Weightless"], roots: ["Pastoral","Sunlit","Dusty","Cozy","Rural"], latinAfro: ["Tropical","Festival","Sunlit","Oceanic","Playful"], orchestral: ["Widescreen","Sacred","Mythic","Cathedral","Otherworldly"], metal: ["Apocalyptic","Haunted","Burning","Industrial","Tense"], jazz: ["Lounge","Blue Hour","Smoky","Intimate","Velvet"] },
  mood: { pop: ["Joyful","Romantic","Playful","Hopeful","Euphoric"], rock: ["Defiant","Rebellious","Brooding","Bold","Fearless"], urban: ["Confident","Sultry","Raw","Yearning","Obsessive"], electronic: ["Euphoric","Dreamy","Weightless","Restless","Electric"], roots: ["Tender","Nostalgic","Warm","Grounded","Sincere"], latinAfro: ["Energetic","Joyful","Radiant","Carefree","Playful"], orchestral: ["Epic","Awestruck","Triumphant","Hopeful","Transcendent"], metal: ["Angry","Tense","Aggressive","Broken","Determined"], jazz: ["Bittersweet","Reflective","Tender","Chill","Melancholic"] }
};

export const detectFamilyKeys = (selectedGenres) => {
  const families = new Set();
  selectedGenres.forEach((genre) => {
    Object.entries(genreFamilies).forEach(([family, members]) => {
      if (members.includes(genre)) families.add(family);
    });
  });
  if (families.size === 0 && selectedGenres.length) families.add("pop");
  return [...families];
};
