/** Hidden SVG filter: animated by the work cards on hover for a liquid distortion. */
export default function DistortFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <filter id="distort" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence id="distort-noise" type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap id="distort-map" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
