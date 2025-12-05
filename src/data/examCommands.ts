export type CommandCategory = 
  | 'directions'
  | 'parking'
  | 'highway'
  | 'maneuvers'
  | 'emergency'
  | 'technical'
  | 'observations'
  | 'traffic_signs';

export interface ExamCommand {
  id: string;
  german: string;
  english: string;
  category: CommandCategory;
  tip?: string;
  importance: 'critical' | 'high' | 'medium';
}

export interface TechnicalQuestion {
  id: string;
  german: string;
  english: string;
  answer: string;
  category: 'lights' | 'fluids' | 'tires' | 'dashboard' | 'safety' | 'documents';
}

export const categoryInfo: Record<CommandCategory, { name: string; icon: string; description: string }> = {
  directions: {
    name: 'Richtungsanweisungen',
    icon: '🧭',
    description: 'Direction commands for navigation'
  },
  parking: {
    name: 'Parken',
    icon: '🅿️',
    description: 'Parking maneuvers and stopping'
  },
  highway: {
    name: 'Autobahn',
    icon: '🛣️',
    description: 'Highway driving instructions'
  },
  maneuvers: {
    name: 'Fahrmanöver',
    icon: '🔄',
    description: 'Driving maneuvers and lane changes'
  },
  emergency: {
    name: 'Notfall',
    icon: '🚨',
    description: 'Emergency situations and braking'
  },
  technical: {
    name: 'Technik',
    icon: '🔧',
    description: 'Technical vehicle checks'
  },
  observations: {
    name: 'Beobachtungen',
    icon: '👀',
    description: 'Observation and awareness'
  },
  traffic_signs: {
    name: 'Verkehrszeichen',
    icon: '🚦',
    description: 'Traffic signs and signals'
  }
};

