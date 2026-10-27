import React, { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useSoundEffects from '../hooks/useSoundEffects'

/**
 * Beyond the Workspace: Tactile editorial scrapbook of personal photographs.
 * Each photo features a torn washi tape strip with an evocative 3-4 word description.
 * Arranged haphazardly with organic tilts and natural overlaps.
 * Photos fly in on scroll, with drag & drop interaction discovered purely by fun accident.
 */
export const SCRAPBOOK_PHOTOS = [
  {
    id: 'scrapbook-1',
    image: '/assets/Scrapbook/IMG_3835.webp',
    fallback: '/assets/Scrapbook/IMG_3835.jpg',
    tapeText: 'Midnight amala & late code',
    alt: 'Nigerian swallow soup with assorted meats in front of an open laptop screen with code',
    aspect: '3/4',
    initialRotate: -4.2,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: -65, y: 85, r: -16 }
  },
  {
    id: 'scrapbook-2',
    image: '/assets/Scrapbook/535CB6E2-A56B-4A2A-AF6E-1FB39852A2D4.webp',
    fallback: '/assets/Scrapbook/535CB6E2-A56B-4A2A-AF6E-1FB39852A2D4.jpg',
    tapeText: 'Fried yam & egg sauce',
    alt: 'Golden fried yam wedges served with pepper scrambled egg sauce on a wooden platter',
    aspect: '4/3',
    initialRotate: 3.8,
    tapePos: 'top-center',
    tapeVariant: 'kraft',
    flyOffset: { x: 70, y: 65, r: 12 }
  },
  {
    id: 'scrapbook-3',
    image: '/assets/Scrapbook/2E82552A-3E64-4E24-A6AF-040A6756184B.webp',
    fallback: '/assets/Scrapbook/2E82552A-3E64-4E24-A6AF-040A6756184B.JPG',
    tapeText: 'Gallery saxophone sculpture',
    alt: 'Scrap metal art sculpture of a musician playing saxophone in an art gallery',
    aspect: '3/4',
    initialRotate: -5.4,
    tapePos: 'top-right',
    tapeVariant: 'ivory',
    flyOffset: { x: -80, y: -70, r: -18 }
  },
  {
    id: 'scrapbook-4',
    image: '/assets/Scrapbook/Cozy Modern Family Living Room Viewing.webp',
    fallback: '/assets/Scrapbook/Cozy Modern Family Living Room Viewing.png',
    tapeText: 'Modern Family comfort watch',
    alt: 'Watching Modern Family in a cozy warmly lit living room setup',
    aspect: '16/10',
    initialRotate: 4.6,
    tapePos: 'top-left',
    tapeVariant: 'terracotta',
    flyOffset: { x: 80, y: -50, r: 16 }
  },
  {
    id: 'scrapbook-5',
    image: '/assets/Scrapbook/0AB20D6D-28D1-49C3-9189-E6657B9C3916.webp',
    fallback: '/assets/Scrapbook/0AB20D6D-28D1-49C3-9189-E6657B9C3916.JPG',
    tapeText: 'Wings, wraps & fries feast',
    alt: 'Loaded dining table with spicy chicken wings, golden fries in baskets, and toasted wraps',
    aspect: '3/4',
    initialRotate: -3.2,
    tapePos: 'bottom-center',
    tapeVariant: 'kraft',
    flyOffset: { x: -50, y: 70, r: -10 }
  },
  {
    id: 'scrapbook-6',
    image: '/assets/Scrapbook/68A05C1C-347E-4284-B493-097AEBA1B8D2.webp',
    fallback: '/assets/Scrapbook/68A05C1C-347E-4284-B493-097AEBA1B8D2.jpg',
    tapeText: 'Vintage Bush radio & chess',
    alt: 'Wooden desk with cream retro Bush radio, miniature chess set, and desk accessories',
    aspect: '16/10',
    initialRotate: 5.1,
    tapePos: 'top-right',
    tapeVariant: 'parchment',
    flyOffset: { x: 60, y: 90, r: 14 }
  },
  {
    id: 'scrapbook-7',
    image: '/assets/Scrapbook/DCDE1622-EBB9-4429-B6C6-59B17FDCBA38.webp',
    fallback: '/assets/Scrapbook/DCDE1622-EBB9-4429-B6C6-59B17FDCBA38.JPG',
    tapeText: 'Olumo Rock heritage heights',
    alt: 'Historic stone elevator tower and golden Lisabi monument at Olumo Rock in Abeokuta',
    aspect: '3/4',
    initialRotate: -4.8,
    tapePos: 'top-left',
    tapeVariant: 'ivory',
    flyOffset: { x: -90, y: 50, r: -14 }
  },
  {
    id: 'scrapbook-8',
    image: '/assets/Scrapbook/88157326-64D6-4EC3-802F-1A5A3BD4110F.webp',
    fallback: '/assets/Scrapbook/88157326-64D6-4EC3-802F-1A5A3BD4110F.JPG',
    tapeText: 'More espresso, less depresso',
    alt: 'Cafe nook with wooden bar stools and Daily Brew poster: More Espresso Less Depresso',
    aspect: '3/4',
    initialRotate: 3.5,
    tapePos: 'top-center',
    tapeVariant: 'terracotta',
    flyOffset: { x: 70, y: -60, r: 11 }
  },
  {
    id: 'scrapbook-9',
    image: '/assets/Scrapbook/E6D2994C-DA9E-4D3B-8892-C5E6AE7552FC.webp',
    fallback: '/assets/Scrapbook/E6D2994C-DA9E-4D3B-8892-C5E6AE7552FC.JPG',
    tapeText: 'Beach breeze & soft serve',
    alt: 'Hand holding cup of soft-serve vanilla ice cream with ocean beach sand in background',
    aspect: '3/4',
    initialRotate: -6.2,
    tapePos: 'top-right',
    tapeVariant: 'parchment',
    flyOffset: { x: -75, y: 75, r: -16 }
  },
  {
    id: 'scrapbook-10',
    image: '/assets/Scrapbook/Cosy Living Room Big Bang Viewing.webp',
    fallback: '/assets/Scrapbook/Cosy Living Room Big Bang Viewing.png',
    tapeText: 'Big Bang Theory binge',
    alt: 'Cozy night viewing The Big Bang Theory on the living room screen',
    aspect: '16/10',
    initialRotate: 4.1,
    tapePos: 'top-left',
    tapeVariant: 'kraft',
    flyOffset: { x: 80, y: 70, r: 15 }
  },
  {
    id: 'scrapbook-11',
    image: '/assets/Scrapbook/08420CAD-8BAF-42D1-B9C5-A7418A4D8D94.webp',
    fallback: '/assets/Scrapbook/08420CAD-8BAF-42D1-B9C5-A7418A4D8D94.JPG',
    tapeText: 'Mechanical scrap metal bull',
    alt: 'Intricate life-size bull sculpture crafted from recycled mechanical parts and clockwork gears',
    aspect: '3/4',
    initialRotate: -3.9,
    tapePos: 'top-left',
    tapeVariant: 'ivory',
    flyOffset: { x: -65, y: -80, r: -12 }
  },
  {
    id: 'scrapbook-12',
    image: '/assets/Scrapbook/D9FC08A4-C186-45F0-A209-57E3781CA502.webp',
    fallback: '/assets/Scrapbook/D9FC08A4-C186-45F0-A209-57E3781CA502.JPG',
    tapeText: 'Sweet fried dodo & eggs',
    alt: 'Bowl of caramelized fried sweet plantains paired with savory scrambled eggs',
    aspect: '3/4',
    initialRotate: 5.7,
    tapePos: 'top-center',
    tapeVariant: 'terracotta',
    flyOffset: { x: 65, y: 80, r: 13 }
  },
  {
    id: 'scrapbook-13',
    image: '/assets/Scrapbook/26F15978-97CB-446C-B293-D47048880083.webp',
    fallback: '/assets/Scrapbook/26F15978-97CB-446C-B293-D47048880083.jpg',
    tapeText: 'Woven lights & carved timber',
    alt: 'Row of woven cage pendant lights casting patterned shadows over solid wooden log benches',
    aspect: '16/10',
    initialRotate: -4.5,
    tapePos: 'top-right',
    tapeVariant: 'kraft',
    flyOffset: { x: -85, y: -60, r: -15 }
  },
  {
    id: 'scrapbook-14',
    image: '/assets/Scrapbook/B36E227B-C55D-4769-80E3-331F7076086D.webp',
    fallback: '/assets/Scrapbook/B36E227B-C55D-4769-80E3-331F7076086D.JPG',
    tapeText: 'Bicycle bar cafe workspace',
    alt: 'Eclectic cafe seating with bicycle frames repurposed into high bar tables under warm pendant lamps',
    aspect: '3/4',
    initialRotate: 4.8,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: 75, y: 85, r: 14 }
  },
  {
    id: 'scrapbook-15',
    image: '/assets/Scrapbook/5502D1DC-29FD-4C1B-A0DA-8CC8B22F7414.webp',
    fallback: '/assets/Scrapbook/5502D1DC-29FD-4C1B-A0DA-8CC8B22F7414.JPG',
    tapeText: 'Street paperbacks collection',
    alt: 'Vibrant grid of non-fiction, design and philosophy paperbacks laid out on a street bookseller stand',
    aspect: '3/4',
    initialRotate: -5.1,
    tapePos: 'top-center',
    tapeVariant: 'ivory',
    flyOffset: { x: -70, y: 65, r: -11 }
  },
  {
    id: 'scrapbook-16',
    image: '/assets/Scrapbook/B55828F3-D62F-4160-81AB-59CDAE100227.webp',
    fallback: '/assets/Scrapbook/B55828F3-D62F-4160-81AB-59CDAE100227.jpg',
    tapeText: 'Note to self: Keep going',
    alt: 'Desk acrylic stand displaying uplifting notes to self beside miniature wooden armchair',
    aspect: '16/10',
    initialRotate: 3.4,
    tapePos: 'bottom-center',
    tapeVariant: 'parchment',
    flyOffset: { x: 80, y: -70, r: 12 }
  },
  {
    id: 'scrapbook-17',
    image: '/assets/Scrapbook/01112272-88D0-46A9-9C2C-9F6756EB2EEC.webp',
    fallback: '/assets/Scrapbook/01112272-88D0-46A9-9C2C-9F6756EB2EEC.JPG',
    tapeText: 'Deluxe Lane fashion rails',
    alt: 'Clothing rails and curated style pieces inside Deluxe Lane boutique',
    aspect: '3/4',
    initialRotate: -4.3,
    tapePos: 'top-left',
    tapeVariant: 'terracotta',
    flyOffset: { x: -60, y: 70, r: -13 }
  },
  {
    id: 'scrapbook-18',
    image: '/assets/Scrapbook/Cozy Living Room Crime Drama Night.webp',
    fallback: '/assets/Scrapbook/Cozy Living Room Crime Drama Night.png',
    tapeText: 'Law & Order SVU night',
    alt: 'Watching Law & Order Special Victims Unit in the living room',
    aspect: '16/10',
    initialRotate: 5.2,
    tapePos: 'top-right',
    tapeVariant: 'kraft',
    flyOffset: { x: 70, y: 60, r: 15 }
  },
  {
    id: 'scrapbook-19',
    image: '/assets/Scrapbook/CDCFE277-2506-4C06-A225-9D25C80F6828.webp',
    fallback: '/assets/Scrapbook/CDCFE277-2506-4C06-A225-9D25C80F6828.JPG',
    tapeText: 'Fiery chili wings & fries',
    alt: 'Spicy peppered fried chicken with golden fries and creamy chili dipping sauce',
    aspect: '3/4',
    initialRotate: -3.7,
    tapePos: 'top-center',
    tapeVariant: 'parchment',
    flyOffset: { x: -80, y: -70, r: -12 }
  },
  {
    id: 'scrapbook-20',
    image: '/assets/Scrapbook/311C84F4-4D36-4E8A-A30D-63BB914CB2E4.webp',
    fallback: '/assets/Scrapbook/311C84F4-4D36-4E8A-A30D-63BB914CB2E4.JPG',
    tapeText: 'Crisp stack of Naira',
    alt: 'Hand holding a clean bundled stack of Nigerian 500 and 1000 Naira notes',
    aspect: '3/4',
    initialRotate: 6.1,
    tapePos: 'top-left',
    tapeVariant: 'ivory',
    flyOffset: { x: 90, y: 50, r: 17 }
  },
  {
    id: 'scrapbook-21',
    image: '/assets/Scrapbook/059A94EE-6422-4CC8-9DB8-451B5E046BE4.webp',
    fallback: '/assets/Scrapbook/059A94EE-6422-4CC8-9DB8-451B5E046BE4.JPG',
    tapeText: 'Cafe espresso counter',
    alt: 'Artisan cafe counter with espresso machine, syrups, floral overhang, and cafe menu boards',
    aspect: '3/4',
    initialRotate: -4.9,
    tapePos: 'top-right',
    tapeVariant: 'terracotta',
    flyOffset: { x: -65, y: 80, r: -14 }
  },
  {
    id: 'scrapbook-22',
    image: '/assets/Scrapbook/Criminal Minds on a Cozy TV Setup.webp',
    fallback: '/assets/Scrapbook/Criminal Minds on a Cozy TV Setup.png',
    tapeText: 'Criminal Minds marathon',
    alt: 'Criminal Minds title screen glowing in an ambient evening living room',
    aspect: '16/10',
    initialRotate: 3.6,
    tapePos: 'top-center',
    tapeVariant: 'kraft',
    flyOffset: { x: 60, y: -80, r: 10 }
  },
  {
    id: 'scrapbook-23',
    image: '/assets/Scrapbook/F295C381-D325-4AAE-8DE1-3DBF1E300F07.webp',
    fallback: '/assets/Scrapbook/F295C381-D325-4AAE-8DE1-3DBF1E300F07.JPG',
    tapeText: 'Garlic butter naan & curry',
    alt: 'Freshly baked garlic herb butter naan paired with a deep bowl of rich creamy curry',
    aspect: '3/4',
    initialRotate: -5.8,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: -75, y: 65, r: -16 }
  },
  {
    id: 'scrapbook-24',
    image: '/assets/Scrapbook/3BC37AD5-C831-4BCC-88AD-C6DDAA649E3A.webp',
    fallback: '/assets/Scrapbook/3BC37AD5-C831-4BCC-88AD-C6DDAA649E3A.JPG',
    tapeText: 'Focus desk & silver lamp',
    alt: 'Minimal desk workspace with articulated metal task lamp, framed print, and houseplant',
    aspect: '3/4',
    initialRotate: 4.2,
    tapePos: 'top-right',
    tapeVariant: 'ivory',
    flyOffset: { x: 75, y: 70, r: 13 }
  },
  {
    id: 'scrapbook-25',
    image: '/assets/Scrapbook/8BDD8473-9669-4A2D-963E-8BDA59E43119.webp',
    fallback: '/assets/Scrapbook/8BDD8473-9669-4A2D-963E-8BDA59E43119.JPG',
    tapeText: 'Chilled citrus toast',
    alt: 'Hand raising a crystal cut glass of fresh chilled citrus drink',
    aspect: '3/4',
    initialRotate: -3.5,
    tapePos: 'bottom-center',
    tapeVariant: 'terracotta',
    flyOffset: { x: -55, y: -60, r: -9 }
  },
  {
    id: 'scrapbook-26',
    image: '/assets/Scrapbook/4D58AFC2-AAD7-44C6-9AC2-F1FE2BED9A4F.webp',
    fallback: '/assets/Scrapbook/4D58AFC2-AAD7-44C6-9AC2-F1FE2BED9A4F.JPG',
    tapeText: 'Acoustic wood slatted lounge',
    alt: 'Moody ambient corner with vertical fluted acoustic wood paneling, spotlight, and leather chair',
    aspect: '3/4',
    initialRotate: 5.4,
    tapePos: 'top-center',
    tapeVariant: 'kraft',
    flyOffset: { x: 85, y: 60, r: 14 }
  },
  {
    id: 'scrapbook-27',
    image: '/assets/Scrapbook/8FB607C0-B1DC-4A90-A6AB-69F36040245A.webp',
    fallback: '/assets/Scrapbook/8FB607C0-B1DC-4A90-A6AB-69F36040245A.jpg',
    tapeText: 'Studio mirror selfie',
    alt: 'Mirror selfie inside the fashion studio',
    aspect: '3/4',
    initialRotate: -6.4,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: -90, y: 75, r: -18 }
  },
  {
    id: 'scrapbook-28',
    image: '/assets/Scrapbook/28DB2BDA-C19B-40AA-B5FE-0E8E1AEF2132.webp',
    fallback: '/assets/Scrapbook/28DB2BDA-C19B-40AA-B5FE-0E8E1AEF2132.JPG',
    tapeText: 'Curved midnight glass hall',
    alt: 'Curved architectural hallway lined with dark glass windows and velvet armchairs',
    aspect: '3/4',
    initialRotate: 3.9,
    tapePos: 'top-right',
    tapeVariant: 'ivory',
    flyOffset: { x: 70, y: -70, r: 12 }
  },
  {
    id: 'scrapbook-29',
    image: '/assets/Scrapbook/7139427B-5F8A-4311-A587-0470150AE8C1.webp',
    fallback: '/assets/Scrapbook/7139427B-5F8A-4311-A587-0470150AE8C1.JPG',
    tapeText: 'Crispy wings & golden fries',
    alt: 'Platter of spiced fried wings, basket fries, wrap, and garlic dipping sauce',
    aspect: '3/4',
    initialRotate: -4.4,
    tapePos: 'top-center',
    tapeVariant: 'kraft',
    flyOffset: { x: -70, y: 80, r: -13 }
  },
  {
    id: 'scrapbook-30',
    image: '/assets/Scrapbook/CC0A3921-C44B-4231-9B7C-E0021B0DC81A.webp',
    fallback: '/assets/Scrapbook/CC0A3921-C44B-4231-9B7C-E0021B0DC81A.JPG',
    tapeText: 'Wood panel reading corner',
    alt: 'Warm timber wall workstation with hanging pendant lamp, books, and cold brew drink',
    aspect: '3/4',
    initialRotate: 4.7,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: 80, y: 55, r: 14 }
  },
  {
    id: 'scrapbook-31',
    image: '/assets/Scrapbook/DBE18AB8-6A7B-491F-83F4-B4254FE131B9.webp',
    fallback: '/assets/Scrapbook/DBE18AB8-6A7B-491F-83F4-B4254FE131B9.JPG',
    tapeText: 'Tangerine knit rib texture',
    alt: 'Close-up feeling the fine ribbed knit texture of a vibrant orange dress sleeve',
    aspect: '3/4',
    initialRotate: -5.3,
    tapePos: 'bottom-center',
    tapeVariant: 'terracotta',
    flyOffset: { x: -80, y: -65, r: -15 }
  },
  {
    id: 'scrapbook-32',
    image: '/assets/Scrapbook/24A59B01-904F-46FF-A296-03BBCBA0D892.webp',
    fallback: '/assets/Scrapbook/24A59B01-904F-46FF-A296-03BBCBA0D892.JPG',
    tapeText: 'Coastal industrial dunes',
    alt: 'Industrial batching plant tower standing against a vast blue sky on sandy grounds',
    aspect: '3/4',
    initialRotate: 3.7,
    tapePos: 'top-right',
    tapeVariant: 'ivory',
    flyOffset: { x: 65, y: 75, r: 11 }
  },
  {
    id: 'scrapbook-33',
    image: '/assets/Scrapbook/E256522F-9683-4CFD-896F-C6160BBFCAB4.webp',
    fallback: '/assets/Scrapbook/E256522F-9683-4CFD-896F-C6160BBFCAB4.JPG',
    tapeText: 'Morning thoughts cafe nook',
    alt: 'Cafe interior with motivational wooden signs, bike tables, and vintage radio',
    aspect: '3/4',
    initialRotate: -4.1,
    tapePos: 'top-center',
    tapeVariant: 'kraft',
    flyOffset: { x: -65, y: 70, r: -12 }
  },
  {
    id: 'scrapbook-34',
    image: '/assets/Scrapbook/EFA1E810-DA7B-4A43-BC73-5D01622ABB28.webp',
    fallback: '/assets/Scrapbook/EFA1E810-DA7B-4A43-BC73-5D01622ABB28.JPG',
    tapeText: 'Neon blue cocktail glow',
    alt: 'Stemmed rounded glass with chilled cocktail illuminated under vibrant blue lights',
    aspect: '3/4',
    initialRotate: 5.6,
    tapePos: 'top-left',
    tapeVariant: 'parchment',
    flyOffset: { x: 85, y: -70, r: 16 }
  },
  {
    id: 'scrapbook-35',
    image: '/assets/Scrapbook/IMG_7567.webp',
    fallback: '/assets/Scrapbook/IMG_7567.JPG',
    tapeText: 'Golden dodo & spicy omelette',
    alt: 'Home-cooked comfort meal of fried sweet plantains and fluffy peppered omelette',
    aspect: '3/4',
    initialRotate: -3.8,
    tapePos: 'top-right',
    tapeVariant: 'terracotta',
    flyOffset: { x: -70, y: 60, r: -11 }
  },
  {
    id: 'scrapbook-36',
    image: '/assets/Scrapbook/IMG_8972.webp',
    fallback: '/assets/Scrapbook/IMG_8972.JPG',
    tapeText: 'Ruby cocktail coupe evening',
    alt: 'Chic cocktail coupe filled with ruby red drink and cocktail cherry garnish',
    aspect: '3/4',
    initialRotate: 4.3,
    tapePos: 'bottom-center',
    tapeVariant: 'ivory',
    flyOffset: { x: 75, y: 80, r: 14 }
  },
  {
    id: 'scrapbook-37',
    image: '/assets/Scrapbook/IMG_9310.webp',
    fallback: '/assets/Scrapbook/IMG_9310.JPG',
    tapeText: 'Sunset citrus on patio',
    alt: 'Hand holding a tall glass of sunset peach mocktail with lime wheel in an outdoor patio',
    aspect: '3/4',
    initialRotate: -5.5,
    tapePos: 'top-left',
    tapeVariant: 'kraft',
    flyOffset: { x: -80, y: 75, r: -15 }
  }
]

