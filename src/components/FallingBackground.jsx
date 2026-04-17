import meteor1 from '../assets/background/meteor-1.svg'
import meteor2 from '../assets/background/meteor-2.svg'
import meteor3 from '../assets/background/meteor-3.svg'
import meteor4 from '../assets/background/meteor-4.svg'
import meteor5 from '../assets/background/meteor-5.svg'
import meteor6 from '../assets/background/meteor-6.svg'
import beth from '../assets/background/beth.svg'
import morty from '../assets/background/morty.svg'
import rick from '../assets/background/rick.svg'
import smith from '../assets/background/smith.svg'
import summer from '../assets/background/summer.svg'

const fallingItems = [
  { src: meteor1, label: 'meteor', left: '6%', size: '34px', delay: '-4s', duration: '21s', opacity: 0.14, rotation: '-22deg', endRotation: '148deg', drift: '18vw', reducedY: '16vh' },
  { src: rick, label: 'rick', left: '14%', size: '74px', delay: '-12s', duration: '32s', opacity: 0.11, rotation: '18deg', endRotation: '78deg', drift: '10vw', reducedY: '62vh' },
  { src: meteor2, label: 'meteor', left: '25%', size: '42px', delay: '-18s', duration: '24s', opacity: 0.16, rotation: '34deg', endRotation: '214deg', drift: '-13vw', reducedY: '34vh' },
  { src: beth, label: 'beth', left: '32%', size: '66px', delay: '-30s', duration: '35s', opacity: 0.1, rotation: '22deg', endRotation: '92deg', drift: '14vw', reducedY: '46vh' },
  { src: meteor3, label: 'meteor', left: '38%', size: '29px', delay: '-8s', duration: '18s', opacity: 0.13, rotation: '-10deg', endRotation: '170deg', drift: '8vw', reducedY: '78vh' },
  { src: morty, label: 'morty', left: '48%', size: '64px', delay: '-23s', duration: '36s', opacity: 0.1, rotation: '-16deg', endRotation: '-76deg', drift: '-16vw', reducedY: '20vh' },
  { src: summer, label: 'summer', left: '54%', size: '62px', delay: '-36s', duration: '38s', opacity: 0.1, rotation: '-24deg', endRotation: '-96deg', drift: '-12vw', reducedY: '60vh' },
  { src: meteor4, label: 'meteor', left: '59%', size: '38px', delay: '-2s', duration: '20s', opacity: 0.15, rotation: '12deg', endRotation: '192deg', drift: '12vw', reducedY: '52vh' },
  { src: meteor5, label: 'meteor', left: '70%', size: '31px', delay: '-15s', duration: '23s', opacity: 0.12, rotation: '-28deg', endRotation: '-208deg', drift: '-9vw', reducedY: '72vh' },
  { src: smith, label: 'smith-family', left: '76%', size: '82px', delay: '-41s', duration: '42s', opacity: 0.09, rotation: '10deg', endRotation: '70deg', drift: '9vw', reducedY: '40vh' },
  { src: meteor6, label: 'meteor', left: '81%', size: '46px', delay: '-10s', duration: '26s', opacity: 0.15, rotation: '26deg', endRotation: '206deg', drift: '11vw', reducedY: '28vh' },
  { src: rick, label: 'rick', left: '90%', size: '58px', delay: '-28s', duration: '34s', opacity: 0.09, rotation: '-32deg', endRotation: '28deg', drift: '-17vw', reducedY: '84vh' },
]

export default function FallingBackground() {
  return (
    <div className="falling-background" aria-hidden="true">
      {fallingItems.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="falling-background__item"
          style={{
            '--fall-left': item.left,
            '--fall-size': item.size,
            '--fall-delay': item.delay,
            '--fall-duration': item.duration,
            '--fall-opacity': item.opacity,
            '--fall-rotation': item.rotation,
            '--fall-end-rotation': item.endRotation,
            '--fall-drift': item.drift,
            '--fall-reduced-y': item.reducedY,
          }}
        >
          <img src={item.src} alt="" draggable="false" decoding="async" />
        </div>
      ))}
    </div>
  )
}