export const examCommands: ExamCommand[] = [
  // DIRECTIONS
  {
    id: 'dir-1',
    german: 'Fahren Sie bitte links.',
    english: 'Please drive left / Turn left.',
    category: 'directions',
    tip: 'Check mirrors → Signal → Shoulder check → Turn',
    importance: 'critical'
  },
  {
    id: 'dir-2',
    german: 'Fahren Sie bitte rechts.',
    english: 'Please drive right / Turn right.',
    category: 'directions',
    tip: 'Check mirrors → Signal → Shoulder check → Turn',
    importance: 'critical'
  },
  {
    id: 'dir-3',
    german: 'Fahren Sie geradeaus.',
    english: 'Drive straight ahead.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-4',
    german: 'An der nächsten Kreuzung links abbiegen.',
    english: 'Turn left at the next intersection.',
    category: 'directions',
    tip: 'Start signaling early, at least 30m before the turn',
    importance: 'critical'
  },
  {
    id: 'dir-5',
    german: 'An der nächsten Kreuzung rechts abbiegen.',
    english: 'Turn right at the next intersection.',
    category: 'directions',
    tip: 'Watch for cyclists in the bike lane!',
    importance: 'critical'
  },
  {
    id: 'dir-6',
    german: 'An der Ampel links.',
    english: 'Left at the traffic light.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-7',
    german: 'An der Ampel rechts.',
    english: 'Right at the traffic light.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-8',
    german: 'Nehmen Sie die erste Straße links.',
    english: 'Take the first street on the left.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-9',
    german: 'Nehmen Sie die zweite Straße rechts.',
    english: 'Take the second street on the right.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-10',
    german: 'Folgen Sie der Straße.',
    english: 'Follow the road.',
    category: 'directions',
    importance: 'medium'
  },
  {
    id: 'dir-11',
    german: 'Biegen Sie hier ab.',
    english: 'Turn here.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-12',
    german: 'Fahren Sie in den Kreisverkehr.',
    english: 'Enter the roundabout.',
    category: 'directions',
    tip: 'Yield to traffic already in the roundabout. Signal when exiting!',
    importance: 'critical'
  },
  {
    id: 'dir-13',
    german: 'Nehmen Sie die dritte Ausfahrt.',
    english: 'Take the third exit.',
    category: 'directions',
    importance: 'high'
  },
  {
    id: 'dir-14',
    german: 'Wenden Sie bitte.',
    english: 'Please make a U-turn.',
    category: 'directions',
    tip: 'Only where permitted! Check for signs prohibiting U-turns.',
    importance: 'high'
  },
  {
    id: 'dir-15',
    german: 'Fahren Sie zurück.',
    english: 'Go back / Reverse.',
    category: 'directions',
    importance: 'medium'
  },

  // PARKING
  {
    id: 'park-1',
    german: 'Halten Sie bitte am Straßenrand an.',
    english: 'Please stop at the roadside.',
    category: 'parking',
    tip: 'Signal → Mirror check → Find safe spot → Stop parallel to curb',
    importance: 'critical'
  },
  {
    id: 'park-2',
    german: 'Parken Sie bitte rückwärts ein.',
    english: 'Please reverse park.',
    category: 'parking',
    tip: 'Use your mirrors and look over your shoulder!',
    importance: 'critical'
  },
  {
    id: 'park-3',
    german: 'Parken Sie bitte seitlich ein.',
    english: 'Please parallel park.',
    category: 'parking',
    tip: 'Pull up alongside the car in front, then reverse in at 45° angle',
    importance: 'critical'
  },
  {
    id: 'park-4',
    german: 'Parken Sie in der Parklücke.',
    english: 'Park in the parking space.',
    category: 'parking',
    importance: 'high'
  },
  {
    id: 'park-5',
    german: 'Fahren Sie an den Bordstein.',
    english: 'Drive to the curb.',
    category: 'parking',
    importance: 'medium'
  },
  {
    id: 'park-6',
    german: 'Halten Sie hier an.',
    english: 'Stop here.',
    category: 'parking',
    importance: 'high'
  },
  {
    id: 'park-7',
    german: 'Parken Sie am Berg.',
    english: 'Park on the hill.',
    category: 'parking',
    tip: 'Turn wheels towards curb when facing downhill, away when facing uphill',
    importance: 'high'
  },
  {
    id: 'park-8',
    german: 'Fahren Sie aus der Parklücke.',
    english: 'Drive out of the parking space.',
    category: 'parking',
    tip: 'Check all around before moving, especially for pedestrians!',
    importance: 'high'
  },
  {
    id: 'park-9',
    german: 'Stoppen Sie bitte.',
    english: 'Please stop.',
    category: 'parking',
    importance: 'critical'
  },
  {
    id: 'park-10',
    german: 'Hier können Sie anhalten.',
    english: 'You can stop here.',
    category: 'parking',
    importance: 'medium'
  },

  // HIGHWAY
  {
    id: 'hw-1',
    german: 'Fahren Sie auf die Autobahn.',
    english: 'Drive onto the highway / Enter the Autobahn.',
    category: 'highway',
    tip: 'Accelerate on the ramp to match highway speed. Check mirrors constantly!',
    importance: 'critical'
  },
  {
    id: 'hw-2',
    german: 'Verlassen Sie die Autobahn.',
    english: 'Exit the highway.',
    category: 'highway',
    tip: 'Signal early, move to right lane, decelerate on the exit ramp',
    importance: 'critical'
  },
  {
    id: 'hw-3',
    german: 'Fahren Sie auf die Schnellstraße.',
    english: 'Drive onto the expressway.',
    category: 'highway',
    importance: 'high'
  },
  {
    id: 'hw-4',
    german: 'Nehmen Sie die nächste Ausfahrt.',
    english: 'Take the next exit.',
    category: 'highway',
    importance: 'high'
  },
  {
    id: 'hw-5',
    german: 'Bleiben Sie auf der rechten Spur.',
    english: 'Stay in the right lane.',
    category: 'highway',
    tip: 'In Germany, you must drive in the right lane unless overtaking',
    importance: 'critical'
  },
  {
    id: 'hw-6',
    german: 'Fahren Sie auf die Überholspur.',
    english: 'Move to the overtaking lane.',
    category: 'highway',
    tip: 'Check mirrors, signal, shoulder check, then change lanes',
    importance: 'high'
  },

  // MANEUVERS
  {
    id: 'man-1',
    german: 'Wechseln Sie bitte die Spur.',
    english: 'Please change lanes.',
    category: 'maneuvers',
    tip: 'Mirror → Signal → Shoulder check → Lane change',
    importance: 'critical'
  },
  {
    id: 'man-2',
    german: 'Überholen Sie das Fahrzeug.',
    english: 'Overtake the vehicle.',
    category: 'maneuvers',
    tip: 'Only overtake on the left in Germany! Check it\'s safe first.',
    importance: 'critical'
  },
  {
    id: 'man-3',
    german: 'Fahren Sie rückwärts.',
    english: 'Drive in reverse.',
    category: 'maneuvers',
    tip: 'Look over your shoulder, not just at mirrors. Drive slowly!',
    importance: 'high'
  },
  {
    id: 'man-4',
    german: 'Machen Sie eine Drei-Punkt-Wende.',
    english: 'Make a three-point turn.',
    category: 'maneuvers',
    tip: 'Check for traffic in both directions before each movement',
    importance: 'high'
  },
  {
    id: 'man-5',
    german: 'Fahren Sie langsamer.',
    english: 'Drive slower.',
    category: 'maneuvers',
    importance: 'high'
  },
  {
    id: 'man-6',
    german: 'Beschleunigen Sie.',
    english: 'Accelerate.',
    category: 'maneuvers',
    importance: 'medium'
  },
  {
    id: 'man-7',
    german: 'Halten Sie den Abstand.',
    english: 'Keep your distance.',
    category: 'maneuvers',
    tip: 'Rule of thumb: Half the speedometer reading in meters (50 km/h = 25m)',
    importance: 'critical'
  },
  {
    id: 'man-8',
    german: 'Fahren Sie in die Einbahnstraße.',
    english: 'Drive into the one-way street.',
    category: 'maneuvers',
    importance: 'medium'
  },

  // EMERGENCY
  {
    id: 'em-1',
    german: 'Machen Sie eine Gefahrbremsung.',
    english: 'Perform an emergency brake.',
    category: 'emergency',
    tip: 'Brake hard and fast while keeping the steering wheel straight!',
    importance: 'critical'
  },
  {
    id: 'em-2',
    german: 'Halten Sie sofort an!',
    english: 'Stop immediately!',
    category: 'emergency',
    importance: 'critical'
  },
  {
    id: 'em-3',
    german: 'Fahren Sie an den Straßenrand und schalten Sie den Motor aus.',
    english: 'Pull over and turn off the engine.',
    category: 'emergency',
    importance: 'high'
  },
  {
    id: 'em-4',
    german: 'Schalten Sie die Warnblinkanlage ein.',
    english: 'Turn on the hazard lights.',
    category: 'emergency',
    tip: 'Use when stopped due to emergency or in traffic jams on highways',
    importance: 'high'
  },
  {
    id: 'em-5',
    german: 'Lassen Sie den Rettungswagen vorbei.',
    english: 'Let the ambulance pass.',
    category: 'emergency',
    tip: 'Pull to the right and stop if necessary. Form a rescue lane on highways!',
    importance: 'critical'
  },

  // OBSERVATIONS
  {
    id: 'obs-1',
    german: 'Schauen Sie in den Rückspiegel.',
    english: 'Look in the rearview mirror.',
    category: 'observations',
    importance: 'critical'
  },
  {
    id: 'obs-2',
    german: 'Machen Sie den Schulterblick.',
    english: 'Do the shoulder check (blind spot check).',
    category: 'observations',
    tip: 'ALWAYS do this before turning, lane changes, and pulling away!',
    importance: 'critical'
  },
  {
    id: 'obs-3',
    german: 'Achten Sie auf die Fußgänger.',
    english: 'Watch out for pedestrians.',
    category: 'observations',
    importance: 'critical'
  },
  {
    id: 'obs-4',
    german: 'Achten Sie auf die Radfahrer.',
    english: 'Watch out for cyclists.',
    category: 'observations',
    tip: 'Always check for cyclists before turning right!',
    importance: 'critical'
  },
  {
    id: 'obs-5',
    german: 'Beachten Sie die Vorfahrt.',
    english: 'Observe the right of way.',
    category: 'observations',
    importance: 'critical'
  },
  {
    id: 'obs-6',
    german: 'Schauen Sie nach links und rechts.',
    english: 'Look left and right.',
    category: 'observations',
    importance: 'high'
  },
  {
    id: 'obs-7',
    german: 'Prüfen Sie den toten Winkel.',
    english: 'Check the blind spot.',
    category: 'observations',
    importance: 'critical'
  },

  // TRAFFIC SIGNS
  {
    id: 'ts-1',
    german: 'Beachten Sie das Stoppschild.',
    english: 'Observe the stop sign.',
    category: 'traffic_signs',
    tip: 'You MUST come to a complete stop, even if no traffic is visible!',
    importance: 'critical'
  },
  {
    id: 'ts-2',
    german: 'Beachten Sie das Vorfahrtschild.',
    english: 'Observe the yield sign.',
    category: 'traffic_signs',
    importance: 'critical'
  },
  {
    id: 'ts-3',
    german: 'Hier gilt Tempo 30.',
    english: 'Speed limit 30 applies here.',
    category: 'traffic_signs',
    importance: 'high'
  },
  {
    id: 'ts-4',
    german: 'Hier ist eine Spielstraße.',
    english: 'This is a residential play street.',
    category: 'traffic_signs',
    tip: 'Walking speed only! Pedestrians have priority here.',
    importance: 'high'
  },
  {
    id: 'ts-5',
    german: 'Beachten Sie das Überholverbot.',
    english: 'Observe the no overtaking sign.',
    category: 'traffic_signs',
    importance: 'high'
  },
  {
    id: 'ts-6',
    german: 'Hier endet die Tempo-30-Zone.',
    english: 'The 30 km/h zone ends here.',
    category: 'traffic_signs',
    importance: 'medium'
  },
  {
    id: 'ts-7',
    german: 'Achtung, Baustelle!',
    english: 'Attention, construction site!',
    category: 'traffic_signs',
    tip: 'Reduce speed and be prepared for lane changes',
    importance: 'high'
  },
  {
    id: 'ts-8',
    german: 'Hier ist ein Fußgängerüberweg.',
    english: 'This is a pedestrian crossing.',
    category: 'traffic_signs',
    tip: 'Pedestrians have right of way. Be prepared to stop!',
    importance: 'critical'
  }
];