export default function Scrapbook() {
  const containerRef = useRef(null)
  const { playClick } = useSoundEffects()
  const prefersReducedMotion = useReducedMotion()

  const [topZ, setTopZ] = useState(10)
  const [zOrder, setZOrder] = useState({})
  const [activeDragId, setActiveDragId] = useState(null)

  // Elevate active touched/dragged photo to the top stacking layer
  const bringToFront = useCallback((id) => {
    setTopZ((prev) => {
      const nextZ = prev + 1
      setZOrder((current) => ({
        ...current,
        [id]: nextZ
      }))
      return nextZ
    })
  }, [])

  return (
    <div className="scrapbook-wrapper" ref={containerRef} aria-label="Beyond the workspace scrapbook">
      <div className="scrapbook-grid">
        {SCRAPBOOK_PHOTOS.map((item, idx) => {
          const itemZ = zOrder[item.id] || (idx % 5) + 2
          const isDragging = activeDragId === item.id

          // Staggered haphazard organic shifts
          const verticalOffset = idx % 3 === 0 ? -14 : idx % 2 === 0 ? 18 : 0
          const horizontalOffset = idx % 4 === 1 ? 6 : idx % 4 === 3 ? -6 : 0

          return (
            <motion.div
              key={item.id}
              className={`scrapbook-item ${isDragging ? 'is-dragging' : ''}`}
              style={{
                zIndex: isDragging ? 99999 : itemZ,
                marginTop: `${verticalOffset}px`,
                marginLeft: `${horizontalOffset}px`
              }}
              // Fly in and arrange haphazardly on scroll
              initial={
                prefersReducedMotion
                  ? { opacity: 1, x: 0, y: 0, rotate: item.initialRotate, scale: 1 }
                  : {
                      opacity: 0,
                      x: item.flyOffset.x,
                      y: item.flyOffset.y,
                      rotate: item.flyOffset.r,
                      scale: 0.88
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: item.initialRotate,
                scale: 1
              }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                type: 'spring',
                stiffness: 190,
                damping: 20,
                mass: 0.85,
                delay: (idx % 4) * 0.06
              }}
              // Freeform Draggable interaction without hints (discovered by accident)
              drag
              dragElastic={0.16}
              dragMomentum={false}
              whileDrag={{
                scale: 1.05,
                rotate: item.initialRotate * 0.5,
                cursor: 'grabbing'
              }}
              onPointerDown={() => {
                bringToFront(item.id)
                playClick()
              }}
              onDragStart={() => {
                setActiveDragId(item.id)
                bringToFront(item.id)
              }}
              onDragEnd={() => {
                setActiveDragId(null)
              }}
              role="region"
              aria-label={`Photo: ${item.tapeText}`}
            >
              {/* Photo Frame with subtle print border */}
              <div className="scrapbook-photo-card">
                <div
                  className="scrapbook-photo-media"
                  style={{ aspectRatio: item.aspect || '3/4' }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (item.fallback && e.currentTarget.src !== item.fallback) {
                        e.currentTarget.src = item.fallback
                      }
                    }}
                  />
                  <div className="scrapbook-photo-sheen" aria-hidden="true" />
                </div>
              </div>

              {/* Washi tape strip with very short description */}
              <div
                className={`scrapbook-tape-strip scrapbook-tape-strip--${item.tapePos} scrapbook-tape-strip--${item.tapeVariant || 'parchment'}`}
              >
                <span className="scrapbook-tape-caption">{item.tapeText}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
