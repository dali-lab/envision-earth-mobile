import { Image } from 'react-native';
import BCS_1 from './BCS_1.png';
import BCS_2 from './BCS_2.png';
import BCS_3 from './BCS_3.png';
import BCS_4 from './BCS_4.png';
import BCS_5 from './BCS_5.png';
import BCS_6 from './BCS_6.png';
import BCS_7 from './BCS_7.png';
import BCS_8 from './BCS_8.png';
import BCS_9 from './BCS_9.png';

export interface IBCSText {
  val: number,
  imageUri: string,
  description: string,
  tail: string[],
  ribs: string[],
  shoulder: string[],
  brisket: string[],
}

export const BCS_TEXT: IBCSText[] = [
  {
    val: 1,
    imageUri: Image.resolveAssetSource(BCS_1).uri,
    description: 'Severely emaciated; difficulty standing or walking. BCS 1 is very rare and is usually caused by disease or parasitism.',
    tail: [
      'Tailhead projects quite prominently',
      'Severe muscle depletion in hindquarters.',
      'Hooks and pins are sharp to the touch and easily visible',
    ],
    ribs: [
      'Outline of spine highly visible',
      'The transverse processes (vertebrae) feel sharp to the touch and are easily seen with space between them',
      'Each rib is prominently visible',
    ],
    shoulder: ['Severe muscle depletion in shoulder', 'Front of shoulder is pointed'],
    brisket: ['No palpable fat'],
  },
  {
    val: 2,
    imageUri: Image.resolveAssetSource(BCS_2).uri,
    description: 'Emaciated, similar to BCS 1, but not weakened. All fat and most muscle has been depleted.',
    tail: [
      'Tailhead is less prominent, but still easily visible with space on either side',
      'Severe muscle depletion in hindquarters',
      'Hooks and pins easily visible.',
    ],
    ribs: [
      'Outline of spine highly visible.',
      'The transverse processes (vertebrae) feel sharp to the touch and are easily seen with space between them.',
      'Ribs are less prominent, and have some tissue cover near the backbone',
    ],
    shoulder: ['Severe muscle depletion in shoulder', 'Front of shoulder is pointed'],
    brisket: ['No palpable fat'],
  },
  {
    val: 3,
    imageUri: Image.resolveAssetSource(BCS_3).uri,
    description: 'Fat is depleted, along with a slight bit of muscle',
    tail: [
      'Areas on either side of tailhead are partially filled',
      'Some muscle depletion hindquarters',
      'Hooks and pins easily visible',
    ],
    ribs: [
      'Outline of spine still highly visible',
      'Individual transverse processes are barely visible, but can be readily identified by touch',
      'Spaces between the processes are less pronounced',
    ],
    shoulder: [
      'Slight muscle depletion in shoulder',
      'Front of shoulder is slightly pointed.',
    ],
    brisket: ['No palpable fat'],
  },
  {
    val: 4,
    imageUri: Image.resolveAssetSource(BCS_4).uri,
    description: 'Full musculature but minimal fat cover',
    tail: [
      'Areas on either side of tailhead are almost filled',
      'Full, but straight muscling in the hindquarters',
      'Hips slightly rounded with slight fat cover over hip bones',
    ],
    ribs: [
      'Outline of spine is slightly visible',
      'Individual transverse processes cannot be seen and can only be identified by palpation (with slight pressure). They feel rounded rather than sharp.',
      'Fore-ribs and 12th and 13th ribs are still noticeable to the eye.',
    ],
    shoulder: [
      'Full musculature in shoulder.',
      'Front of shoulder is still slightly pointed.',
    ],
    brisket: ['No palpable fat'],
  },
  {
    val: 5,
    imageUri: Image.resolveAssetSource(BCS_5).uri,
    description: '',
    tail: [
      'Each side of the tail head is filled with palpable fat cover, but not mounded.',
      'Full muscling in the hindquarters.',
      'Some palpable fat over the hip bones',
    ],
    ribs: [
      'Outline of spine is not visible.',
      'Individual transverse processes are smooth and difficult to identify, requiring firm pressure',
      'The 12th and 13th ribs are slightly visible to the eye.',
    ],
    shoulder: ['Some palpable fat cover is developing.',
      'The front of the shoulder is rounded, not pointed.',
    ],
    brisket: ['Little fat cover in the brisket'],
  },
  {
    val: 6,
    imageUri: Image.resolveAssetSource(BCS_6).uri,
    description: '',
    tail: [
      'Tailhead slightly rounded. High degree of fat is palpable on either side with noticeable springiness/sponginess.',
      'Muscling in hindquarters is plump and full',
      'More palpable fat over the hip bones',
    ],
    ribs: [
      'The back appears rounded',
      'Individual transverse processes can no longer be felt, but the ends can still be felt with firm pressure.',
      'Ribs are fully covered and are not noticeable to the eye. The cow takes on a smooth appearance.',
    ],
    shoulder: ['More fat cover developing.', 'Front of the shoulder is rounded.'],
    brisket: [
      'Fat deposition is beginning to appear in the brisket',
      'Fat cover is smooth to the look with no developing fat pockets yet.',
    ],
  },
  {
    val: 7,
    imageUri: Image.resolveAssetSource(BCS_7).uri,
    description: '',
    tail: [
      'Tailhead rounded on either side by abundant fat cover. Very spongy.',
      'Hooks and pins are barely visible under abundant fat cover with evident patchiness and developing pones (fat pockets)',
      'Some fat around vulva and in crotch',
    ],
    ribs: [
      'Back is square due to fat.',
      'Ends of the transverse processes can only be felt with very firm pressure.',
    ],
    shoulder: ['Very spongy, hard to distinguish front of shoulder'],
    brisket: ['Brisket is full with spongy fat deposits.'],
  },
  {
    val: 8,
    imageUri: Image.resolveAssetSource(BCS_8).uri,
    description: 'Very fleshy and over-conditioned; more weight than is healthy.',
    tail: [
      'Heavy fat pockets around the tail head.',
      'Large fat deposits below vulva and in crotch',
      'Outline of hip bones is no longer visible',
    ],
    ribs: [
      'Very square back due to excessive fat.',
      'Transverse processes are almost impossible to palpate.',
    ],
    shoulder: [
      'Full musculature in shoulder.',
      'Front of shoulder is still slightly pointed.',
    ],
    brisket: ['Brisket is distended with spongy fat deposits.'],
  },
  {
    val: 9,
    imageUri: Image.resolveAssetSource(BCS_9).uri,
    description: 'Extremely obese; may have problems with mobility due to excessive weight and restriction of limbs.',
    tail: [
      'The tailhead, hips are buried in fatty tissue and are no longer visible.',
      'Pones are protruding',
    ],
    ribs: ['The animal’s topline will be square and flat with large dimples or pockets due to excessive fat cover.'],
    shoulder: ['Excessively spongy, shoulder looks blocky'],
    brisket: ['Excessive amount of fat hanging between front legs, causing the leg set to be wide. Mobility may be impaired'],
  },
];
