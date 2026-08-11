/**
 * Deprecated — the paper grain now lives on `body::after` in globals.css.
 *
 * As an <svg> element it rendered as a grey block in the top-left corner:
 * an absolutely positioned replaced element with `inset: 0` but `width:
 * auto` keeps its intrinsic 300×150 size instead of stretching. As a
 * background-image on a pseudo-element that failure mode doesn't exist.
 *
 * Safe to delete this file.
 */
export default function Grain() {
  return null;
}
