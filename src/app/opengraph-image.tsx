import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'TEDx IMT Paris — 22 February 2027 · Théâtre de Paris';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Top red accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '6px',
            backgroundColor: '#e62b1e',
          }}
        />

        {/* TEDx prefix label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              backgroundColor: '#e62b1e',
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '6px 16px',
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}
          >
            TEDx
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '96px',
            fontWeight: 700,
            lineHeight: 1.05,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}
        >
          IMT Paris
        </div>

        {/* Red divider */}
        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#e62b1e',
            marginBottom: '32px',
            borderRadius: '2px',
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            color: 'rgba(255,255,255,0.70)',
            fontSize: '28px',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '0.02em',
            marginBottom: '0px',
          }}
        >
          22 February 2027 · Théâtre de Paris
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: '#e62b1e',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Ideas Worth Spreading
          </div>
        </div>

        {/* Bottom red accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '4px',
            backgroundColor: '#e62b1e',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
