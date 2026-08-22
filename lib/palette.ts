/** Colours used to tint a product's art plate and its drawn fallback box. */
export type Palette = {
  /** Box body */
  box: string;
  /** Box lid — usually a touch darker */
  lid: string;
  /** Ribbon and bow */
  ribbon: string;
  /** Light spilling out when the lid lifts */
  glow: string;
};
