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
            "A.1 Ask permission",
            "A.2 Swim attire",
            "A.3 Safe swim area",
            "A.4 Lifeguards",
            "A.5 Drowning",
            "A.6 Life jackets",
            "A.7 Rescue breathing",
            "A.8 Backyard pools"
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
            "B.1 Ask permission",
            "B.2 Swim attire",
            "B.3 Safe swim area",
            "B.4 Life jackets",
            "B.5 Reach or throw, don't go",
            "B.6 Hypothermia",
            "B.7 Choking",
            "B.8 Beaches"
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
            "1.1 Building relationships",
            "1.2 The Y's Core Values",
            "1.3 Lifeguards",
            "1.4 Benchmark skills",
            "1.5 Supervision",
            "1.6 Reach or throw, don't go",
            "1.7 Life Jackets",
            "1.8 Safe swim area"
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
            "2.1 Building relationships",
            "2.2 The Y's Core Values",
            "2.3 Find help",
            "2.4 Benchmark skills",
            "2.5 Supervision",
            "2.6 Lifejackets",
            "2.7 Reach or throw, don't go",
            "2.8 Backyard pools"
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
            "3.1 Building relationships",
            "3.2 The Y's Core Values",
            "3.3 Sun safety",
            "3.4 Benchmark skills",
            "3.5 Lifejackets",
            "3.6 Supervision",
            "3.7 Call 911",
            "3.8 Pool drains"
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
            "4.1 Weather",
            "4.2 First aid",
            "4.3 Hypoxic blackout",
            "4.4 Open water",
            "4.5 Goal setting",
            "4.6 Heart rate",
            "4.7 Nutrition ",
            "4.8 Boating"
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
            "5.1 HELP technique",
            "5.2 Shock",
            "5.3 Hypoxic blackout",
            "5.4 Huddle position",
            "5.5 Goal setting",
            "5.6 Abdominal thrusts",
            "5.7 Rest & relaxation",
            "5.8 Water parks"
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
            "6.1 Hypothermia",
            "6.2 Rescue breathing",
            "6.3 Hypoxic blackout",
            "6.4 Benchmark skills",
            "6.5 Goal setting",
            "6.6 CPR",
            "6.7 Physical activity",
            "6.8 Cramps"
        ]
    }
]

module.exports = myObjects;