export const technicalQuestions: TechnicalQuestion[] = [
  // LIGHTS
  {
    id: 'tech-1',
    german: 'Wie schalten Sie das Abblendlicht ein?',
    english: 'How do you turn on the low beam headlights?',
    answer: 'Turn the light switch to the position with the headlight symbol pointing down. The green indicator light will appear on the dashboard.',
    category: 'lights'
  },
  {
    id: 'tech-2',
    german: 'Wie schalten Sie das Fernlicht ein?',
    english: 'How do you turn on the high beam?',
    answer: 'Push the indicator stalk forward (away from you). The blue indicator light appears on the dashboard. Pull back to switch off or flash.',
    category: 'lights'
  },
  {
    id: 'tech-3',
    german: 'Wie schalten Sie die Nebelschlussleuchte ein?',
    english: 'How do you turn on the rear fog light?',
    answer: 'Turn or pull the light switch with the fog light symbol. Only use when visibility is under 50m. Yellow indicator light appears.',
    category: 'lights'
  },
  {
    id: 'tech-4',
    german: 'Wie schalten Sie die Warnblinkanlage ein?',
    english: 'How do you turn on the hazard warning lights?',
    answer: 'Press the red triangle button on the dashboard. All turn signals will flash simultaneously.',
    category: 'lights'
  },
  {
    id: 'tech-5',
    german: 'Wie bedienen Sie die Blinker?',
    english: 'How do you operate the turn signals?',
    answer: 'Push the indicator stalk up for right turn, down for left turn. It will auto-cancel after the turn.',
    category: 'lights'
  },

  // FLUIDS
  {
    id: 'tech-6',
    german: 'Wie prüfen Sie den Ölstand?',
    english: 'How do you check the oil level?',
    answer: 'Park on flat ground, wait for engine to cool. Pull out dipstick, wipe clean, reinsert fully, pull out again. Oil should be between MIN and MAX marks.',
    category: 'fluids'
  },
  {
    id: 'tech-7',
    german: 'Wie prüfen Sie die Bremsflüssigkeit?',
    english: 'How do you check the brake fluid?',
    answer: 'Locate the brake fluid reservoir (usually has yellow cap with brake symbol). Check that fluid level is between MIN and MAX marks visible on the reservoir.',
    category: 'fluids'
  },
  {
    id: 'tech-8',
    german: 'Wie prüfen Sie das Kühlwasser?',
    english: 'How do you check the coolant level?',
    answer: 'NEVER open when hot! Check the expansion tank when engine is cold. Fluid should be between MIN and MAX marks.',
    category: 'fluids'
  },
  {
    id: 'tech-9',
    german: 'Wo füllen Sie die Scheibenwaschflüssigkeit nach?',
    english: 'Where do you refill the windshield washer fluid?',
    answer: 'Open hood, find reservoir with windshield/water symbol (usually blue cap). Fill with water and washer fluid mix.',
    category: 'fluids'
  },

  // TIRES
  {
    id: 'tech-10',
    german: 'Wie prüfen Sie den Reifendruck?',
    english: 'How do you check tire pressure?',
    answer: 'Use a tire pressure gauge at a gas station. Check when tires are cold. Correct pressure is shown on a sticker inside driver door or in manual.',
    category: 'tires'
  },
  {
    id: 'tech-11',
    german: 'Wie prüfen Sie die Profiltiefe der Reifen?',
    english: 'How do you check tire tread depth?',
    answer: 'Use a tread depth gauge or check wear indicators in tire grooves. Minimum legal depth is 1.6mm, but 3mm is recommended for safety.',
    category: 'tires'
  },
  {
    id: 'tech-12',
    german: 'Was bedeutet das Reifendruckwarnsymbol?',
    english: 'What does the tire pressure warning symbol mean?',
    answer: 'It indicates low tire pressure in one or more tires. Check all tires and inflate to correct pressure as soon as possible.',
    category: 'tires'
  },

  // DASHBOARD
  {
    id: 'tech-13',
    german: 'Was bedeutet die Motorleuchte?',
    english: 'What does the engine warning light mean?',
    answer: 'It indicates an engine management problem. If steady, have it checked soon. If flashing, reduce speed and have it checked immediately.',
    category: 'dashboard'
  },
  {
    id: 'tech-14',
    german: 'Was bedeutet die ABS-Warnleuchte?',
    english: 'What does the ABS warning light mean?',
    answer: 'The Anti-lock Braking System has a fault. Normal brakes still work but ABS assistance is not available. Have it checked soon.',
    category: 'dashboard'
  },
  {
    id: 'tech-15',
    german: 'Was bedeutet die Öldruckwarnleuchte?',
    english: 'What does the oil pressure warning light mean?',
    answer: 'CRITICAL! Stop safely and turn off engine immediately. Do not continue driving. Check oil level. May indicate serious engine problem.',
    category: 'dashboard'
  },
  {
    id: 'tech-16',
    german: 'Was bedeutet die Batteriewarnleuchte?',
    english: 'What does the battery warning light mean?',
    answer: 'The battery is not charging properly. Likely alternator or belt problem. Drive to nearest garage - engine may stop if battery drains.',
    category: 'dashboard'
  },
  {
    id: 'tech-17',
    german: 'Was bedeutet die Temperaturwarnleuchte?',
    english: 'What does the temperature warning light mean?',
    answer: 'Engine is overheating! Stop safely, turn off engine. Do NOT open radiator cap when hot. Wait for engine to cool and check coolant level.',
    category: 'dashboard'
  },
  {
    id: 'tech-18',
    german: 'Was bedeutet die Handbremswarnleuchte?',
    english: 'What does the handbrake warning light mean?',
    answer: 'Either handbrake is engaged, or there is a brake system problem. Check handbrake first. If released but light stays on, check brake fluid.',
    category: 'dashboard'
  },

  // SAFETY
  {
    id: 'tech-19',
    german: 'Wie stellen Sie die Kopfstütze richtig ein?',
    english: 'How do you adjust the headrest correctly?',
    answer: 'The center of the headrest should be level with your ears/eye level. The headrest should be as close to your head as comfortable.',
    category: 'safety'
  },
  {
    id: 'tech-20',
    german: 'Wie stellen Sie die Spiegel richtig ein?',
    english: 'How do you adjust the mirrors correctly?',
    answer: 'Side mirrors: small part of car visible at inner edge, horizon in middle. Rearview: entire rear window visible, centered.',
    category: 'safety'
  },
  {
    id: 'tech-21',
    german: 'Wo ist das Warndreieck?',
    english: 'Where is the warning triangle?',
    answer: 'Usually in the trunk, often attached to trunk lid or under floor mat. Required by law in Germany!',
    category: 'safety'
  },
  {
    id: 'tech-22',
    german: 'Wo ist der Verbandskasten?',
    english: 'Where is the first aid kit?',
    answer: 'Usually in the trunk. Required by law in Germany! Check expiration date regularly.',
    category: 'safety'
  },
  {
    id: 'tech-23',
    german: 'Wo ist die Warnweste?',
    english: 'Where is the safety vest?',
    answer: 'Should be easily accessible in the car (not in trunk). Required by law in Germany! Put on before exiting vehicle in emergency.',
    category: 'safety'
  },
  {
    id: 'tech-24',
    german: 'Wie bedienen Sie die Hupe?',
    english: 'How do you operate the horn?',
    answer: 'Press the center of the steering wheel. Only use to warn of danger, not in frustration!',
    category: 'safety'
  },

  // DOCUMENTS
  {
    id: 'tech-25',
    german: 'Welche Dokumente müssen Sie mitführen?',
    english: 'Which documents must you carry?',
    answer: 'Driver\'s license (Führerschein) and vehicle registration (Fahrzeugschein/Zulassungsbescheinigung Teil I). ID is not required but recommended.',
    category: 'documents'
  }
];

export const berlinSpecificTips = [
  {
    title: 'Tram Tracks',
    german: 'Straßenbahnschienen',
    tip: 'Berlin has many trams. Trams have right of way! Watch for passengers at stops and never overtake a stopped tram on the right.'
  },
  {
    title: 'Bike Lanes',
    german: 'Fahrradwege',
    tip: 'Berlin has extensive bike infrastructure. Always check for cyclists before turning right and when opening car doors.'
  },
  {
    title: 'Bus Lanes',
    german: 'Busspuren',
    tip: 'Do not drive in bus lanes unless turning. Taxis may use them but private cars cannot.'
  },
  {
    title: 'Tempo 30 Zones',
    german: 'Tempo-30-Zonen',
    tip: 'Most residential areas in Berlin are 30 km/h zones. The limit applies until you see the zone end sign.'
  },
  {
    title: 'Right Before Left',
    german: 'Rechts vor Links',
    tip: 'At unmarked intersections without signs, traffic from the right has priority. Very common in Berlin residential areas!'
  },
  {
    title: 'Parking',
    german: 'Parken',
    tip: 'Pay attention to parking signs. Many areas require parking discs (Parkscheibe) or are residents-only parking.'
  }
];

