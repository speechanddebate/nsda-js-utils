export const adjectives = [
    'ancient',
    'average',
    'best',
    'better',
    'big',
    'blue',
    'brave',
    'breezy',
    'bright',
    'brown',
    'calm',
    'chatty',
    'chilly',
    'clear',
    'clever',
    'cold',
    'curly',
    'dry',
    'early',
    'easy',
    'empty',
    'fast',
    'fluffy',
    'free',
    'fresh',
    'friendly',
    'funny',
    'fuzzy',
    'gentle',
    'giant',
    'good',
    'great',
    'green',
    'happy',
    'honest',
    'hot',
    'huge',
    'hungry',
    'jolly',
    'kind',
    'large',
    'late',
    'light',
    'little',
    'local',
    'long',
    'loud',
    'lovely',
    'lucky',
    'massive',
    'mighty',
    'modern',
    'natural',
    'neat',
    'new',
    'nice',
    'odd',
    'old',
    'open',
    'orange',
    'ordinary',
    'perfect',
    'pink',
    'plastic',
    'polite',
    'popular',
    'pretty',
    'proud',
    'public',
    'purple',
    'quick',
    'quiet',
    'rare',
    'real',
    'red',
    'serious',
    'shaggy',
    'sharp',
    'short',
    'shy',
    'silent',
    'silly',
    'simple',
    'single',
    'small',
    'smart',
    'smooth',
    'social',
    'soft',
    'sour',
    'spicy',
    'splendid',
    'spotty',
    'stale',
    'strange',
    'strong',
    'sweet',
    'swift',
    'tall',
    'tame',
    'tender',
    'thin',
    'tidy',
    'tiny',
    'tough',
    'weak',
    'wet',
    'wise',
    'witty',
    'wonderful',
    'yellow',
    'young',
];
export const animals = [
    'badger',
    'bat',
    'bear',
    'bird',
    'bobcat',
    'bulldog',
    'cat',
    'catfish',
    'cheetah',
    'chicken',
    'chipmunk',
    'cobra',
    'cougar',
    'cow',
    'crab',
    'deer',
    'dog',
    'dolphin',
    'dragon',
    'duck',
    'eagle',
    'eel',
    'elephant',
    'emu',
    'falcon',
    'fish',
    'fly',
    'fox',
    'frog',
    'gecko',
    'goat',
    'goose',
    'grasshopper',
    'hornet',
    'horse',
    'hound',
    'insect',
    'jellyfish',
    'kangaroo',
    'ladybug',
    'lion',
    'lizard',
    'monkey',
    'moose',
    'moth',
    'mouse',
    'mule',
    'newt',
    'octopus',
    'otter',
    'owl',
    'panda',
    'panther',
    'parrot',
    'penguin',
    'pig',
    'puma',
    'rabbit',
    'rat',
    'robin',
    'seahorse',
    'sheep',
    'shrimp',
    'skunk',
    'sloth',
    'snail',
    'snake',
    'squid',
    'swan',
    'tiger',
    'turkey',
    'turtle',
    'walrus',
    'wombat',
    'yak',
    'zebra',
];
// Currently unused, can add for more entropy
export const nouns = [
    'time',
    'year',
    'people',
    'day',
    'thing',
    'life',
    'child',
    'world',
    'school',
    'state',
    'family',
    'student',
    'group',
    'country',
    'problem',
    'hand',
    'part',
    'place',
    'case',
    'system',
    'question',
    'work',
    'number',
    'night',
    'point',
    'home',
    'water',
    'room',
    'area',
    'money',
    'story',
    'fact',
    'month',
    'right',
    'study',
    'book',
    'eye',
    'word',
    'business',
    'issue',
    'side',
    'kind',
    'head',
    'house',
    'service',
    'friend',
    'power',
    'hour',
    'game',
    'line',
    'member',
    'law',
    'car',
    'city',
    'name',
    'team',
    'minute',
    'idea',
    'body',
    'back',
    'face',
    'others',
    'level',
    'office',
    'door',
    'health',
    'person',
    'art',
    'history',
    'party',
    'result',
    'change',
    'morning',
    'moment',
    'teacher',
    'force',
    'desk',
    'chair',
    'lamp',
    'flower',
    'tree',
    'truck',
    'mountain',
    'hill',
    'table',
];
export const randomPhrase = () => {
    let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let animal = animals[Math.floor(Math.random() * animals.length)];
    let number = Math.floor(Math.random() * (999 - 1) + 1);
    if ([69, 420, 666].includes(number)) {
        number += 1;
    }
    adjective =
        adjective.charAt(0).toUpperCase() +
            adjective.substring(1).toLowerCase();
    animal = animal.charAt(0).toUpperCase() + animal.substring(1).toLowerCase();
    return `${adjective}${animal}${number.toString()}`;
};
export default randomPhrase;
