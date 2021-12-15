BLOCK CONTROLS

BPM Modifier - This is the same for both layers, everywhere it appears.
BPM - overall effect clock speed. Ideally this can be ripped right off the DJM, but can also run freely with any number.
Num Beats - a normalized (0.0 - 1.0) value representing the beats per beat - 1.0 = 1 quarter note per beat. 0.5 = half notes. 2 = eighth notes
Attack - normalized rise time per beat, scaled to beat time
Decay - normalizedfall time per beat, scaled to beat time
Scale - size of the beat. Try and keep this number around where it's initialized value is.

Layer-Specific Controls

RIPPLE:

Rolling noise dunes.

Noise Scale - normalized value, size of the noise function
Noise Roughness - Raggedness of the noise, ranged from 0 to 4.
General Pan Direction - normalized value interally remapped to -1 - 1 - sets direction for non-BPM panning (set BPM direction with BPM scale).
General Pan Range Low/High - leave as is for medium to slow, range higher for faster pans (careful!)
Flat Color/Color - Colors for the three channels of video synth that feed the offset. Colors add, might not be intuitive to change - dim values will maintain color, overblasting all three channels (for example, adding 200,200,200 and 200,200,200) will create white.
