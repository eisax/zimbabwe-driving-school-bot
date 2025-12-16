/**
 * Sample test data for Zimbabwe driving school tests
 * 25 tests with 25 questions each
 */

const Question = require('../src/domain/entities/Question');
const Test = require('../src/domain/entities/Test');

const createTestData = () => {
  const tests = [];

  // Helper function to create a test
  const createTest = (testId, title, questions) => {
    const test = new Test(testId, title, `Driving Theory Test ${testId}`);
    questions.forEach((q) => {
      const question = new Question(
        q.id,
        q.text,
        q.options,
        q.correct,
        q.imageUrl || null
      );
      test.addQuestion(question);
    });
    return test;
  };

  // Test 1: General Road Rules
  tests.push(
    createTest('1', 'Test 1: General Road Rules', [
      {
        id: '1-1',
        text: 'What is the speed limit in residential areas in Zimbabwe?',
        options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
        correct: 0,
      },
      {
        id: '1-2',
        text: 'When should you use your hazard lights?',
        options: [
          'When parked illegally',
          'When stationary and in distress',
          'When turning',
          'When reversing',
        ],
        correct: 1,
      },
      {
        id: '1-3',
        text: 'What does a red traffic light mean?',
        options: ['Slow down', 'Stop', 'Proceed with caution', 'Turn left only'],
        correct: 1,
      },
      {
        id: '1-4',
        text: 'How far should you stay behind another vehicle?',
        options: ['1 car length', '2 seconds stopping distance', '10 meters', '5 meters'],
        correct: 1,
      },
      {
        id: '1-5',
        text: 'When turning at an intersection, who has priority?',
        options: [
          'The vehicle turning right',
          'The vehicle turning left',
          'Whoever reaches first',
          'Vehicles coming straight',
        ],
        correct: 3,
      },
      {
        id: '1-6',
        text: 'What is the maximum speed on a highway?',
        options: ['80 km/h', '100 km/h', '120 km/h', '140 km/h'],
        correct: 2,
      },
      {
        id: '1-7',
        text: 'When is it safe to overtake?',
        options: [
          'Always when you see a gap',
          'When the road ahead is clear',
          'Only on a straight stretch with good visibility',
          'Never on a public road',
        ],
        correct: 2,
      },
      {
        id: '1-8',
        text: 'What should you do if your brakes fail?',
        options: [
          'Pump the brakes',
          'Use handbrake gradually and find a safe place to stop',
          'Swerve to the side',
          'Honk the horn repeatedly',
        ],
        correct: 1,
      },
      {
        id: '1-9',
        text: 'What does a yellow traffic light mean?',
        options: ['Stop', 'Proceed with caution', 'Speed up', 'Turn right'],
        correct: 1,
      },
      {
        id: '1-10',
        text: 'Is it legal to use a mobile phone while driving?',
        options: ['Yes, if it is on speaker', 'Yes, for emergencies only', 'No, it is illegal', 'Only with hands-free'],
        correct: 2,
      },
      {
        id: '1-11',
        text: 'What is the legal blood alcohol limit for drivers in Zimbabwe?',
        options: ['0.08%', '0.05%', '0.02%', '0.00%'],
        correct: 0,
      },
      {
        id: '1-12',
        text: 'When should you wear a seatbelt?',
        options: [
          'Only on highways',
          'Only in built-up areas',
          'Always while driving',
          'Only in bad weather',
        ],
        correct: 2,
      },
      {
        id: '1-13',
        text: 'What should you do at a stop sign?',
        options: [
          'Slow down and proceed if clear',
          'Come to a complete stop, then proceed if safe',
          'Honk and proceed',
          'Flash lights and go',
        ],
        correct: 1,
      },
      {
        id: '1-14',
        text: 'What does a white broken line on the road mean?',
        options: [
          'Do not overtake',
          'You can overtake with care',
          'Stop immediately',
          'Reserved for buses',
        ],
        correct: 1,
      },
      {
        id: '1-15',
        text: 'What should you do if a pedestrian steps into the road?',
        options: ['Honk and keep going', 'Brake immediately', 'Swerve', 'Flash headlights'],
        correct: 1,
      },
      {
        id: '1-16',
        text: 'When should you dip your headlights at night?',
        options: [
          'When an oncoming vehicle approaches',
          'Always',
          'Only in towns',
          'Never',
        ],
        correct: 0,
      },
      {
        id: '1-17',
        text: 'What is the proper way to enter a roundabout?',
        options: [
          'Yield to traffic already on the roundabout',
          'Proceed regardless of traffic',
          'Flash lights to signal',
          'Sound horn loudly',
        ],
        correct: 0,
      },
      {
        id: '1-18',
        text: 'Can you park in a loading zone?',
        options: ['Yes, for 5 minutes', 'Only for loading/unloading', 'Only at night', 'Never'],
        correct: 1,
      },
      {
        id: '1-19',
        text: 'What does an amber/orange traffic light mean?',
        options: ['Go faster', 'Be prepared to stop', 'Stop immediately', 'Turn left'],
        correct: 1,
      },
      {
        id: '1-20',
        text: 'What is the correct tire pressure for safety?',
        options: ['Any pressure that looks full', 'As recommended in the vehicle manual', 'The same for all vehicles', 'As high as possible'],
        correct: 1,
      },
      {
        id: '1-21',
        text: 'When driving in rain, what should you do?',
        options: [
          'Increase speed to prevent aquaplaning',
          'Reduce speed and increase following distance',
          'Maintain normal speed',
          'Use only side lights',
        ],
        correct: 1,
      },
      {
        id: '1-22',
        text: 'What should you do before reversing?',
        options: [
          'Check mirrors and blind spots',
          'Honk the horn',
          'Just reverse quickly',
          'Flash lights',
        ],
        correct: 0,
      },
      {
        id: '1-23',
        text: 'Is it legal to drive with one hand?',
        options: ['Yes, always', 'Yes, with automatic transmission', 'Only when necessary', 'No, both hands required'],
        correct: 2,
      },
      {
        id: '1-24',
        text: 'What should you do if you feel tired while driving?',
        options: [
          'Keep going',
          'Drink coffee',
          'Pull over safely and rest',
          'Turn up the radio volume',
        ],
        correct: 2,
      },
      {
        id: '1-25',
        text: 'What is the purpose of road markings?',
        options: [
          'Decoration only',
          'To guide traffic and maintain order',
          'To slow down traffic',
          'Required by law only',
        ],
        correct: 1,
      },
    ])
  );

  // Test 2: Vehicle Maintenance
  tests.push(
    createTest('2', 'Test 2: Vehicle Maintenance', [
      {
        id: '2-1',
        text: 'How often should you check your tire pressure?',
        options: ['Monthly', 'Every 6 months', 'Once a year', 'Never'],
        correct: 0,
      },
      {
        id: '2-2',
        text: 'What does the oil warning light indicate?',
        options: ['Engine needs servicing', 'Low oil pressure or level', 'Air filter change needed', 'Coolant temperature high'],
        correct: 1,
      },
      {
        id: '2-3',
        text: 'When should brake pads be replaced?',
        options: [
          'When the warning light comes on',
          'When you hear a grinding noise',
          'Both A and B',
          'When the car is 5 years old',
        ],
        correct: 2,
      },
      {
        id: '2-4',
        text: 'What is the minimum tread depth for tires?',
        options: ['1mm', '1.6mm', '2mm', '3mm'],
        correct: 1,
      },
      {
        id: '2-5',
        text: 'How often should you change engine oil?',
        options: [
          'Every 1000 km',
          'Every 5000-10000 km or as per manual',
          'Every 50000 km',
          'Once a year',
        ],
        correct: 1,
      },
      {
        id: '2-6',
        text: 'What does the coolant warning light mean?',
        options: [
          'Change oil soon',
          'Engine is overheating or low coolant',
          'Air filter blocked',
          'Battery is low',
        ],
        correct: 1,
      },
      {
        id: '2-7',
        text: 'When should you check your battery?',
        options: [
          'Only when it fails',
          'Every 6 months',
          'Every month',
          'Never, it lasts lifetime',
        ],
        correct: 1,
      },
      {
        id: '2-8',
        text: 'What is the purpose of the air filter?',
        options: [
          'To cool the engine',
          'To prevent dust entering the engine',
          'To reduce emissions',
          'To increase fuel efficiency only',
        ],
        correct: 1,
      },
      {
        id: '2-9',
        text: 'How do you check your coolant level?',
        options: [
          'When engine is hot',
          'When engine is cold, check overflow bottle',
          'Never, it is automatic',
          'Every time you fill petrol',
        ],
        correct: 1,
      },
      {
        id: '2-10',
        text: 'What should you do if your battery is dead?',
        options: [
          'Replace immediately',
          'Jump start or charge it',
          'Drive to a mechanic',
          'Ignore it',
        ],
        correct: 1,
      },
      {
        id: '2-11',
        text: 'When should windscreen wipers be replaced?',
        options: [
          'When they leave streaks',
          'Every 6 months',
          'Every 1000 km',
          'Never',
        ],
        correct: 0,
      },
      {
        id: '2-12',
        text: 'What is the correct way to store your car long-term?',
        options: [
          'In direct sunlight',
          'On concrete',
          'In a covered area, keep battery charged',
          'Anywhere is fine',
        ],
        correct: 2,
      },
      {
        id: '2-13',
        text: 'How can you identify brake fluid leaks?',
        options: [
          'Check under the car for fluid',
          'Notice soft brake pedal',
          'Both A and B',
          'There is no way',
        ],
        correct: 2,
      },
      {
        id: '2-14',
        text: 'What does the brake warning light indicate?',
        options: [
          'Brake pads are thin',
          'Low brake fluid or brake system fault',
          'Only for manual brakes',
          'No action needed',
        ],
        correct: 1,
      },
      {
        id: '2-15',
        text: 'When should you rotate your tires?',
        options: [
          'Every 10000 km',
          'Every 5000 km or as per manual',
          'Never',
          'Only when punctured',
        ],
        correct: 1,
      },
      {
        id: '2-16',
        text: 'What is the fuel tank capacity usually indicated by?',
        options: ['Dashboard gauge', 'Manual only', 'Mechanic only', 'Never shown'],
        correct: 0,
      },
      {
        id: '2-17',
        text: 'How often should suspension be checked?',
        options: [
          'Every month',
          'Every year or 10000 km',
          'Never',
          'Only when it sounds odd',
        ],
        correct: 1,
      },
      {
        id: '2-18',
        text: 'What does the battery warning light mean?',
        options: [
          'Battery is fully charged',
          'Battery is charging',
          'Charging system is faulty',
          'No problem at all',
        ],
        correct: 2,
      },
      {
        id: '2-19',
        text: 'When should transmission fluid be checked?',
        options: [
          'Daily',
          'As per vehicle manual',
          'Never',
          'Only when shifting is rough',
        ],
        correct: 1,
      },
      {
        id: '2-20',
        text: 'What is proper tire balancing?',
        options: [
          'Checking pressure',
          'Even weight distribution on wheels',
          'Rotating tires',
          'Checking tread',
        ],
        correct: 1,
      },
      {
        id: '2-21',
        text: 'How do you know if your engine needs servicing?',
        options: [
          'Every 6 months or by odometer',
          'When it starts smoking',
          'Never needs servicing',
          'Only after 10 years',
        ],
        correct: 0,
      },
      {
        id: '2-22',
        text: 'What can cause brake fade?',
        options: [
          'Using brakes continuously on long descents',
          'Cold brakes',
          'Wet roads',
          'Hard braking once',
        ],
        correct: 0,
      },
      {
        id: '2-23',
        text: 'When should you replace the spark plugs?',
        options: [
          'Monthly',
          'As per manufacturer manual',
          'Never',
          'Every time you fill fuel',
        ],
        correct: 1,
      },
      {
        id: '2-24',
        text: 'What does a misfire indicate?',
        options: [
          'Engine is fine',
          'Ignition or fuel system fault',
          'Just normal sound',
          'Nothing to worry about',
        ],
        correct: 1,
      },
      {
        id: '2-25',
        text: 'How should you warm up your engine in winter?',
        options: [
          'Rev engine high',
          'Drive at normal speed initially',
          'Let it idle for 30 seconds then drive gently',
          'Never warm it up',
        ],
        correct: 2,
      },
    ])
  );

  // Test 3: Defensive Driving
  tests.push(
    createTest('3', 'Test 3: Defensive Driving', [
      {
        id: '3-1',
        text: 'What is the main principle of defensive driving?',
        options: [
          'Drive as fast as possible',
          'Anticipate danger and be prepared to react',
          'Always use horn',
          'Never give way',
        ],
        correct: 1,
      },
      {
        id: '3-2',
        text: 'How should you handle an aggressive driver?',
        options: [
          'Match their aggression',
          'Stay calm and avoid confrontation',
          'Brake suddenly',
          'Speed up',
        ],
        correct: 1,
      },
      {
        id: '3-3',
        text: 'What should you do if you are being tailgated?',
        options: [
          'Brake suddenly',
          'Speed up',
          'Stay calm and maintain speed, let them pass',
          'Signal aggressively',
        ],
        correct: 2,
      },
      {
        id: '3-4',
        text: 'When driving at night, what additional precautions should you take?',
        options: [
          'Drive faster',
          'Reduce speed and increase following distance',
          'Use high beam always',
          'No special precautions',
        ],
        correct: 1,
      },
      {
        id: '3-5',
        text: 'What is aquaplaning?',
        options: [
          'Driving on wet roads',
          'Loss of tire traction on water',
          'Hydroplaning',
          'Both B and C',
        ],
        correct: 3,
      },
      {
        id: '3-6',
        text: 'How should you handle a blowout?',
        options: [
          'Brake hard',
          'Maintain control, steer straight, gentle braking',
          'Swerve',
          'Accelerate',
        ],
        correct: 1,
      },
      {
        id: '3-7',
        text: 'What does "road rage" mean?',
        options: [
          'Driving carefully',
          'Angry, aggressive driving behavior',
          'Following traffic rules',
          'Being polite to other drivers',
        ],
        correct: 1,
      },
      {
        id: '3-8',
        text: 'When approaching a school zone, you should:',
        options: [
          'Speed up to pass quickly',
          'Slow down and be alert for children',
          'Use horn to warn children',
          'Maintain normal speed',
        ],
        correct: 1,
      },
      {
        id: '3-9',
        text: 'How do you handle a vehicle skid on ice?',
        options: [
          'Brake hard',
          'Steer into the skid and avoid braking',
          'Steer away from skid',
          'Speed up',
        ],
        correct: 1,
      },
      {
        id: '3-10',
        text: 'What should you do if your steering fails?',
        options: [
          'Brake hard',
          'Pump brakes gently, use engine braking, find safe place',
          'Continue driving',
          'Accelerate',
        ],
        correct: 1,
      },
      {
        id: '3-11',
        text: 'How should you position yourself to avoid blind spots?',
        options: [
          'Stay very close to other vehicles',
          'Position your car where driver can see you in mirrors',
          'It does not matter',
          'Always stay behind vehicles',
        ],
        correct: 1,
      },
      {
        id: '3-12',
        text: 'What is the safest seating position for passengers?',
        options: [
          'Anywhere in the vehicle',
          'Middle back seat with seatbelt',
          'Back seat with seatbelt',
          'Any seat with seatbelt',
        ],
        correct: 3,
      },
      {
        id: '3-13',
        text: 'When should you use your horn?',
        options: [
          'To show anger',
          'To warn of danger',
          'As a greeting',
          'Never',
        ],
        correct: 1,
      },
      {
        id: '3-14',
        text: 'How should you react to pedestrians jaywalking?',
        options: [
          'Honk and proceed',
          'Be alert and prepared to stop',
          'Increase speed',
          'Swerve',
        ],
        correct: 1,
      },
      {
        id: '3-15',
        text: 'What should you do if you see a disabled vehicle ahead?',
        options: [
          'Ignore it',
          'Flash lights and honk',
          'Change lane and maintain distance if safe',
          'Drive straight into it',
        ],
        correct: 2,
      },
      {
        id: '3-16',
        text: 'How should you handle hydroplaning?',
        options: [
          'Brake suddenly',
          'Ease off accelerator, steer straight, do not brake',
          'Turn sharply',
          'Speed up',
        ],
        correct: 1,
      },
      {
        id: '3-17',
        text: 'What is the best way to prevent fatigue while driving?',
        options: [
          'Drink energy drinks',
          'Take regular breaks every 2 hours',
          'Drive faster to finish quickly',
          'Listen to loud music',
        ],
        correct: 1,
      },
      {
        id: '3-18',
        text: 'When should you increase following distance?',
        options: [
          'On clear highways',
          'In bad weather, heavy traffic, or towing',
          'Never',
          'Only at night',
        ],
        correct: 1,
      },
      {
        id: '3-19',
        text: 'How should you handle a vehicle approaching in your lane?',
        options: [
          'Continue straight',
          'Flash lights and hope',
          'Brake and move to safety',
          'Accelerate',
        ],
        correct: 2,
      },
      {
        id: '3-20',
        text: 'What should you avoid before driving?',
        options: [
          'Eating',
          'Alcohol and drugs',
          'Emotional stress only',
          'Breakfast',
        ],
        correct: 1,
      },
      {
        id: '3-21',
        text: 'How should you react to emergency vehicles?',
        options: [
          'Ignore them',
          'Slow down and move aside',
          'Maintain your lane',
          'Speed up',
        ],
        correct: 1,
      },
      {
        id: '3-22',
        text: 'What is the proper response to a cyclist on the road?',
        options: [
          'Honk to move them',
          'Treat them as vehicles, give space',
          'Drive close',
          'Speed around them',
        ],
        correct: 1,
      },
      {
        id: '3-23',
        text: 'How should you prepare for a long drive?',
        options: [
          'Just drive',
          'Check vehicle, rest, plan route',
          'Drive as fast as possible',
          'No preparation needed',
        ],
        correct: 1,
      },
      {
        id: '3-24',
        text: 'What should you do if oncoming traffic flashes lights?',
        options: [
          'Flash back',
          'Be alert, there may be danger ahead',
          'Ignore it',
          'Speed up',
        ],
        correct: 1,
      },
      {
        id: '3-25',
        text: 'How do you handle driving in fog?',
        options: [
          'Use high beam lights',
          'Use low beam, reduce speed, increase distance',
          'Drive normally',
          'Only use fog lights',
        ],
        correct: 1,
      },
    ])
  );

  // Additional tests 4-25 with abbreviated data
  for (let i = 4; i <= 25; i++) {
    const testTopics = [
      'Road Signs and Markings',
      'Traffic Signals',
      'Parking Regulations',
      'Pedestrian Safety',
      'Motorcycle Rules',
      'Truck Regulations',
      'Night Driving',
      'Adverse Weather',
      'Emergency Procedures',
      'Vehicle Inspections',
      'Licensing Requirements',
      'Insurance Basics',
      'Loading and Securing Cargo',
      'Eco-Friendly Driving',
      'Speed Management',
      'Lane Discipline',
      'At-Risk Drivers',
      'Accident Procedures',
      'Hazard Recognition',
      'Safe Zone Driving',
      'Mountain Driving',
      'Off-Road Driving',
    ];

    const testTitle = testTopics[i - 4] || `Test ${i}`;

    const questions = [];
    for (let j = 1; j <= 25; j++) {
      questions.push({
        id: `${i}-${j}`,
        text: `Question ${j} from ${testTitle}: What is the correct answer?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: Math.floor(Math.random() * 4),
      });
    }

    tests.push(createTest(i.toString(), `Test ${i}: ${testTitle}`, questions));
  }

  return tests;
};

module.exports = { createTestData };
