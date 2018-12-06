const myObjects = {};

myObjects.genders = [
    'Male',
    'Female',
    'Other'
];

myObjects.months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

myObjects.days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

myObjects.seasons = [
    'Fall',
    'Winter',
    'Spring',
    'Summer'
];

myObjects.classes = [
    {
        name: "A / Water Discovery",
        skills: [
            "Blow bubbles on surface, assisted",
            "Front tow chin in water, assisted",
            "Water exit parent & child together",
            "Water entry parent & child together",
            "Back float assisted, head on shoulder",
            "Roll assisted, back to front & front to back",
            "Front float chin in water, assisted",
            "Back tow assisted, head on shoulder",
            "Wall grab assisted"
        ],
        topics: [
            "A_1 Ask permission",
            "A_2 Swim attire",
            "A_3 Safe swim area",
            "A_4 Lifeguards",
            "A_5 Drowning",
            "A_6 Life jackets",
            "A_7 Rescue breathing",
            "A_8 Backyard pools"
        ]
    },
    {
        name: "B / Water Exploration",
        skills: [
            "Blow bubbles mouth and nose submerged, assisted",
            "Front tow blow bubbles, assisted",
            "Water exit assisted",
            "Water entry assisted",
            "Back float assisted, head on chest",
            "Roll assisted, back to front & front to back",
            "Front float blow bubbles, assisted",
            "Back tow assisted, head on chest",
            "Monkey crawl assisted, on edge, 5ft"
        ],
        topics: [
            "B_1 Ask permission",
            "B_2 Swim attire",
            "B_3 Safe swim area",
            "B_4 Life jackets",
            "B_5 Reach or throw, don't go",
            "B_6 Hypothermia",
            "B_7 Choking",
            "B_8 Beaches"
        ]
    },
    {
        name: "1 / Acclimation",
        skills: [
            "Submerge bob independently",
            "Front glide assisted, to wall, 5ft",
            "Water exit independently",
            "Jump, push, turn, grab assisted",
            "Back float assisted, 10 secs, recover independently",
            "Roll assisted, back to front & front to back",
            "Front float assisted, 10 secs, recover independently",
            "Back glide assisted, at wall, 5ft",
            "Swim, float, swim assisted, 10 ft"
        ],
        topics: [
            "1_1 Building relationships",
            "1_2 The Y's Core Values",
            "1_3 Lifeguards",
            "1_4 Benchmark skills",
            "1_5 Supervision",
            "1_6 Reach or throw, don't go",
            "1_7 Life Jackets",
            "1_8 Safe swim area"
        ]
    },
    {
        name: "2 / Water Movement",
        skills: [
            "Submerge look at object on bottom",
            "Front glide 10 ft (5 ft preschool)",
            "Water exit independently",
            "Jump, push, turn, grab",
            "Back float 20 secs (10 secs preschool)",
            "Roll back to front & front to back",
            "Front float 20 secs (10 secs preschool)",
            "Back glide 10 ft (5 ft preschool)",
            "Tread water 10 secs, near wall, & exit",
            "Swim, float, swim 5 yd"
        ],
        topics: [
            "2_1 Building relationships",
            "2_2 The Y's Core Values",
            "2_3 Find help",
            "2_4 Benchmark skills",
            "2_5 Supervision",
            "2_6 Lifejackets",
            "2_7 Reach or throw, don't go",
            "2_8 Backyard pools"
        ]
    },
    {
        name: "3 / Water Stamina",
        skills: [
            "Submerge retrieve object in chest-deep water",
            "Swim on front 15 yd (10 yd preschool)",
            "Water exit independently",
            "Jump, swim, turn, swim, grab 10 yd",
            "Swim on back 15 yd (10 yd preschool)",
            "Roll back to front & front to back",
            "Tread water 1 min & exit (30 secs preschool)",
            "Swim, float, swim 25 yd (15 yd preschool)"
        ],
        topics: [
            "3_1 Building relationships",
            "3_2 The Y's Core Values",
            "3_3 Sun safety",
            "3_4 Benchmark skills",
            "3_5 Lifejackets",
            "3_6 Supervision",
            "3_7 Call 911",
            "3_8 Pool drains"
        ]
    },
    {
        name: "4 / Stroke Introduction",
        skills: [
            "Endurance any stroke or combination of strokes, 25 yd",
            "Front crawl rotary breathing, 15 yd",
            "Back crawl 15 yd",
            "Dive sitting",
            "Resting stroke elementary backstroke, 15 yd",
            "Tread water scissor & whip kick, 1 min",
            "Breaststroke kick, 15 yd",
            "Butterfly kick, 15 yd"
        ],
        topics: [
            "4_1 Weather",
            "4_2 First aid",
            "4_3 Hypoxic blackout",
            "4_4 Open water",
            "4_5 Goal setting",
            "4_6 Heart rate",
            "4_7 Nutrition ",
            "4_8 Boating"
        ]
    },
    {
        name: "5 / Stroke Development",
        skills: [
            "Endurance any stroke or combination of strokes, 50 yd",
            "Front crawl bent-arm recovery, 25 yd",
            "Back crawl pull, 25 yd",
            "Dive kneeling",
            "Resting stroke sidestroke, 25 yd",
            "Tread water scissor & whip kick, 2 min",
            "Breaststroke 25 yd",
            "Butterfly simultaneous arm action & kick, 15 yd"
        ],
        topics: [
            "5_1 HELP technique",
            "5_2 Shock",
            "5_3 Hypoxic blackout",
            "5_4 Huddle position",
            "5_5 Goal setting",
            "5_6 Abdominal thrusts",
            "5_7 Rest & relaxation",
            "5_8 Water parks"
        ]
    },
    {
        name: "6 / Stroke Mechanics",
        skills: [
            "Endurance any stroke or combination of strokes, 150 yd",
            "Front crawl flip-turn, 50 yd",
            "Back crawl pull and flip-turn, 50 yd",
            "Dive standing",
            "Resting stroke elementary backstroke or sidestroke, 50 yd",
            "Tread water retreive object off bottom, tread 1 min",
            "Breaststroke open turn, 50 yd",
            "Butterfly 25 yd"
        ],
        topics: [
            "6_1 Hypothermia",
            "6_2 Rescue breathing",
            "6_3 Hypoxic blackout",
            "6_4 Benchmark skills",
            "6_5 Goal setting",
            "6_6 CPR",
            "6_7 Physical activity",
            "6_8 Cramps"
        ]
    }
]

module.exports = myObjects;
