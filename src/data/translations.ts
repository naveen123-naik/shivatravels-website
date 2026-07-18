export type Language = 'en' | 'te' | 'hi';

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    fleet: string;
    pricing: string;
    gallery: string;
    testimonials: string;
    faqs: string;
    contact: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bookNow: string;
    callNow: string;
    badge247: string;
    badgeDrivers: string;
    badgeClean: string;
    badgePricing: string;
    badgeTrusted: string;
  };
  fleet: {
    title: string;
    subtitle: string;
    all: string;
    capacity: string;
    seats: string;
    luggage: string;
    ac: string;
    nonAc: string;
    fuel: string;
    perKm: string;
    allowance: string;
    bookNow: string;
  };
  services: {
    title: string;
    subtitle: string;
    airportPickup: string;
    airportPickupDesc: string;
    airportDrop: string;
    airportDropDesc: string;
    outstation: string;
    outstationDesc: string;
    localCity: string;
    localCityDesc: string;
    family: string;
    familyDesc: string;
    wedding: string;
    weddingDesc: string;
    corporate: string;
    corporateDesc: string;
    temple: string;
    templeDesc: string;
    hillStation: string;
    hillStationDesc: string;
    holiday: string;
    holidayDesc: string;
    business: string;
    businessDesc: string;
    schoolCollege: string;
    schoolCollegeDesc: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    distance: string;
    duration: string;
    startingFrom: string;
  };
  estimator: {
    title: string;
    subtitle: string;
    pickup: string;
    dest: string;
    vehicle: string;
    calculate: string;
    distance: string;
    estFare: string;
    estToll: string;
    driverAll: string;
    total: string;
    note: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    drivers: string;
    driversDesc: string;
    gps: string;
    gpsDesc: string;
    sanitized: string;
    sanitizedDesc: string;
    affordable: string;
    affordableDesc: string;
    transparent: string;
    transparentDesc: string;
    noHidden: string;
    noHiddenDesc: string;
    onTime: string;
    onTimeDesc: string;
    support: string;
    supportDesc: string;
    safe: string;
    safeDesc: string;
    instant: string;
    instantDesc: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    avgRating: string;
    totalReviews: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    hoursWeekdays: string;
    hoursWeekends: string;
    formName: string;
    formPhone: string;
    formEmail: string;
    formMsg: string;
    send: string;
    success: string;
  };
  aiRec: {
    title: string;
    subtitle: string;
    budget: string;
    days: string;
    passengers: string;
    getRec: string;
    resultTitle: string;
    suggestedVehicle: string;
    itinerary: string;
    costEst: string;
  };
}

export const translations: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      fleet: 'Fleet',
      pricing: 'Pricing',
      gallery: 'Gallery',
      testimonials: 'Reviews',
      faqs: 'FAQs',
      contact: 'Contact',
      admin: 'Admin',
    },
    hero: {
      title: 'Travel Comfortably. Travel Safely. Travel with Shiva Naik Travels.',
      subtitle: 'We provide reliable car rentals, airport transfers, family tours, and customized travel solutions at affordable prices.',
      bookNow: 'Book Now',
      callNow: 'Call Now',
      badge247: '24/7 Service',
      badgeDrivers: 'Professional Drivers',
      badgeClean: 'Safe & Clean Vehicles',
      badgePricing: 'Affordable Pricing',
      badgeTrusted: 'Trusted by Hundreds',
    },
    fleet: {
      title: 'Our Premium Fleet',
      subtitle: 'Choose from our range of meticulously maintained cars and coaches for the ultimate travel comfort.',
      all: 'All Vehicles',
      capacity: 'Capacity',
      seats: 'Seats',
      luggage: 'Luggage',
      ac: 'Air Conditioned',
      nonAc: 'Non-AC Available',
      fuel: 'Fuel Type',
      perKm: 'Price per KM',
      allowance: 'Driver Allowance',
      bookNow: 'Book Now',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Professional transport solutions customized for every journey.',
      airportPickup: 'Airport Pickup',
      airportPickupDesc: 'Timely and convenient pickups from Rajiv Gandhi International Airport (RGIA) and others.',
      airportDrop: 'Airport Drop',
      airportDropDesc: 'Never miss a flight. Rely on our punctual drop-off service with premium comfort.',
      outstation: 'Outstation Trips',
      outstationDesc: 'Explore new destinations with ease. Safe and comfortable long-distance travel.',
      localCity: 'Local City Tours',
      localCityDesc: 'Discover the best sights in the city with custom routes guided by our expert drivers.',
      family: 'Family Trips',
      familyDesc: 'Spacious vehicles and relaxing rides for memorable family holidays and get-togethers.',
      wedding: 'Wedding Travel',
      weddingDesc: 'Arrive in style on your special day. Premium fleet options for guests and the bridal couple.',
      corporate: 'Corporate Travel',
      corporateDesc: 'Professional executive travel services for business meetings, events, and airport transfers.',
      temple: 'Temple Tours',
      templeDesc: 'Holy pilgrimage trips to Tirupati, Srisailam, Yadadri, and other sacred destinations.',
      hillStation: 'Hill Station Packages',
      hillStationDesc: 'Cool escapes to Ooty, Araku, Lambasingi with vehicles equipped for mountain roads.',
      holiday: 'Holiday Packages',
      holidayDesc: 'All-inclusive travel arrangements for vacations, weekends, and seasonal breaks.',
      business: 'Business Travel',
      businessDesc: 'Reliable, on-time, and smooth rides designed to match busy professional schedules.',
      schoolCollege: 'School & College Trips',
      schoolCollegeDesc: 'Safe, reliable, and large capacity mini buses for student tours and group travels.',
    },
    destinations: {
      title: 'Popular Destinations',
      subtitle: 'Plan your next trip to our most frequently visited and beautiful travel hotspots.',
      distance: 'Distance',
      duration: 'Est. Time',
      startingFrom: 'Starting Fare',
    },
    estimator: {
      title: 'Fare Estimator',
      subtitle: 'Get an instant, transparent estimate of your travel expenses with no hidden costs.',
      pickup: 'Pickup City',
      dest: 'Destination City',
      vehicle: 'Vehicle Type',
      calculate: 'Estimate Fare',
      distance: 'Estimated Distance',
      estFare: 'Base Fare',
      estToll: 'Estimated Toll & State Tax',
      driverAll: 'Driver Allowance',
      total: 'Estimated Total',
      note: 'Note: Tolls, parking fees, and state entry permits are approximate. Actual costs may vary depending on routes.',
    },
    whyUs: {
      title: 'Why Choose Shiva Naik Travels',
      subtitle: 'We set the highest benchmarks in quality, safety, and reliability to ensure your peace of mind.',
      drivers: 'Professional Drivers',
      driversDesc: 'Experienced, polite, background-verified, and well-trained drivers.',
      gps: 'GPS Enabled',
      gpsDesc: 'All vehicles are equipped with real-time GPS tracking for absolute safety.',
      sanitized: 'Sanitized Cars',
      sanitizedDesc: 'Vehicles thoroughly cleaned and sanitized before every single dispatch.',
      affordable: 'Affordable Rates',
      affordableDesc: 'Highly competitive and budget-friendly tariffs tailored for you.',
      transparent: 'Transparent Pricing',
      transparentDesc: 'Clear, itemized billing statements. No surprises.',
      noHidden: 'No Hidden Charges',
      noHiddenDesc: 'What we quote is what you pay. Absolutely no hidden fees.',
      onTime: 'On-Time Pickups',
      onTimeDesc: 'Punctuality is our guarantee. We arrive before your scheduled time.',
      support: '24/7 Support',
      supportDesc: 'Dedicated customer helpline active round the clock for emergencies.',
      safe: 'Safe & Secure Travel',
      safeDesc: 'Adherence to all safety guidelines for single and group travelers.',
      instant: 'Instant Confirmation',
      instantDesc: 'Quick online processing with direct updates to your mobile phone.',
    },
    reviews: {
      title: 'Customer Testimonials',
      subtitle: 'Read authentic experiences shared by travelers who trust Shiva Naik Travels.',
      avgRating: 'Average Rating',
      totalReviews: 'Verified Reviews',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers to clarify booking processes, terms, and transport conditions.',
    },
    contact: {
      title: 'Contact Our Team',
      subtitle: 'Get in touch with our travel desk for support, reservations, or custom package queries.',
      address: 'Office Address',
      phone: 'Phone Number',
      email: 'Email Address',
      hours: 'Business Hours',
      hoursWeekdays: 'Mon - Sat: 8:00 AM - 10:00 PM',
      hoursWeekends: 'Sunday: 24 Hours Active helpline',
      formName: 'Name',
      formPhone: 'Phone Number',
      formEmail: 'Email Address',
      formMsg: 'Your Message',
      send: 'Send Message',
      success: 'Thank you! Your message has been sent successfully.',
    },
    aiRec: {
      title: 'AI Travel Companion',
      subtitle: 'Get instantly recommended custom trip plans based on your travel goals.',
      budget: 'Your Budget (₹)',
      days: 'Trip Duration (Days)',
      passengers: 'Passengers',
      getRec: 'Generate Plan',
      resultTitle: 'AI Suggested Itinerary',
      suggestedVehicle: 'Recommended Fleet Choice',
      itinerary: 'Recommended Itinerary',
      costEst: 'Calculated Cost Estimate',
    },
  },
  te: {
    nav: {
      home: 'హోమ్',
      about: 'మా గురించి',
      services: 'సేవలు',
      fleet: 'వాహన శ్రేణి',
      pricing: 'ధరలు',
      gallery: 'గ్యాలరీ',
      testimonials: 'సమీక్షలు',
      faqs: 'ప్రశ్నలు',
      contact: 'సంప్రదించండి',
      admin: 'అడ్మిన్',
    },
    hero: {
      title: 'సుఖవంతమైన ప్రయాణం. సురక్షిత ప్రయాణం. శివ నాయక్ ట్రావెల్స్‌తో ప్రయాణం.',
      subtitle: 'మేము నమ్మకమైన కార్ రెంటల్స్, ఎయిర్‌పోర్ట్ బదిలీలు, ఫ్యామిలీ టూర్స్ మరియు అనుకూలీకరించిన ప్రయాణ పరిష్కారాలను సరసమైన ధరలలో అందిస్తాము.',
      bookNow: 'ఇప్పుడే బుక్ చేయండి',
      callNow: 'కాల్ చేయండి',
      badge247: '24/7 సేవలు',
      badgeDrivers: 'ప్రొఫెషనల్ డ్రైవర్లు',
      badgeClean: 'సురక్షితమైన & శుభ్రమైన వాహనాలు',
      badgePricing: 'అందుబాటు ధరలు',
      badgeTrusted: 'వందలాది మంది నమ్మకం',
    },
    fleet: {
      title: 'మా వాహన శ్రేణి',
      subtitle: 'అత్యుత్తమ ప్రయాణ సౌకర్యం కోసం మా వద్ద ఉన్న అద్భుతమైన కార్లు మరియు కోచ్‌ల నుండి ఎంచుకోండి.',
      all: 'అన్ని వాహనాలు',
      capacity: 'సామర్థ్యం',
      seats: 'సీట్లు',
      luggage: 'లగేజ్',
      ac: 'ఏసీ అందుబాటులో ఉంది',
      nonAc: 'నాన్-ఏసీ అందుబాటులో ఉంది',
      fuel: 'ఇంధన రకం',
      perKm: 'కిలోమీటరుకు ధర',
      allowance: 'డ్రైవర్ భత్యం',
      bookNow: 'ఇప్పుడే బుక్ చేయండి',
    },
    services: {
      title: 'మా సేవలు',
      subtitle: 'ప్రతి ప్రయాణానికి అనుగుణంగా ప్రొఫెషనల్ రవాణా పరిష్కారాలు.',
      airportPickup: 'ఎయిర్‌పోర్ట్ పికప్',
      airportPickupDesc: 'రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయం (RGIA) నుండి సరైన సమయానికి పికప్.',
      airportDrop: 'ఎయిర్‌పోర్ట్ డ్రాప్',
      airportDropDesc: 'ఫ్లైట్ మిస్ కాకుండా ఉండండి. ప్రీమియం సౌకర్యాలతో మా సమయపాలన రవాణాను నమ్మండి.',
      outstation: 'అవుట్‌స్టేషన్ ట్రిప్స్',
      outstationDesc: 'ఇతర నగరాలకు సులభంగా ప్రయాణించండి. సురక్షితమైన మరియు సౌకర్యవంతమైన ప్రయాణం.',
      localCity: 'స్థానిక నగర పర్యటనలు',
      localCityDesc: 'మా నిపుణులైన డ్రైవర్లతో నగరంలోని ఉత్తమ ప్రదేశాలను దర్శించండి.',
      family: 'ఫ్యామిలీ ట్రిప్స్',
      familyDesc: 'కుటుంబ సెలవులు మరియు సమావేశాల కోసం విశాలమైన వాహనాలు మరియు ప్రశాంతమైన ప్రయాణం.',
      wedding: 'పెళ్లిళ్ల ప్రయాణాలు',
      weddingDesc: 'మీ ప్రత్యేక రోజున శైలితో చేరుకోండి. అతిథులు మరియు వధూవరుల కోసం ప్రీమియం కార్లు.',
      corporate: 'కార్పొరేట్ రవాణా',
      corporateDesc: 'వ్యాపార సమావేశాలు, ఈవెంట్లు మరియు ఎయిర్‌పోర్ట్ ప్రయాణాల కోసం ప్రొఫెషనల్ సేవలు.',
      temple: 'దేవాలయ పర్యటనలు',
      templeDesc: 'తిరుపతి, శ్రీశైలం, యాదాద్రి మరియు ఇతర పవిత్ర క్షేత్రాలకు పుణ్యయాత్రలు.',
      hillStation: 'హిల్ స్టేషన్ ప్యాకేజీలు',
      hillStationDesc: 'ఊటీ, అరకు, లంబసింగి కొండ ప్రాంతాల కోసం అనువైన వాహనాలు.',
      holiday: 'హాలిడే ప్యాకేజీలు',
      holidayDesc: 'సెలవులు, వారాంతపు విరామాల కోసం అన్నీ కలిపిన ప్రయాణ ఏర్పాట్లు.',
      business: 'వ్యాపార ప్రయాణాలు',
      businessDesc: 'బిజీగా ఉండే వ్యాపారవేత్తల సమయానికి తగినట్లుగా నమ్మకమైన మరియు సురక్షితమైన ప్రయాణం.',
      schoolCollege: 'పాఠశాల & కళాశాల ట్రిప్స్',
      schoolCollegeDesc: 'విద్యార్థుల టూర్లు మరియు సమూహ ప్రయాణాల కోసం సురక్షితమైన మరియు పెద్ద మినీ బస్సులు.',
    },
    destinations: {
      title: 'ప్రసిద్ధ గమ్యస్థానాలు',
      subtitle: 'అత్యధికంగా సందర్శించే అందమైన ప్రదేశాలకు మీ తదుపరి పర్యటనను ప్లాన్ చేయండి.',
      distance: 'దూరం',
      duration: 'సమయం',
      startingFrom: 'ప్రారంభ ధర',
    },
    estimator: {
      title: 'ధరల అంచనాదారు (ఫేర్ ఎస్టిమేటర్)',
      subtitle: 'ఎలాంటి దాచిన ఖర్చులు లేకుండా మీ ప్రయాణ ఖర్చుల తక్షణ అంచనాను పొందండి.',
      pickup: 'ప్రారంభ నగరం',
      dest: 'గమ్యస్థాన నగరం',
      vehicle: 'వాహనం రకం',
      calculate: 'ధరను లెక్కించండి',
      distance: 'అంచనా దూరం',
      estFare: 'బేస్ ధర',
      estToll: 'టోల్ & స్టేట్ టాక్స్',
      driverAll: 'డ్రైవర్ భత్యం',
      total: 'మొత్తం అంచనా ధర',
      note: 'గమనిక: టోల్స్ మరియు పార్కింగ్ ఫీజులు సుమారుగా లెక్కించబడ్డాయి. అసలు ధర మారవచ్చు.',
    },
    whyUs: {
      title: 'ఎందుకు శివ నాయక్ ట్రావెల్స్?',
      subtitle: 'మీ ప్రయాణాన్ని నిశ్చింతగా ఉంచడానికి మేము నాణ్యత, భద్రత మరియు విశ్వసనీయతకు ప్రాధాన్యత ఇస్తాము.',
      drivers: 'ప్రొఫెషనల్ డ్రైవర్లు',
      driversDesc: 'అనుభవం ఉన్న, మర్యాదపూర్వకమైన మరియు ధృవీకరించబడిన డ్రైవర్లు.',
      gps: 'GPS సదుపాయం',
      gpsDesc: 'ఖచ్చితమైన భద్రత కోసం అన్ని వాహనాలలో రియల్ టైమ్ జీపీఎస్ ట్రాకింగ్.',
      sanitized: 'శుభ్రమైన కార్లు',
      sanitizedDesc: 'ప్రతి ట్రిప్‌కు ముందు వాహనాలు పూర్తిగా శుభ్రం చేయబడతాయి.',
      affordable: 'సరసమైన ధరలు',
      affordableDesc: 'మీ బడ్జెట్‌కు సరిపోయే విధంగా పోటీ ధరలు మరియు అనుకూలమైన టారిఫ్‌లు.',
      transparent: 'పారదర్శక ధరలు',
      transparentDesc: 'ఎలాంటి అస్పష్టత లేని బిల్లింగ్ విధానం.',
      noHidden: 'దాచిన ఖర్చులు లేవు',
      noHiddenDesc: 'కోట్ చేసిన ధరకే ప్రయాణం. అదనపు రుసుములు ఏవీ ఉండవు.',
      onTime: 'సరైన సమయానికి పికప్',
      onTimeDesc: 'సమయపాలన మా గ్యారంటీ. నిర్ణీత సమయానికంటే ముందే చేరుకుంటాము.',
      support: '24/7 కస్టమర్ సపోర్ట్',
      supportDesc: 'అవసరాల కోసం రౌండ్-ది-క్లాక్ హెల్ప్‌లైన్ సేవలు అందుబాటులో ఉంటాయి.',
      safe: 'సురక్షిత ప్రయాణం',
      safeDesc: 'సింగిల్ మరియు గ్రూప్ ప్రయాణీకుల భద్రతా మార్గదర్శకాల అమలు.',
      instant: 'తక్షణ నిర్ధారణ',
      instantDesc: 'మీ మొబైల్ ఫోన్‌కు డైరెక్ట్ అప్‌డేట్‌లతో వేగవంతమైన ప్రాసెసింగ్.',
    },
    reviews: {
      title: 'కస్టమర్ అభిప్రాయాలు',
      subtitle: 'శివ నాయక్ ట్రావెల్స్‌ను విశ్వసించే ప్రయాణీకులు పంచుకున్న నిజమైన సమీక్షలు.',
      avgRating: 'సగటు రేటింగ్',
      totalReviews: 'ధృవీకరించబడిన సమీక్షలు',
    },
    faq: {
      title: 'తరచుగా అడిగే ప్రశ్నలు',
      subtitle: 'బుకింగ్ ప్రక్రియ, నిబంధనలు మరియు వాహన పరిస్థితులపై శీఘ్ర సమాధానాలు.',
    },
    contact: {
      title: 'మా బృందాన్ని సంప్రదించండి',
      subtitle: 'బుకింగ్‌లు లేదా అనుకూల ప్యాకేజీల కోసం మా ట్రావెల్ డెస్క్‌ని సంప్రదించండి.',
      address: 'కార్యాలయ చిరునామా',
      phone: 'ఫోన్ నంబర్',
      email: 'ఈమెయిల్ చిరునామా',
      hours: 'పని వేళలు',
      hoursWeekdays: 'సోమ - శని: ఉదయం 8:00 నుండి రాత్రి 10:00 వరకు',
      hoursWeekends: 'ఆదివారం: 24 గంటల అత్యవసర హెల్ప్‌లైన్',
      formName: 'పేరు',
      formPhone: 'ఫోన్ నంబర్',
      formEmail: 'ఈమెయిల్ చిరునామా',
      formMsg: 'మీ సందేశం',
      send: 'సందేశం పంపండి',
      success: 'ధన్యవాదాలు! మీ సందేశం విజయవంతంగా పంపబడింది.',
    },
    aiRec: {
      title: 'AI ట్రావెల్ కంపానియన్',
      subtitle: 'మీ ప్రయాణ లక్ష్యాల ఆధారంగా తక్షణమే అనుకూల ప్లాన్లను పొందండి.',
      budget: 'మీ బడ్జెట్ (₹)',
      days: 'ప్రయాణ రోజులు',
      passengers: 'ప్రయాణీకులు',
      getRec: 'ప్లాన్ జనరేట్ చేయి',
      resultTitle: 'AI సూచించిన టూర్ ప్లాన్',
      suggestedVehicle: 'సిఫార్సు చేయబడిన వాహనం',
      itinerary: 'టూర్ వివరాలు',
      costEst: 'అంచనా వేయబడిన ఖర్చు',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      fleet: 'वाहनों का बेड़ा',
      pricing: 'किराया',
      gallery: 'गैलरी',
      testimonials: 'समीक्षाएं',
      faqs: 'अक्सर पूछे जाने वाले प्रश्न',
      contact: 'संपर्क करें',
      admin: 'एडमिन',
    },
    hero: {
      title: 'आराम से यात्रा करें। सुरक्षित यात्रा करें। शिव नायक ट्रैवल्स के साथ यात्रा करें।',
      subtitle: 'हम सस्ती कीमतों पर विश्वसनीय कार किराए पर लेने की सेवाएं, हवाई अड्डे के ट्रांसफर, पारिवारिक दौरे और अनुकूलित यात्रा समाधान प्रदान करते हैं।',
      bookNow: 'अभी बुक करें',
      callNow: 'कॉल करें',
      badge247: '24/7 सेवा',
      badgeDrivers: 'पेशेवर ड्राइवर',
      badgeClean: 'सुरक्षित और स्वच्छ वाहन',
      badgePricing: 'किफायती किराया',
      badgeTrusted: 'सैकड़ों ग्राहकों का विश्वास',
    },
    fleet: {
      title: 'हमारा प्रीमियम बेड़ा',
      subtitle: 'परम यात्रा आराम के लिए हमारी सावधानीपूर्वक रखरखाव की गई कारों और बसों की श्रृंखला से चुनें।',
      all: 'सभी वाहन',
      capacity: 'क्षमता',
      seats: 'सीटें',
      luggage: 'सामान (लगेज)',
      ac: 'एसी उपलब्ध',
      nonAc: 'नॉन-एसी उपलब्ध',
      fuel: 'ईंधन प्रकार',
      perKm: 'किमी प्रति दर',
      allowance: 'चालक भत्ता',
      bookNow: 'अभी बुक करें',
    },
    services: {
      title: 'हमारी सेवाएं',
      subtitle: 'हर यात्रा के लिए अनुकूलित पेशेवर परिवहन समाधान।',
      airportPickup: 'एयरपोर्ट पिकअप',
      airportPickupDesc: 'राजीव गांधी अंतर्राष्ट्रीय हवाई अड्डे (RGIA) और अन्य से समय पर और सुविधाजनक पिकअप।',
      airportDrop: 'एयरपोर्ट ड्रॉप',
      airportDropDesc: 'कभी भी फ्लाइट मिस न करें। प्रीमियम आराम के साथ हमारी समय पर ड्रॉप-ऑफ सेवा पर भरोसा करें।',
      outstation: 'बाहरी यात्रा (आउटस्टेशन)',
      outstationDesc: 'आसानी से नए गंतव्यों का भ्रमण करें। सुरक्षित और आरामदायक लंबी दूरी की यात्रा।',
      localCity: 'स्थानीय शहर पर्यटन',
      localCityDesc: 'हमारे विशेषज्ञ ड्राइवरों द्वारा निर्देशित कस्टम मार्गों के साथ शहर के बेहतरीन दृश्यों को देखें।',
      family: 'पारिवारिक यात्राएं',
      familyDesc: 'यादगार पारिवारिक छुट्टियों और गेट-टुगेदर के लिए विशाल वाहन और आरामदायक सवारी।',
      wedding: 'शादी के लिए यात्रा',
      weddingDesc: 'अपने विशेष दिन पर स्टाइल के साथ पहुंचें। मेहमानों और दूल्हा-दुल्हन के लिए प्रीमियम बेड़े के विकल्प।',
      corporate: 'कॉर्पोरेट यात्रा',
      corporateDesc: 'बिजनेस मीटिंग्स, इवेंट्स और एयरपोर्ट ट्रांसफर के लिए पेशेवर कार्यकारी यात्रा सेवाएं।',
      temple: 'तीर्थ यात्रा (मंदिर दर्शन)',
      templeDesc: 'तिरुपति, श्रीशैलम, यादद्री और अन्य पवित्र स्थलों के लिए पवित्र तीर्थ यात्राएं।',
      hillStation: 'हिल स्टेशन पैकेज',
      hillStationDesc: 'पहाड़ी सड़कों के लिए उपयुक्त वाहनों के साथ ऊटी, अराकू, लांबासिंगी के लिए ठंडी हवा की सैर।',
      holiday: 'छुट्टी पैकेज (हॉलिडे)',
      holidayDesc: 'सैलानियों, सप्ताहांत और मौसमी छुट्टियों के लिए सभी समावेशी यात्रा व्यवस्था।',
      business: 'व्यापार यात्रा (बिजनेस)',
      businessDesc: 'व्यस्त व्यावसायिक कार्यक्रमों से मेल खाने के लिए डिज़ाइन की गई विश्वसनीय और समय पर सवारी।',
      schoolCollege: 'स्कूल और कॉलेज की यात्राएं',
      schoolCollegeDesc: 'छात्र दौरों और समूह यात्राओं के लिए सुरक्षित, विश्वसनीय और बड़ी क्षमता वाली मिनी बसें।',
    },
    destinations: {
      title: 'लोकप्रिय गंतव्य',
      subtitle: 'हमारे सबसे पसंदीदा और सुंदर यात्रा स्थलों के लिए अपनी अगली यात्रा की योजना बनाएं।',
      distance: 'दूरी',
      duration: 'अनुमानित समय',
      startingFrom: 'प्रारंभिक किराया',
    },
    estimator: {
      title: 'किराया अंपायर (फेयर एस्टीमेटर)',
      subtitle: 'बिना किसी छिपे हुए खर्च के अपनी यात्रा के खर्चों का त्वरित और पारदर्शी अनुमान प्राप्त करें।',
      pickup: 'पिकअप शहर',
      dest: 'गंतव्य शहर',
      vehicle: 'वाहन का प्रकार',
      calculate: 'किराए का अनुमान लगाएं',
      distance: 'अनुमानित दूरी',
      estFare: 'मूल किराया',
      estToll: 'अनुमानित टोल और राज्य कर',
      driverAll: 'चालक भत्ता',
      total: 'अनुमानित कुल',
      note: 'नोट: टोल, पार्किंग शुल्क और राज्य प्रवेश कर अनुमानित हैं। वास्तविक लागत मार्गों के आधार पर भिन्न हो सकती है।',
    },
    whyUs: {
      title: 'शिव नायक ट्रैवल्स क्यों चुनें?',
      subtitle: 'हम आपकी मानसिक शांति सुनिश्चित करने के लिए गुणवत्ता, सुरक्षा और विश्वसनीयता में उच्चतम मानकों को स्थापित करते हैं।',
      drivers: 'पेशेवर चालक',
      driversDesc: 'अनुभवी, विनम्र, पृष्ठभूमि-सत्यापित और अच्छी तरह से प्रशिक्षित चालक।',
      gps: 'जीपीएस सक्षम बेड़ा',
      gpsDesc: 'पूर्ण सुरक्षा के लिए सभी वाहन रीयल-टाइम जीपीएस ट्रैकिंग से लैस हैं।',
      sanitized: 'सैनिटाइज्ड कारें',
      sanitizedDesc: 'प्रत्येक सवारी से पहले वाहनों को अच्छी तरह से साफ और सैनिटाइज किया जाता है।',
      affordable: 'किफायती दरें',
      affordableDesc: 'आपके लिए तैयार किए गए अत्यधिक प्रतिस्पर्धी और बजट-अनुकूल टैरिफ।',
      transparent: 'पारदर्शी मूल्य निर्धारण',
      transparentDesc: 'स्पष्ट, मद-वार बिलिंग विवरण। कोई आश्चर्य या छिपे शुल्क नहीं।',
      noHidden: 'कोई छिपा हुआ शुल्क नहीं',
      noHiddenDesc: 'हम जो कोट करते हैं वही आप भुगतान करते हैं। कोई अतिरिक्त शुल्क नहीं।',
      onTime: 'समय पर पिकअप',
      onTimeDesc: 'समयपालन हमारी गारंटी है। हम आपके निर्धारित समय से पहले पहुंचते हैं।',
      support: '24/7 ग्राहक सहायता',
      supportDesc: 'आपातकालीन स्थितियों के लिए चौबीसों घंटे सक्रिय समर्पित ग्राहक हेल्पलाइन।',
      safe: 'सुरक्षित और विश्वसनीय यात्रा',
      safeDesc: 'एकल और समूह यात्रियों के लिए सभी सुरक्षा दिशानिर्देशों का कड़ाई से पालन।',
      instant: 'त्वरित पुष्टि',
      instantDesc: 'आपके मोबाइल फोन पर सीधे अपडेट के साथ तेज ऑनलाइन प्रोसेसिंग।',
    },
    reviews: {
      title: 'ग्राहकों के अनुभव',
      subtitle: 'शिव नायक ट्रैवल्स पर भरोसा करने वाले यात्रियों द्वारा साझा किए गए प्रामाणिक अनुभव पढ़ें।',
      avgRating: 'औसत रेटिंग',
      totalReviews: 'सत्यापित समीक्षाएं',
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले प्रश्न',
      subtitle: 'बुकिंग प्रक्रियाओं, शर्तों और वाहन नियमों को स्पष्ट करने के लिए त्वरित उत्तर।',
    },
    contact: {
      title: 'हमारी टीम से संपर्क करें',
      subtitle: 'आरक्षण, समर्थन या कस्टम पैकेज पूछताछ के लिए हमारे ट्रैवल डेस्क से संपर्क करें।',
      address: 'कार्यालय का पता',
      phone: 'फ़ोन नंबर',
      email: 'ईमेल पता',
      hours: 'व्यवसाय के घंटे',
      hoursWeekdays: 'सोम - शनि: सुबह 8:00 से रात 10:00 बजे तक',
      hoursWeekends: 'रविवार: 24 घंटे आपातकालीन हेल्पलाइन',
      formName: 'नाम',
      formPhone: 'फ़ोन नंबर',
      formEmail: 'ईमेल पता',
      formMsg: 'आपका संदेश',
      send: 'संदेश भेजें',
      success: 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।',
    },
    aiRec: {
      title: 'एआई ट्रैवल गाइड',
      subtitle: 'अपने यात्रा लक्ष्यों के आधार पर तुरंत अनुकूल टूर प्लान प्राप्त करें।',
      budget: 'आपका बजट (₹)',
      days: 'यात्रा अवधि (दिन)',
      passengers: 'यात्री',
      getRec: 'योजना बनाएं',
      resultTitle: 'एआई द्वारा सुझाया गया टूर प्लान',
      suggestedVehicle: 'अनुशंसित वाहन',
      itinerary: 'यात्रा कार्यक्रम',
      costEst: 'अनुमानित लागत',
    },
  },
};
